import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";
import useCounterOnScroll from "../Hooks/useCounterOnScroll";

function AboutSection(){
    useAnimateOnScroll();
    useCounterOnScroll();

    return(
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column flex-lg-row gspace-5">
                    <div className="about-img-layout">
                        <div className="image-container about-img">
                            <img
                                src="/assets/image/working-job-career-casual-showing-SJZWF3N-1024x737.jpg"
                                alt="About Us Image"
                                className="img-fluid animate-box animated animate__animated"
                                data-animate="animate__fadeInUp"
                            />
                        
                            <div className="about-layout">
                                <div className="d-flex flex-column">
                                    <div className="card-about-wrapper">
                                        <div
                                            className="card card-about animate-box animated animate__animated"
                                            data-animate="animate__fadeInDown"
                                            >
                                            <div className="d-flex flex-row align-items-center">
                                                <span className="counter" data-target="21"></span>
                                                <span className="counter-detail">+</span>
                                            </div>
                                            <h6>Years of Experience on Digital Marketing Services</h6>
                                        </div>
                                    </div>
                                <div className="about-spacer"></div>
                                </div>
                                <div className="about-spacer"></div>
                            </div>
                        </div>
                    </div>
                    <div className="about-title">
                        <div className="d-flex flex-column gspace-2">
                            <div
                                className="sub-heading animate-box animated animate__animated"
                                data-animate="animate__fadeInRight"
                            >
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>About Us</span>
                            </div>

                            <h2
                                className="title-heading animate-box animated animate__animated"
                                data-animate="animate__fadeInRight"
                            >
                                Who We Are & What Drives Us
                            </h2>

                            <p>
                                At Marko, we specialize in crafting innovative digital marketing strategies
                                that drive real business growth. Our about ensures your brand stays ahead
                                in the competitive digital landscape.
                            </p>
                            <p>
                                Get to know the passionate team behind the strategies, the values that
                                guide us, and the mission that fuels our growth.
                            </p>

                            <div className="d-flex flex-column flex-md-row gspace-1 gspace-md-5">
                                <div className="about-list">
                                    <ul className="check-list">
                                        <li><a href="./single_services">PPC & Paid Ads</a></li>
                                        <li><a href="./single_services">Brand Strategy</a></li>
                                        <li><a href="./single_services">Conversion Optimization</a></li>
                                    </ul>
                                </div>

                                <div className="about-list">
                                    <ul className="check-list">
                                        <li><a href="./single_services">Performance Marketing</a></li>
                                        <li><a href="./single_services">Social Media Growth</a></li>
                                        <li><a href="./single_services">Content Marketing</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>

    );
}

export default AboutSection;