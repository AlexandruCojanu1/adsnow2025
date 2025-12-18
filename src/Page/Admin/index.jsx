import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadTitle from "../../Components/Head/HeadTitle";
import AdminLogin from "../../Components/Admin/AdminLogin";
import AdminDashboard from "../../Components/Admin/AdminDashboard";

function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const authToken = localStorage.getItem('admin_auth_token');
        if (authToken === process.env.REACT_APP_ADMIN_TOKEN || authToken === 'admin-secure-token-2025') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('admin_auth_token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_auth_token');
        setIsAuthenticated(false);
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeadTitle 
                title="Admin Panel - Gestionare Blog | ADSNOW"
                description="Panou de administrare pentru gestionarea articolelor blog"
            />
            {isAuthenticated ? (
                <AdminDashboard onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </>
    );
}

export default AdminPage;
