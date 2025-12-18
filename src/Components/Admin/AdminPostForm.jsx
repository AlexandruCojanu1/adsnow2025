import React, { useState, useEffect } from "react";
import { parseHTMLContent, generateSlug } from "../../utils/htmlParser";
import { automatePostPublishing, generateSitemap } from "../../utils/blogAutomation";
import { loadPosts, updatePosts } from "../../Data/blogPosts";

// Helper function to generate blogPosts.js content (same as in API)
function generateBlogPostsJsContent(posts) {
  const postsJson = JSON.stringify(posts, null, 2);
  
  return `// Blog posts data structure
// Each post should have: id, slug, title, excerpt, content, image, date, category, author, tags, seo

export const blogPosts = ${postsJson};

// Helper function to get post by slug
export const getPostBySlug = (slug) => {
  const posts = loadPosts();
  return posts.find(post => post.slug === slug);
};

// Helper function to get all published posts
export const getPublishedPosts = () => {
  const posts = loadPosts();
  return posts.filter(post => post.published);
};

// Helper function to get featured posts
export const getFeaturedPosts = () => {
  const posts = loadPosts();
  return posts.filter(post => post.featured && post.published);
};

// Helper function to get posts by category
export const getPostsByCategory = (category) => {
  const posts = loadPosts();
  return posts.filter(post => post.category === category && post.published);
};

// Function to load posts from localStorage or use default
export const loadPosts = () => {
  try {
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    }
  } catch (e) {
    console.error('Error loading posts from localStorage:', e);
  }
  return blogPosts;
};

// Export posts with localStorage support
export let blogPostsData = loadPosts();

// Update function for admin
export const updatePosts = (newPosts) => {
  blogPostsData = newPosts;
  localStorage.setItem('blog_posts', JSON.stringify(newPosts));
};
`;
}

