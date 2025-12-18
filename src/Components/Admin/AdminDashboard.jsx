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

    const handleDelete = async (postId) => {
        const postToDelete = posts.find(p => p.id === postId);
        if (!postToDelete) return;
        
        if (window.confirm(`Ești sigur că vrei să ștergi articolul "${postToDelete.title}"?\n\nAceastă acțiune va șterge articolul din localStorage și va actualiza GitHub.`)) {
            const updatedPosts = posts.filter(p => p.id !== postId);
            handleSavePosts(updatedPosts);
            
            // If post was published, update GitHub
            if (postToDelete.published) {
                try {
                    // Get saved GitHub token
                    const githubToken = localStorage.getItem('github_token');
                    if (githubToken) {
                        // Generate sitemap with updated posts
                        const { generateSitemap } = await import('../../utils/blogAutomation');
                        const sitemapXml = generateSitemap(updatedPosts);
                        
                        // Update GitHub
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
                        
                        if (response.ok) {
                            const result = await response.json();
                            if (result.success) {
                                alert('✓ Articol șters cu succes! Modificările au fost trimise către GitHub.');
                            } else {
                                alert('⚠ Articol șters local, dar actualizarea GitHub a eșuat. Verifică erorile.');
                            }
                        } else {
                            alert('⚠ Articol șters local, dar actualizarea GitHub a eșuat. Verifică token-ul GitHub.');
                        }
                    } else {
                        alert('⚠ Articol șters doar local. Pentru a șterge și din GitHub, adaugă token-ul GitHub în formularul de publicare.');
                    }
                } catch (error) {
                    console.error('Error updating GitHub after delete:', error);
                    alert('⚠ Articol șters local, dar actualizarea GitHub a eșuat: ' + error.message);
                }
            } else {
                alert('✓ Articol draft șters cu succes!');
            }
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setMode("list");
        setSelectedPost(null);
    };

    const handleFormSave = async (postData) => {
        let updatedPosts;
        const isNewPost = !selectedPost;
        
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
        
        // Note: Automation is handled in AdminPostForm component
        // This allows for better user feedback during the process
        
        handleFormClose();
    };

    const handleExportPosts = () => {
        const dataStr = JSON.stringify(posts, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert('✓ Articolele au fost exportate! Acum trebuie să:\n1. Deschizi fișierul JSON\n2. Îl copiezi în src/Data/blogPosts.js (înlocuiește array-ul blogPosts)\n3. Faci commit și push pe GitHub');
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
                                className="btn btn-outline-primary"
                                onClick={handleExportPosts}
                                title="Exportă toate articolele ca JSON pentru commit în Git"
                            >
                                <i className="fa-solid fa-download"></i> Exportă Articole
                            </button>
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
