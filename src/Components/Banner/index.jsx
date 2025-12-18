import React, { useRef } from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import DarkVeil from "./DarkVeil";

function BannerHomeSection() {

    const videoContainerRef = useRef(null);

    return (
        <div className="section-banner">
            <AnimateOnScroll animation="fadeInUp">
                <div
                    ref={videoContainerRef}
                    className="banner-video-container keep-dark"
                >
                    <div className="banner-background-wrapper">
                        <DarkVeil 
                            speed={0.5}
                            hueShift={0}
                            noiseIntensity={0}
                            scanlineIntensity={0}
                            scanlineFrequency={0}
                            warpAmount={0}
                            resolutionScale={1}
                        />
                    </div>
                    <div className="hero-container position-relative">
                        <div className="d-flex flex-column gspace-2">
                            <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                <h1 className="title-heading-banner">
                                    Your Online Identity Advisor
                                </h1>
                            </AnimateOnScroll>
                            <div className="banner-heading">

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="banner-video-content order-lg-1 order-2">
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="banner-content order-lg-2 order-1">
                                        <p>
                                            Construim <strong>identități digitale</strong> pentru <strong>profesioniști</strong> și <strong>branduri</strong> care aduc <strong>valoare</strong>. <strong>Nu vindem servicii. Alegem parteneri.</strong> <strong>Simplu. Transparent. Relevant.</strong> Experiențe digitale care rămân simple pentru tine, transparente pentru parteneri și relevante pentru public.
                                        </p>
                                        <div className="d-flex flex-md-row flex-column justify-content-center justify-content-lg-start align-self-center align-self-lg-start gspace-3">
                                            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                                                <div className="btn-title">
                                                    <span>Let's see if we Click</span>
                                                </div>
                                                <div className="icon-circle">
                                                    <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                                                </div>
                                            </a>
                                            <div className="banner-reviewer">
                                                <div className="d-flex flex-row align-items-center">
                                                </div>
                                                <div className="detail">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>  
            </AnimateOnScroll>
        </div>
    );
}

export default BannerHomeSection;