const AdminPostForm = ({ post, onSave, onCancel }) => {
    const [htmlContent, setHtmlContent] = useState("");
    const [formData, setFormData] = useState({
        published: true,
        featured: false
    });
    const [githubToken, setGithubToken] = useState("");
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

            // If publishing, try to commit to GitHub if token is provided

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

            // If publishing, commit to GitHub using GitHub API directly
            if (formData.published && githubToken) {
                setAutomationStatus({ 
                    type: 'info', 
                    message: 'Se trimite către GitHub și se actualizează sitemap-ul...' 
                });
                
                // Generate sitemap with all published posts
                const sitemapXml = generateSitemap(updatedPosts);
                
                // Try GitHub API first, fallback to direct fetch if API route fails
                try {
                    console.log('=== Starting GitHub Commit ===');
                    console.log('Sending request to /api/github-commit...');
                    console.log('Posts count:', updatedPosts.length);
                    console.log('Sitemap length:', sitemapXml.length);
                    console.log('Token length:', githubToken.length);
                    
                    const startTime = Date.now();
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
                    
                    const elapsed = Date.now() - startTime;
                    console.log(`Response received in ${elapsed}ms`);
                    console.log('Response status:', response.status);
                    console.log('Response ok:', response.ok);
                    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.error('API Error Response:', errorText);
                        let errorData;
                        try {
                            errorData = JSON.parse(errorText);
                        } catch {
                            errorData = { message: errorText, status: response.status };
                        }
                        throw new Error(errorData.message || `HTTP ${response.status}: ${errorText}`);
                    }
                    
                    const result = await response.json();
                    
                    console.log('=== GitHub API Response ===');
                    console.log('Success:', result.success);
                    console.log('Results:', result.results);
                    console.log('Message:', result.message);

                    if (result.success) {
                        // Check verification status
                        const blogPostsVerified = result.verified?.blogPosts;
                        const sitemapVerified = result.verified?.sitemap;
                        const bothVerified = result.verified?.both;
                        
                        if (bothVerified) {
                            // Both files updated and verified
                            const commitUrls = [];
                            if (result.githubUrls?.blogPosts) {
                                commitUrls.push(`<a href="${result.githubUrls.blogPosts}" target="_blank" rel="noopener noreferrer">Commit blogPosts.js</a>`);
                            }
                            if (result.githubUrls?.sitemap) {
                                commitUrls.push(`<a href="${result.githubUrls.sitemap}" target="_blank" rel="noopener noreferrer">Commit sitemap.xml</a>`);
                            }
                            
                            // Also submit to Google Indexing
                            const automationResults = await automatePostPublishing(postData);
                            
                            let statusMessage = '✓ Articol și sitemap publicate cu succes în GitHub! ';
                            if (commitUrls.length > 0) {
                                statusMessage += `Verifică commit-urile: ${commitUrls.join(' | ')}. `;
                            }
                            statusMessage += 'Vercel va face auto-deploy în câteva minute.';
                            
                            if (automationResults.googleIndexing.success) {
                                statusMessage += ' Trimis către Google Indexing.';
                            }
                            
                            setAutomationStatus({ 
                                type: 'success', 
                                message: statusMessage
                            });
                        } else if (blogPostsVerified) {
                            // Only blogPosts verified
                            let statusMessage = '✓ Articol publicat în GitHub! ';
                            if (result.githubUrls?.blogPosts) {
                                statusMessage += `<a href="${result.githubUrls.blogPosts}" target="_blank" rel="noopener noreferrer">Verifică commit-ul</a>. `;
                            }
                            statusMessage += 'Sitemap a eșuat. Vercel va face auto-deploy.';
                            
                            setAutomationStatus({ 
                                type: 'warning', 
                                message: statusMessage
                            });
                        } else {
                            // Partial or no success
                            const errors = [];
                            if (!blogPostsVerified) {
                                errors.push(`blogPosts.js: ${result.results?.blogPosts?.error || 'Nu s-a putut verifica commit-ul'}`);
                            }
                            if (!sitemapVerified && result.results?.sitemap?.error) {
                                errors.push(`sitemap.xml: ${result.results.sitemap.error}`);
                            }
                            
                            setAutomationStatus({ 
                                type: 'error', 
                                message: `✗ Eroare: ${errors.join(' | ')}. Verifică token-ul GitHub și permisiunile.` 
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
                    console.error('Error committing to GitHub via API:', error);
                    
                    // Fallback: Try direct GitHub API call from client
                    try {
                        console.log('Trying direct GitHub API call as fallback...');
                        setAutomationStatus({ 
                            type: 'info', 
                            message: 'Încearcă metoda alternativă...' 
                        });
                        
                        // Direct GitHub API call
                        const blogPostsContent = generateBlogPostsJsContent(updatedPosts);
                        const base64Content = btoa(unescape(encodeURIComponent(blogPostsContent)));
                        const base64Sitemap = btoa(unescape(encodeURIComponent(sitemapXml)));
                        
                        // Get current SHA for blogPosts.js
                        const blogPostsShaResponse = await fetch(
                            `https://api.github.com/repos/AlexandruCojanu1/adsnow2025/contents/src/Data/blogPosts.js`,
                            {
                                headers: {
                                    'Authorization': `token ${githubToken}`,
                                    'Accept': 'application/vnd.github.v3+json',
                                }
                            }
                        );
                        const blogPostsSha = blogPostsShaResponse.ok ? (await blogPostsShaResponse.json()).sha : null;
                        
                        // Update blogPosts.js
                        const blogPostsUpdateResponse = await fetch(
                            `https://api.github.com/repos/AlexandruCojanu1/adsnow2025/contents/src/Data/blogPosts.js`,
                            {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `token ${githubToken}`,
                                    'Accept': 'application/vnd.github.v3+json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    message: `Update blog posts - ${new Date().toISOString()}`,
                                    content: base64Content,
                                    branch: 'main',
                                    ...(blogPostsSha && { sha: blogPostsSha })
                                })
                            }
                        );
                        
                        if (!blogPostsUpdateResponse.ok) {
                            throw new Error(`GitHub API error: ${blogPostsUpdateResponse.status}`);
                        }
                        
                        const blogPostsResult = await blogPostsUpdateResponse.json();
                        console.log('✓ BlogPosts updated directly:', blogPostsResult.commit?.sha);
                        
                        // Get current SHA for sitemap.xml
                        await new Promise(resolve => setTimeout(resolve, 500));
                        const sitemapShaResponse = await fetch(
                            `https://api.github.com/repos/AlexandruCojanu1/adsnow2025/contents/public/sitemap.xml`,
                            {
                                headers: {
                                    'Authorization': `token ${githubToken}`,
                                    'Accept': 'application/vnd.github.v3+json',
                                }
                            }
                        );
                        const sitemapSha = sitemapShaResponse.ok ? (await sitemapShaResponse.json()).sha : null;
                        
                        // Update sitemap.xml
                        const sitemapUpdateResponse = await fetch(
                            `https://api.github.com/repos/AlexandruCojanu1/adsnow2025/contents/public/sitemap.xml`,
                            {
                                method: 'PUT',
                                headers: {
                                    'Authorization': `token ${githubToken}`,
                                    'Accept': 'application/vnd.github.v3+json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    message: `Update sitemap - ${new Date().toISOString()}`,
                                    content: base64Sitemap,
                                    branch: 'main',
                                    ...(sitemapSha && { sha: sitemapSha })
                                })
                            }
                        );
                        
                        if (!sitemapUpdateResponse.ok) {
                            throw new Error(`Sitemap update error: ${sitemapUpdateResponse.status}`);
                        }
                        
                        const sitemapResult = await sitemapUpdateResponse.json();
                        console.log('✓ Sitemap updated directly:', sitemapResult.commit?.sha);
                        
                        // Success via direct API
                        const automationResults = await automatePostPublishing(postData);
                        
                        setAutomationStatus({ 
                            type: 'success', 
                            message: `✓ Articol și sitemap publicate direct în GitHub! 
                            <a href="${blogPostsResult.commit?.html_url}" target="_blank">Commit blogPosts</a> | 
                            <a href="${sitemapResult.commit?.html_url}" target="_blank">Commit sitemap</a>
                            Vercel va face auto-deploy.` 
                        });
                        
                    } catch (fallbackError) {
                        console.error('Fallback also failed:', fallbackError);
                        setAutomationStatus({ 
                            type: 'error', 
                            message: `✗ Eroare la trimiterea către GitHub: ${fallbackError.message}. 
                            Verifică token-ul GitHub și permisiunile (repo scope necesar).` 
                        });
                    }
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
                    {formData.published && (
                        <div className="alert alert-info" role="alert">
                            <label htmlFor="githubToken" className="form-label">
                                <strong>Cheie GitHub (Personal Access Token)</strong>
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
                                onChange={handleChange}
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
