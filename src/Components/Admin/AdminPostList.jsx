import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminPostList = ({ posts, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterPublished, setFilterPublished] = useState("all"); // "all", "published", "draft"

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.category.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = filterPublished === "all" ||
                            (filterPublished === "published" && post.published) ||
                            (filterPublished === "draft" && !post.published);
        
        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="d-flex flex-column gspace-3">
            {/* Filters */}
            <div className="card" style={{ padding: '1.5rem' }}>
                <div className="row gspace-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Caută articole..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={filterPublished}
                            onChange={(e) => setFilterPublished(e.target.value)}
                        >
                            <option value="all">Toate articolele</option>
                            <option value="published">Publicate</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Posts List */}
            <div className="d-flex flex-column gspace-2">
                {filteredPosts.length === 0 ? (
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <p>Nu există articole care să corespundă criteriilor.</p>
                    </div>
                ) : (
                    filteredPosts.map(post => (
                        <div key={post.id} className="card" style={{ padding: '1.5rem' }}>
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <div className="d-flex flex-column gspace-2">
                                        <div className="d-flex flex-row gspace-2 align-items-center">
                                            <h4 className="mb-0">{post.title}</h4>
                                            {post.published ? (
                                                <span className="badge bg-success">Publicat</span>
                                            ) : (
                                                <span className="badge bg-warning">Draft</span>
                                            )}
                                            {post.featured && (
                                                <span className="badge bg-primary">Featured</span>
                                            )}
                                        </div>
                                        <p className="mb-0 text-muted">{post.excerpt}</p>
                                        <div className="d-flex flex-row gspace-3">
                                            <small className="text-muted">
                                                <i className="fa-solid fa-calendar"></i> {formatDate(post.date)}
                                            </small>
                                            <small className="text-muted">
                                                <i className="fa-solid fa-folder"></i> {post.category}
                                            </small>
                                            <small className="text-muted">
                                                <i className="fa-solid fa-link"></i> /blog/{post.slug}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="d-flex flex-row gspace-2 justify-content-end">
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            <i className="fa-solid fa-eye"></i> Vezi
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => onEdit(post)}
                                        >
                                            <i className="fa-solid fa-edit"></i> Editează
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => onDelete(post.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Șterge
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Stats */}
            <div className="card" style={{ padding: '1rem' }}>
                <div className="row text-center">
                    <div className="col-md-4">
                        <h5>{posts.length}</h5>
                        <small className="text-muted">Total Articole</small>
                    </div>
                    <div className="col-md-4">
                        <h5>{posts.filter(p => p.published).length}</h5>
                        <small className="text-muted">Publicate</small>
                    </div>
                    <div className="col-md-4">
                        <h5>{posts.filter(p => !p.published).length}</h5>
                        <small className="text-muted">Draft</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPostList;
