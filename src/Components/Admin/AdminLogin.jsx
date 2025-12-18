import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simple password authentication
        // In production, this should be replaced with proper authentication
        const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD || "admin2025";
        
        if (password === correctPassword) {
            const token = 'admin-secure-token-2025';
            onLogin(token);
        } else {
            setError("Parolă incorectă. Te rog încearcă din nou.");
            setIsLoading(false);
        }
    };

    return (
        <div className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-container">
                <div className="row justify-content-center">
                    <div className="col-lg-5 col-md-7">
                        <div className="card" style={{ padding: '2rem', border: '1px solid var(--accent-color-3)' }}>
                            <div className="d-flex flex-column gspace-3">
                                <div className="text-center">
                                    <h2 className="title-heading">Admin Panel</h2>
                                    <p>Introdu parola pentru a accesa panoul de administrare</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column gspace-3">
                                        <div>
                                            <label htmlFor="password" className="form-label">
                                                Parolă
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                autoFocus
                                                disabled={isLoading}
                                            />
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger" role="alert">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn btn-accent w-100"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Se conectează..." : "Conectează-te"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
