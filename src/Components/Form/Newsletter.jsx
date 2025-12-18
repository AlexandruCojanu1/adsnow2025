import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function NewsletterSection() {

    return (
        <div className="section">
            <div className="hero-container">
                <div className="newsletter-wrapper">
                    <div className="newsletter-layout">
                        <div className="spacer"></div>
                        <div className="d-flex flex-column gspace-5 position-relative z-2">
                            <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                <div className="d-flex flex-column gspace-2">
                                    <h3 className="title-heading">Ești Pregătit să-ți Construiești Identitatea Digitală?</h3>
                                    <p>
                                        Scrie-ne numele companiei și în <strong>24 de ore</strong> primești un răspuns dacă brandul tău este compatibil cu filozofia noastră. <strong>Nu vindem servicii. Alegem parteneri.</strong>
                                    </p>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <a 
                                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="btn btn-accent newsletter-btn"
                                >
                                    <span className="btn-title">
                                        <span>Aplică acum</span>
                                    </span>
                                    <span className="icon-circle">
                                        <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                                    </span>
                                </a>
                            </AnimateOnScroll>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterSection;