import React, { useState, useEffect } from "react";

const AdminPostForm = ({ post, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        image: "/assets/images/dummy-img-600x400.jpg",
        date: new Date().toISOString().split('T')[0],
        category: "Social Media",
        author: "Algo Digital Solutions",
        tags: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        published: true,
        featured: false
    });

    useEffect(() => {
        if (post) {
            // Edit mode - populate form with post data
            setFormData({
                slug: post.slug || "",
                title: post.title || "",
                excerpt: post.excerpt || "",
                content: post.content || "",
                image: post.image || "/assets/images/dummy-img-600x400.jpg",
                date: post.date || new Date().toISOString().split('T')[0],
                category: post.category || "Social Media",
                author: post.author || "Algo Digital Solutions",
                tags: post.tags ? post.tags.join(", ") : "",
                metaTitle: post.seo?.metaTitle || "",
                metaDescription: post.seo?.metaDescription || "",
                keywords: post.seo?.keywords || "",
                published: post.published !== undefined ? post.published : true,
                featured: post.featured || false
            });
        } else {
            // Create mode - generate slug from title
            const generateSlug = (title) => {
                return title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
            };

            const handleTitleChange = (title) => {
                setFormData(prev => ({
                    ...prev,
                    title,
                    slug: generateSlug(title),
                    metaTitle: prev.metaTitle || title
                }));
            };

            // Store handler for title changes
            window.__adminTitleHandler = handleTitleChange;
        }
    }, [post]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === "title" && !post) {
            // Auto-generate slug for new posts
            const slug = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            
            setFormData(prev => ({
                ...prev,
                [name]: value,
                slug: slug,
                metaTitle: prev.metaTitle || value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare post data
        const postData = {
            slug: formData.slug,
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            image: formData.image,
            date: formData.date,
            category: formData.category,
            author: formData.author,
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
            seo: {
                metaTitle: formData.metaTitle || formData.title,
                metaDescription: formData.metaDescription || formData.excerpt,
                keywords: formData.keywords
            },
            published: formData.published,
            featured: formData.featured
        };

        onSave(postData);
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
                >
                    <i className="fa-solid fa-times"></i> Anulează
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column gspace-4">
                    {/* Basic Information */}
                    <div className="row gspace-3">
                        <div className="col-md-8">
                            <label htmlFor="title" className="form-label">
                                Titlu <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="date" className="form-label">
                                Dată <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                            />
                            <small className="text-muted">Ex: mastering-instagram-ads</small>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">
                                Categorie <span className="text-danger">*</span>
                            </label>
                            <select
                                className="form-select"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="Social Media">Social Media</option>
                                <option value="SEO">SEO</option>
                                <option value="Brand Strategy">Brand Strategy</option>
                                <option value="Performance Marketing">Performance Marketing</option>
                                <option value="Content Marketing">Content Marketing</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="excerpt" className="form-label">
                            Excerpt (Descriere scurtă) <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="excerpt"
                            name="excerpt"
                            rows="3"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="form-label">
                            Conținut (HTML) <span className="text-danger">*</span>
                        </label>
                        <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            rows="15"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            style={{ fontFamily: 'monospace' }}
                        />
                        <small className="text-muted">
                            Poți folosi HTML tags: &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
                        </small>
                    </div>

                    <div className="row gspace-3">
                        <div className="col-md-6">
                            <label htmlFor="image" className="form-label">
                                Imagine
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="/assets/images/image.jpg"
                            />
                        </div>
                        <div className="col-md-6">
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
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="tags" className="form-label">
                            Tags (separate prin virgulă)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="tag1, tag2, tag3"
                        />
                    </div>

                    {/* SEO Section */}
                    <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--accent-color-4)' }}>
                        <h5 className="mb-3">SEO Settings</h5>
                        <div className="d-flex flex-column gspace-3">
                            <div>
                                <label htmlFor="metaTitle" className="form-label">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="metaTitle"
                                    name="metaTitle"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="metaDescription" className="form-label">
                                    Meta Description
                                </label>
                                <textarea
                                    className="form-control"
                                    id="metaDescription"
                                    name="metaDescription"
                                    rows="2"
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="keywords" className="form-label">
                                    Keywords
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="keywords"
                                    name="keywords"
                                    value={formData.keywords}
                                    onChange={handleChange}
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                            </div>
                        </div>
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
                            />
                            <label className="form-check-label" htmlFor="published">
                                Publicat
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
                            />
                            <label className="form-check-label" htmlFor="featured">
                                Featured
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="d-flex flex-row gspace-2 justify-content-end">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                        >
                            Anulează
                        </button>
                        <button
                            type="submit"
                            className="btn btn-accent"
                        >
                            <i className="fa-solid fa-save"></i> Salvează Articol
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminPostForm;
