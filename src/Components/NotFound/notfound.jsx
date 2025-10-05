import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const NotFoundSection = () => {
    
    useAnimateOnScroll();

    return (
        <div className="section-404">
            <div className="banner-layout-404">
                <div className="layout-404">
                    <span
                        className="text-404 title-heading animate-box animated animate__animated"
                        data-animate="animate__fadeInRight"
                    >
                        404
                    </span>
                    <h3>Oops! Page Not Found</h3>
                    <p>
                        We couldn't find the page you're looking for. It might have been
                        removed, renamed, or never existed.
                    </p>
                    <div>
                        <a href="/" className="btn btn-accent">
                            <div className="btn-title">
                                <span>Back to Home</span>
                            </div>
                            <div className="icon-circle">
                                <i className="fa-solid fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundSection;
