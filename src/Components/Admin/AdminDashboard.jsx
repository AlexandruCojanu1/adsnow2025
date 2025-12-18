import React, { useState, useEffect } from "react";
import { blogPosts as initialPosts, loadPosts, updatePosts } from "../../Data/blogPosts";
import AdminPostList from "./AdminPostList";
import AdminPostForm from "./AdminPostForm";

const AdminDashboard = ({ onLogout }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("list"); // "list" or "form"

    useEffect(() => {
        // Load posts from localStorage or use initial posts
        const loadedPosts = loadPosts();
        setPosts(loadedPosts);
    }, []);

    const handleSavePosts = (updatedPosts) => {
        setPosts(updatedPosts);
        updatePosts(updatedPosts);
        
        // Also update the blogPosts.js file content (for reference)
        // Note: In production, this should be done via API
    };

    const handleCreate = () => {
        setSelectedPost(null);
        setMode("form");
        setShowForm(true);
    };

    const handleEdit = (post) => {
        setSelectedPost(post);
        setMode("form");
        setShowForm(true);
    };

    const handleDelete = (postId) => {
        if (window.confirm("Ești sigur că vrei să ștergi acest articol?")) {
            const updatedPosts = posts.filter(p => p.id !== postId);
            handleSavePosts(updatedPosts);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setMode("list");
        setSelectedPost(null);
    };

    const handleFormSave = (postData) => {
        let updatedPosts;
        
        if (selectedPost) {
            // Update existing post
            updatedPosts = posts.map(p => 
                p.id === selectedPost.id ? { ...postData, id: selectedPost.id } : p
            );
        } else {
            // Create new post
            const newId = Math.max(...posts.map(p => p.id), 0) + 1;
            updatedPosts = [...posts, { ...postData, id: newId }];
        }
        
        handleSavePosts(updatedPosts);
        handleFormClose();
    };

    return (
        <div className="section" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
            <div className="hero-container">
                <div className="d-flex flex-column gspace-4">
                    {/* Header */}
                    <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>
                            <h1 className="title-heading">Admin Dashboard</h1>
                            <p>Gestionează articolele blog</p>
                        </div>
                        <div className="d-flex flex-row gspace-2">
                            <button
                                className="btn btn-accent"
                                onClick={handleCreate}
                            >
                                <i className="fa-solid fa-plus"></i> Articol Nou
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={onLogout}
                            >
                                <i className="fa-solid fa-sign-out"></i> Deconectează-te
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    {mode === "list" && (
                        <AdminPostList
                            posts={posts}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                    {mode === "form" && (
                        <AdminPostForm
                            post={selectedPost}
                            onSave={handleFormSave}
                            onCancel={handleFormClose}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
