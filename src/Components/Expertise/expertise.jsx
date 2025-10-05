import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";
import useCounterOnScroll from "../Hooks/useCounterOnScroll";

function ExpertiseSection(){
    useAnimateOnScroll();
    useCounterOnScroll();

    return(
        <>
           <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="expertise-img-layout">
                            <div className="image-container expertise-img">
                                <img
                                    src="/assets/image/working-job-career-casual-showing-SJZWF3N-1024x737.jpg"
                                    alt="Expertise Image"
                                    className="img-fluid animate-box animated animate__animated"
                                    data-animate="animate__fadeInUp"
                                />
                                <div className="expertise-layout">
                                    <div className="d-flex flex-column">
                                        <div className="card-expertise-wrapper">
                                            <div className="card card-expertise animate-box animated animate__animated" data-animate="animate__fadeInDown">
                                                <h4>Ready to Elevate Your Digital Presence?</h4>
                                                <p>Let's create a custom strategy that fits your business goals.</p>
                                                <div className="d-flex align-items-center flex-row gspace-2 expertise-link">
                                                    <a href="./contact">Get Free Consultation</a>
                                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="expertise-spacer"></div>
                                        </div>
                                    <div className="expertise-spacer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="expertise-title">
                            <div className="sub-heading animate-box animated animate__animated" data-animate="animate__fadeInRight">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>Our Expertise</span>
                            </div>
                            <h2 className="title-heading animate-box animated animate__animated" data-animate="animate__fadeInRight">
                            Data Driven Strategies, Measurable Results
                            </h2>
                            <p>
                                At Marko, we specialize in crafting innovative digital marketing strategies that drive real business growth. Our expertise
                                ensures your brand stays ahead in the competitive digital landscape.
                            </p>
                            <div className="d-flex flex-column flex-md-row gspace-2">
                                <div className="expertise-list">
                                    <h5>What We Do Best</h5>
                                    <ul className="check-list">
                                        <li><a href="./single_services">Performance Marketing</a></li>
                                        <li><a href="./single_services">Social Media Growth</a></li>
                                        <li><a href="./single_services">Content Marketing</a></li>
                                        <li><a href="./single_services">PPC & Paid Ads</a></li>
                                        <li><a href="./single_services">Brand Strategy</a></li>
                                        <li><a href="./single_services">Conversion Optimization</a></li>
                                    </ul>
                                </div>
                                <div className="card card-expertise card-expertise-counter animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                    <div className="d-flex flex-row gspace-2 align-items-center">
                                        <div className="d-flex flex-row align-items-center">
                                            <span className="counter" data-target="21"></span>
                                            <span className="counter-detail">+</span>
                                        </div>
                                        <h6>Years of Experience on Digital Marketing Services</h6>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipiscing elit in ex ligula varius at rutrum et finibus sed felis qisque.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ExpertiseSection;