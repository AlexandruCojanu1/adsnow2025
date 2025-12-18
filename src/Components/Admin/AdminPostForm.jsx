import React, { useState, useEffect } from "react";
import { parseHTMLContent, generateSlug } from "../../utils/htmlParser";
import { automatePostPublishing, generateSitemap } from "../../utils/blogAutomation";
import { loadPosts, updatePosts } from "../../Data/blogPosts";

const AdminPostForm = ({ post, onSave, onCancel }) => {
    const [htmlContent, setHtmlContent] = useState("");
    const [formData, setFormData] = useState({
        published: true,
        featured: false
    });
    const [githubToken, setGithubToken] = useState("");
    const [showGithubToken, setShowGithubToken] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [automationStatus, setAutomationStatus] = useState(null);
    const [extractedData, setExtractedData] = useState(null);

    useEffect(() => {
        if (post) {
            // Edit mode - populate form with post data
            setHtmlContent(post.content || "");
            setFormData({
                published: post.published !== undefined ? post.published : true,
                featured: post.featured || false
            });
        }
    }, [post]);

    const handleHTMLChange = (e) => {
        const html = e.target.value;
        setHtmlContent(html);
        
        // Auto-extract metadata from HTML
        if (html.length > 100) {
            try {
                const parsed = parseHTMLContent(html);
                setExtractedData(parsed);
            } catch (error) {
                console.error('Error parsing HTML:', error);
            }
        } else {
            setExtractedData(null);
        }
    };

    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!htmlContent.trim()) {
            alert("Te rog adaugă codul HTML al articolului.");
            return;
        }

        // If publishing, require GitHub token
        if (formData.published && !githubToken) {
            setShowGithubToken(true);
            alert("Pentru a publica articolul, te rog introdu cheia GitHub.");
            return;
        }

        setIsProcessing(true);
        setAutomationStatus(null);

        try {
            // Parse HTML to extract ALL metadata
            const parsed = parseHTMLContent(htmlContent);
            
            // Generate slug if not exists
            const slug = parsed.slug || generateSlug(parsed.title || 'articol-' + Date.now());
            
            // Use current date if not found in HTML
            const date = new Date().toISOString().split('T')[0];
            
            // Prepare post data - everything from HTML
            const postData = {
                slug: slug,
                title: parsed.title || 'Articol fără titlu',
                excerpt: parsed.excerpt || '',
                content: htmlContent, // Full HTML content
                image: parsed.image || '/assets/images/dummy-img-600x400.jpg',
                date: date,
                category: parsed.category || 'Social Media',
                author: parsed.author || 'Algo Digital Solutions',
                tags: parsed.tags || [],
                seo: parsed.seo || {
                    metaTitle: parsed.title || '',
                    metaDescription: parsed.excerpt || '',
                    keywords: parsed.keywords || ''
                },
                published: formData.published,
                featured: formData.featured
            };

            // If editing, preserve ID
            if (post && post.id) {
                postData.id = post.id;
            }

            // Save post to localStorage first
            const currentPosts = loadPosts();
            let updatedPosts;
            
            if (post && post.id) {
                // Update existing post
                updatedPosts = currentPosts.map(p => 
                    p.id === post.id ? postData : p
                );
            } else {
                // Create new post
                const newId = Math.max(...currentPosts.map(p => p.id || 0), 0) + 1;
                updatedPosts = [...currentPosts, { ...postData, id: newId }];
            }
            
            updatePosts(updatedPosts);
            onSave(postData);

            // If publishing, commit to GitHub
            if (formData.published && githubToken) {
                setAutomationStatus({ 
                    type: 'info', 
                    message: 'Se trimite către GitHub și se actualizează sitemap-ul...' 
                });
                
                // Generate sitemap with all published posts
                const sitemapXml = generateSitemap(updatedPosts);
                
                // Commit to GitHub
                try {
                    const response = await fetch('/api/github-commit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            githubToken: githubToken,
                            posts: updatedPosts,
                            sitemapXml: sitemapXml
                        }),
                    });

                    const result = await response.json();
                    
                    console.log('GitHub API Response:', result);

                    if (result.success) {
                        // Check if both files were updated
                        const blogPostsOk = result.results?.blogPosts?.success;
                        const sitemapOk = result.results?.sitemap?.success;
                        
                        if (blogPostsOk && sitemapOk) {
                            // Also submit to Google Indexing
                            const automationResults = await automatePostPublishing(postData);
                            
                            if (automationResults.googleIndexing.success) {
                                setAutomationStatus({ 
                                    type: 'success', 
                                    message: '✓ Articol trimis către GitHub, sitemap actualizat și trimis către Google! Vercel va face auto-deploy în câteva minute.' 
                                });
                            } else {
                                setAutomationStatus({ 
                                    type: 'success', 
                                    message: '✓ Articol trimis către GitHub și sitemap actualizat! Vercel va face auto-deploy în câteva minute. Google Indexing necesită configurare.' 
                                });
                            }
                        } else {
                            // Partial success
                            const errors = [];
                            if (!blogPostsOk) errors.push(`blogPosts.js: ${result.results?.blogPosts?.error || 'Failed'}`);
                            if (!sitemapOk) errors.push(`sitemap.xml: ${result.results?.sitemap?.error || 'Failed'}`);
                            
                            setAutomationStatus({ 
                                type: 'warning', 
                                message: `⚠ Eroare parțială: ${errors.join(', ')}. Verifică token-ul GitHub și permisiunile.` 
                            });
                        }
                    } else {
                        // Full failure
                        const errorDetails = [];
                        if (result.results?.blogPosts?.error) {
                            errorDetails.push(`blogPosts.js: ${result.results.blogPosts.error}`);
                        }
                        if (result.results?.sitemap?.error) {
                            errorDetails.push(`sitemap.xml: ${result.results.sitemap.error}`);
                        }
                        
                        const errorMessage = errorDetails.length > 0 
                            ? errorDetails.join(' | ')
                            : result.message || result.error || 'Eroare necunoscută';
                            
                        setAutomationStatus({ 
                            type: 'error', 
                            message: `✗ Eroare la trimiterea către GitHub: ${errorMessage}. Verifică token-ul GitHub și permisiunile (repo scope necesar).` 
                        });
                    }
                } catch (error) {
                    console.error('Error committing to GitHub:', error);
                    setAutomationStatus({ 
                        type: 'error', 
                        message: `✗ Eroare la trimiterea către GitHub: ${error.message}. Verifică conexiunea la internet și că API-ul este accesibil.` 
                    });
                }
            } else {
                setAutomationStatus({ 
                    type: 'info', 
                    message: '✓ Articol salvat ca draft. Va fi publicat și trimis către GitHub când îl marchezi ca publicat.' 
                });
            }

            // Reset status after 8 seconds
            setTimeout(() => {
                setAutomationStatus(null);
                setShowGithubToken(false);
                setGithubToken("");
            }, 8000);

        } catch (error) {
            console.error('Error saving post:', error);
            setAutomationStatus({ 
                type: 'error', 
                message: 'Eroare la salvare: ' + error.message 
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="card" style={{ padding: '2rem' }}>
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h3 className="title-heading mb-0">
                    {post ? "Editează Articol" : "Articol Nou"}
                </h3>
                <button
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    <i className="fa-solid fa-times"></i> Anulează
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gspace-4">
                    {/* HTML Content Editor - SINGLE FIELD */}
                    <div>
                        <label htmlFor="htmlContent" className="form-label">
                            Cod HTML Complet <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="htmlContent"
                            name="htmlContent"
                            rows="35"
                            value={htmlContent}
                            onChange={handleHTMLChange}
                            required
                            style={{ 
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                whiteSpace: 'pre',
                                overflowWrap: 'normal',
                                overflowX: 'auto',
                                minHeight: '600px'
                            }}
                            placeholder="Lipește aici codul HTML complet al articolului (cu &lt;!DOCTYPE html&gt;, &lt;head&gt;, &lt;body&gt;, styles, scripts, etc.)..."
                            disabled={isProcessing}
                        />
                        <small className="text-muted d-block mt-2">
                            <strong>Totul se extrage automat din HTML:</strong> title, description, image, category, tags, SEO metadata. 
                            Slug-ul se generează automat din titlu, data este cea de astăzi.
                        </small>
                    </div>

                    {/* Extracted Data Preview */}
                    {extractedData && extractedData.title && (
                        <div className="alert alert-success" role="alert">
                            <strong>✓ Metadata extrasă automat:</strong>
                            <ul className="mb-0 mt-2" style={{ paddingLeft: '1.5rem' }}>
                                <li><strong>Titlu:</strong> {extractedData.title}</li>
                                {extractedData.excerpt && (
                                    <li><strong>Excerpt:</strong> {extractedData.excerpt.substring(0, 150)}...</li>
                                )}
                                {extractedData.category && (
                                    <li><strong>Categorie:</strong> {extractedData.category}</li>
                                )}
                                {extractedData.tags && extractedData.tags.length > 0 && (
                                    <li><strong>Tags:</strong> {extractedData.tags.join(', ')}</li>
                                )}
                                <li><strong>Slug:</strong> {extractedData.slug}</li>
                            </ul>
                        </div>
                    )}

                    {/* GitHub Token - Show when publishing */}
                    {showGithubToken && formData.published && (
                        <div className="alert alert-warning" role="alert">
                            <label htmlFor="githubToken" className="form-label">
                                <strong>Cheie GitHub (Personal Access Token)</strong> <span className="text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="githubToken"
                                value={githubToken}
                                onChange={(e) => setGithubToken(e.target.value)}
                                placeholder="ghp_..."
                                disabled={isProcessing}
                                style={{ fontFamily: 'monospace' }}
                            />
                            <small className="text-muted d-block mt-2">
                                Token-ul este necesar pentru a trimite articolul către GitHub. Nu este salvat și este folosit doar pentru acest commit.
                                <br />
                                <strong>Permisiuni necesare:</strong> repo (Full control of private repositories)
                            </small>
                        </div>
                    )}

                    {/* Options - Only Published and Featured */}
                    <div className="d-flex flex-row gspace-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={formData.published}
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.checked) {
                                        setShowGithubToken(true);
                                    }
                                }}
                                disabled={isProcessing}
                            />
                            <label className="form-check-label" htmlFor="published">
                                Publicat (va fi trimis automat către GitHub și Google)
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="featured"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                disabled={isProcessing}
                            />
                            <label className="form-check-label" htmlFor="featured">
                                Featured
                            </label>
                        </div>
                    </div>

                    {/* Automation Status */}
                    {automationStatus && (
                        <div className={`alert ${
                            automationStatus.type === 'success' ? 'alert-success' :
                            automationStatus.type === 'error' ? 'alert-danger' :
                            automationStatus.type === 'warning' ? 'alert-warning' :
                            'alert-info'
                        }`} role="alert">
                            {automationStatus.message}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="d-flex flex-row gspace-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                            disabled={isProcessing}
                        >
                            Anulează
                        </button>
                        <button
                            type="submit"
                            className="btn btn-accent"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Se salvează...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-save"></i> Salvează Articol
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default AdminPostForm;
