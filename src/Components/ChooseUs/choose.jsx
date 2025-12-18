import React from "react";
import { whychooseus } from "../../Data/ChooseUsData";
import ChooseUsCard from "../Card/ChoooseUsCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ChooseUsSection(){
    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="chooseus-card-container">
                            <div className="d-flex flex-column gspace-2">
                                {whychooseus.slice(0, 3).map((item) => (
                                    <ChooseUsCard 
                                        key={item.id}
                                        icon={item.icon}
                                        title={item.title}
                                        content={item.content}
                                        link={item.link}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="chooseus-content-container">
                            <div className="d-flex flex-column gspace-5">
                                <AnimateOnScroll animation="fadeInDown" speed="normal">
                                    <div className="d-flex flex-column gspace-2">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>De Ce Să Ne Alegeți</span>
                                        </div>
                                        <h2 className="title-heading"><strong>Vizibilitate. Stabilitate. Predictibilitate.</strong></h2>
                                        <p className="mb-0"><strong>Strategie digitală integrată</strong> (branding, web, social, SEO, ADS) construită să-ți ofere <strong>direcție clară</strong>. <strong>Execuție rapidă și calitate</strong>. <strong>Siguranță</strong>. Un partener care îți spune și ce să nu faci, nu doar ce vrei să auzi.</p>
                                    </div>
                                </AnimateOnScroll>
                                <div className="image-container">
                                    <img src="/assets/images/Gemini_Generated_Image_kzt06fkzt06fkzt0.webp" alt="Why Choose Us Image" className="chooseus-img" />
                                    <div className="card-chooseus-cta-layout">
                                        <div className="chooseus-cta-spacer"></div>
                                        <div className="d-flex flex-column align-items-end">
                                            <div className="chooseus-cta-spacer"></div>
                                            <div className="card-chooseus-cta-wrapper">
                                                <AnimateOnScroll animation="fadeInUp" speed="normal">

                                                    <div className="card card-chooseus-cta">
                                                        <h5>Ești pregătit să-ți construiești identitatea digitală?</h5>
                                                        <div className="link-wrapper">
                                                            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Aplică acum</a>
                                                            <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                                                        </div>
                                                    </div>
                                                </AnimateOnScroll>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ChooseUsSection;