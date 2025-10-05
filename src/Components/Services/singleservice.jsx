import React, { use } from "react";
import { services } from "../../Data/ServiceData";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const SingleServiceSection = () => {
    useAnimateOnScroll();
    return (
        <div className="section pb-0">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="image-container">
                        <img
                        src="/assets/image/collaborative-process-of-multicultural-skilled-peo-5EHBQRG-1024x683.jpg"
                        alt="Service Image"
                        className="single-service-img"
                        />
                        <div className="single-service-title-layout">
                            <div>
                                <div className="single-service-spacer"></div>
                                <div className="single-service-title-wrapper">
                                    <div className="single-service-title">
                                        <div
                                        className="sub-heading animate-box animated slow animate__animated"
                                        data-animate="animate__fadeInRight"
                                        >
                                        <i className="fa-regular fa-circle-dot"></i>
                                            <span>Our Expertise</span>
                                        </div>
                                        <h3
                                        className="title-heading animate-box animated animate__animated"
                                        data-animate="animate__fadeInRight"
                                        >
                                        Boost Your Brand with Strategic Social Media Marketing
                                        </h3>
                                        <p>
                                            Maximize engagement, build loyal communities, and drive conversions across all major platforms lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-service-spacer"></div>
                        </div>
                    </div>

                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                        <div className="col col-lg-8">
                            <div className="d-flex flex-column gspace-2">
                                <h4>Overview</h4>
                                <p>
                                    At Marko, we help brands grow through custom-tailored social media marketing strategies that connect with your audience. From content creation to campaign optimization, we make sure your presence on platforms like Instagram, Facebook, LinkedIn, and TikTok stands out. Whether you’re launching a new brand or scaling an existing one, our experts turn social media into a powerful growth engine.
                                </p>
                                <div className="row row-cols-md-2 row-cols-1 grid-spacer-2 grid-spacer-md-3">
                                    <div className="col">
                                        <div className="image-container">
                                        <img
                                            src="/assets/image/young-business-team-working-EH8KQ2R-1024x683.jpg"
                                            alt="Service Image"
                                            className="img-fluid"
                                        />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="image-container">
                                        <img
                                            src="/assets/image/business-team-working-in-a-start-up-office-8ENVVX5-1024x683.jpg"
                                            alt="Service Image"
                                            className="img-fluid"
                                        />
                                        </div>
                                    </div>
                                </div>

                                <div className="card service-included">
                                    <h4>What's Included</h4>
                                    <div className="underline-accent-short"></div>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis ac odio et efficitur. Proin velit neque, sollicitudin nec purus eu, suscipit feugiat tellus.
                                    </p>
                                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-2">
                                        <div className="col">
                                            <ul className="check-list">
                                                <li>Platform Strategy & Planning</li>
                                                <li>Creative Content Production</li>
                                                <li>Paid Ads Management</li>
                                                <li>Community engagement</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <ul className="check-list">
                                                <li>Perfomance Reporting & Analytics</li>
                                                <li>Influencer Collaborations</li>
                                                <li>Social Listening & Trend Monitoring</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <h4>Why Choose Marko for Social Media Marketing?</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis ac odio et efficitur. Proin velit neque, sollicitudin nec purus eu, suscipit feugiat tellus.
                                </p>

                                <div className="row row-cols-2">
                                    <div className="col">
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>Result-Driven Campaigns</h5>
                                                    <p>Focused on reach, engagement, and ROI</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>Dedicated Team</h5>
                                                    <p>Experts in every platform you use</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="d-flex flex-column gspace-2">
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>Tailored strategies</h5>
                                                    <p>No one-size-fits-all, we build for your brand</p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start gspace-1">
                                                <i className="fa-regular fa-2x fa-circle-check accent-color"></i>
                                                <div className="d-flex flex-column gspace-0">
                                                    <h5>Analytics & insights</h5>
                                                    <p>Make smart decision with real data</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-between gspace-5">
                                <div className="card service-recent">
                                <h4>Recent Services</h4>
                                <div className="underline-accent-short"></div>
                                <ul className="single-service-list">
                                    {services.map((service) => (
                                        <li key={service.id}>
                                        <a href={service.link} className="hover:underline">
                                            {service.title}
                                        </a>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                                <div className="cta-service-banner">
                                    <div className="spacer"></div>
                                    <h3 className="title-heading">Transform Your Business with Marko!</h3>
                                    <p>
                                        Take your digital marketing to the next level with data-driven strategies and innovative solutions. Let's create something amazing together!
                                    </p>
                                    <div className="link-wrapper">
                                        <a href="about">Read More</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleServiceSection;