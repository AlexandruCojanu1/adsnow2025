import React from "react";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

function PricingPlanSection(){
    useAnimateOnScroll();

    return(
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column justify-content-center text-center gspace-5">
                    <div
                        className="d-flex flex-column gspace-2 animate-box animated animate__animated"
                        data-animate="animate__fadeInUp"
                    >
                        <div className="sub-heading align-self-center">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Our Core Services</span>
                            </div>
                            <h2 className="title-heading heading-container heading-container-short">
                            Flexible Pricing Plans for Every Business
                            </h2>
                    </div>
                    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                        <div className="col">
                            <div className="pricing-container">
                                <div
                                className="card card-pricing-title animate-box animated animate__animated"
                                data-animate="animate__fadeInLeft"
                                >
                                    <div className="spacer" />
                                    <div className="content">
                                        <h3 className="title-heading">Let's Find the Right Strategy for You!</h3>
                                        <div className="link-wrapper">
                                        <a href="./contact">Book a Free Consultation</a>
                                        <i className="fa-solid fa-arrow-circle-right"></i>
                                        </div>
                                    </div>
                                </div>

                                <div
                                className="card card-pricing animate-box animated animate__animated"
                                data-animate="animate__fadeInUp"
                                >
                                    <h4>Starter</h4>
                                    <p>Perfect for startups & small businesses</p>
                                    <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                        <h3>$99</h3>
                                        <p>/Month</p>
                                    </div>
                                    <a href="#" className="btn btn-accent">
                                        <div className="btn-title">
                                            <span>View Details</span>
                                        </div>
                                        <div className="icon-circle">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </a>
                                    <ul className="check-list">
                                        <li><a href="./single_services">Basic SEO & Marketing</a></li>
                                        <li><a href="./single_services">Social Media Management (1 Platform)</a></li>
                                        <li><a href="./single_services">Monthly Performance Report</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div
                                className="card card-pricing pricing-highlight animate-box animated slow animate__animated"
                                data-animate="animate__fadeInUp"
                            >
                                <div className="spacer" />
                                <h4>Enterprise</h4>
                                <p>Full scale marketing for maximum impact</p>
                                <div className="d-flex flex-row gspace-1 align-items-center">
                                    <h3>$399</h3>
                                    <p>/Month</p>
                                </div>
                                <a href="#" className="btn btn-accent">
                                    <div className="btn-title">
                                        <span>View Details</span>
                                    </div>
                                    <div className="icon-circle">
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </div>
                                </a>

                                <div className="core-benefits">
                                    <div className="benefit">
                                        <i className="fa-solid fa-brain"></i>
                                        <a href="#">Dedicated Account Manager</a>
                                    </div>
                                    <div className="benefit">
                                        <i className="fa-brands fa-accessible-icon"></i>
                                        <a href="#">Priority Support 24/7</a>
                                    </div>
                                    <div className="benefit">
                                        <i className="fa-solid fa-bug"></i>
                                        <a href="#">Customized Growth Strength</a>
                                    </div>
                                </div>

                                <ul className="check-list">
                                    <li><a href="#">Complate Digital Marketing Suite</a></li>
                                    <li><a href="#">Paid Ads Management</a></li>
                                    <li><a href="#">Dedicated Account Manager</a></li>
                                    <li><a href="#">Email Marketing & Automation</a></li>
                                    <li><a href="#">Dedicated Account Manager</a></li>
                                    <li><a href="#">Weekly Performance insights</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="pricing-container">
                                <div
                                className="card pricing-highlight-box animate-box animated animate__animated"
                                data-animate="animate__fadeInRight"
                                >
                                    <div className="d-flex flex-column gspace-2 w-100">
                                        <h5>Your Growth, Our Priority!</h5>
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="pricing-highlights">
                                                <a href="#">Data-Driven Digital Marketing</a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                            <div className="pricing-highlights">
                                                <a href="#">Proven Strategies for Higher</a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                            <div className="pricing-highlights">
                                                <a href="#">Scalable Solution for Every Business</a>
                                                <i className="fa-solid fa-arrow-circle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="spacer" />
                                </div>

                                <div
                                className="card card-pricing animate-box animated animate__animated"
                                data-animate="animate__fadeInUp"
                                >
                                    <h4>Growth</h4>
                                    <p>Best for growing businesses ready</p>
                                    <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                        <h3>$299</h3>
                                        <p>/Month</p>
                                    </div>
                                    <a href="#" className="btn btn-accent">
                                        <div className="btn-title">
                                            <span>View Details</span>
                                        </div>
                                        <div className="icon-circle">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </a>
                                    <ul className="check-list">
                                        <li><a href="./single_services">Basic SEO & Marketing</a></li>
                                        <li><a href="./single_services">Social Media Management (1 Platform)</a></li>
                                        <li><a href="./single_services">Monthly Performance Report</a></li>
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

export default PricingPlanSection;