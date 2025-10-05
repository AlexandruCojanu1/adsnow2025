import React from "react";
import { whychooseus } from "../../Data/ChooseUsData";
import ChooseUsCard from "../Card/ChoooseUsCard";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

function ChooseUsSection(){
    useAnimateOnScroll();

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
                        <div className="d-flex flex-column gspace-2">
                            <div className="sub-heading animate-box animated animate__animated" data-animate="animate__fadeInDown">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Why Choose Marko</span>
                            </div>
                            <h2 className="title-heading animate-box animated animate__animated" data-animate="animate__fadeInDown">Your Success is Our Mission</h2>
                            <p className="mb-0 animate-box animated animate__animated" data-animate="animate__fadeInDown">In the fast-paced digital world, choosing the right marketing partner makes all the difference. At Marko, we don’t just create campaigns—we craft strategies that deliver measurable success.</p>
                        </div>
                        <div className="image-container">
                            <img src="/assets/image/collaborative-process-of-multicultural-skilled-peo-5EHBQRG-1024x683.jpg" alt="Why Choose Us Image" className="chooseus-img" />
                            <div className="card-chooseus-cta-layout">
                            <div className="chooseus-cta-spacer"></div>
                            <div className="d-flex flex-column align-items-end">
                                <div className="chooseus-cta-spacer"></div>
                                <div className="card-chooseus-cta-wrapper">
                                <div className="card card-chooseus-cta animate-box animated animate__animated" data-animate="animate__fadeInUp">
                                    <h5>Partner with Marko & take your brand to the next level.</h5>
                                    <div className="link-wrapper">
                                    <a href="./contact">Let's Talk Strategy</a>
                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
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