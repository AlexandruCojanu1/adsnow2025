import React, { useState, useEffect } from "react";
import { parseHTMLContent, generateSlug } from "../../utils/htmlParser";
import { automatePostPublishing } from "../../utils/blogAutomation";

const AdminPostForm = ({ post, onSave, onCancel }) => {
    const [htmlContent, setHtmlContent] = useState("");
    const [formData, setFormData] = useState({
        slug: "",
        date: new Date().toISOString().split('T')[0],
        author: "Algo Digital Solutions",
        published: true,
        featured: false
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [automationStatus, setAutomationStatus] = useState(null);

    useEffect(() => {
        if (post) {
            // Edit mode - populate form with post data
            setHtmlContent(post.content || "");
            setFormData({
                slug: post.slug || "",
                date: post.date || new Date().toISOString().split('T')[0],
                author: post.author || "Algo Digital Solutions",
                published: post.published !== undefined ? post.published : true,
                featured: post.featured || false
            });
        }
    }, [post]);

    const handleHTMLChange = (e) => {
        const html = e.target.value;
        setHtmlContent(html);
        
        // Auto-extract metadata from HTML if not in edit mode
        if (!post && html.length > 100) {
            try {
                const parsed = parseHTMLContent(html);
                setFormData(prev => ({
                    ...prev,
                    slug: parsed.slug || prev.slug,
                }));
            } catch (error) {
                console.error('Error parsing HTML:', error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!htmlContent.trim()) {
            alert("Te rog adaugă conținutul HTML al articolului.");
            return;
        }

        setIsProcessing(true);
        setAutomationStatus(null);

        try {
            // Parse HTML to extract metadata
            const parsed = parseHTMLContent(htmlContent);
            
            // Prepare post data
            const postData = {
                slug: formData.slug || parsed.slug,
                title: parsed.title,
                excerpt: parsed.excerpt,
                content: htmlContent,
                image: parsed.image,
                date: formData.date,
                category: parsed.category,
                author: formData.author,
                tags: parsed.tags,
                seo: parsed.seo,
                published: formData.published,
                featured: formData.featured
            };

            // Save post first
            onSave(postData);

            // Automate sitemap and Google Indexing
            if (formData.published) {
                setAutomationStatus({ type: 'info', message: 'Se actualizează sitemap-ul și se trimite către Google...' });
                
                const automationResults = await automatePostPublishing(postData);
                
                if (automationResults.sitemap.success && automationResults.googleIndexing.success) {
                    setAutomationStatus({ 
                        type: 'success', 
                        message: '✓ Articol salvat, sitemap actualizat și trimis către Google cu succes!' 
                    });
                } else if (automationResults.sitemap.success) {
                    setAutomationStatus({ 
                        type: 'warning', 
                        message: '✓ Articol salvat și sitemap actualizat. Google Indexing necesită configurare API.' 
                    });
                } else {
                    setAutomationStatus({ 
                        type: 'info', 
                        message: '✓ Articol salvat. Automatizarea va rula la build.' 
                    });
                }
            } else {
                setAutomationStatus({ 
                    type: 'info', 
                    message: '✓ Articol salvat ca draft. Va fi publicat și trimis către Google când îl marchezi ca publicat.' 
                });
            }

            // Reset status after 5 seconds
            setTimeout(() => {
                setAutomationStatus(null);
            }, 5000);

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
                    {/* HTML Content Editor */}
                    <div>
                        <label htmlFor="htmlContent" className="form-label">
                            Conținut HTML Complet <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="htmlContent"
                            name="htmlContent"
                            rows="25"
                            value={htmlContent}
                            onChange={handleHTMLChange}
                            required
                            style={{ 
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                whiteSpace: 'pre',
                                overflowWrap: 'normal',
                                overflowX: 'auto'
                            }}
                            placeholder="Lipește aici codul HTML complet al articolului..."
                            disabled={isProcessing}
                        />
                        <small className="text-muted">
                            Adaugă codul HTML complet. Metadata (title, description, etc.) va fi extrasă automat din HTML.
                        </small>
                    </div>

                    {/* Basic Info */}
                    <div className="row gspace-3">
                        <div className="col-md-6">
                            <label htmlFor="slug" className="form-label">
                                Slug (URL) <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="slug"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                required
                                pattern="[a-z0-9-]+"
                                title="Doar litere mici, cifre și cratime"
                                disabled={isProcessing}
                            />
                            <small className="text-muted">Ex: analiza-web-design-brasov-2025</small>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="date" className="form-label">
                                Dată Publicare <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                disabled={isProcessing}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="author" className="form-label">
                            Autor
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            disabled={isProcessing}
                        />
                    </div>

                    {/* Options */}
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
                                Publicat (va fi trimis automat către Google)
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

                    {/* Info Box */}
                    <div className="alert alert-info" role="alert">
                        <strong>Automatizare:</strong> Când salvezi un articol ca <strong>Publicat</strong>, sistemul va:
                        <ul className="mb-0 mt-2">
                            <li>Actualiza automat sitemap.xml</li>
                            <li>Trimite articolul către Google Indexing API pentru indexare rapidă</li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminPostForm;
