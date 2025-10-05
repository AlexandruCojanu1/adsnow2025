
import React from "react";
import { digitalSteps } from "../../Data/DigitalProcessData";
import DigitalStepCard from "../Card/DigitalStepCard";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const DigitalProcessSection = () => {
    useAnimateOnScroll();

    return (
        <div className="section-wrapper-digital-process">
            <div className="digital-process-layout">
                <div className="section digital-process-banner">
                    <div className="hero-container">
                        <div className="digital-process-content">
                            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                                <div className="col">
                                    <div className="d-flex flex-column gspace-2 animate-box animate__animated" data-animate="animate__fadeInDown">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>How it Work</span>
                                        </div>
                                        <h2 className="title-heading">Simple Steps to Digital Success</h2>
                                    </div>
                                </div>
                            <div className="col">
                                <div className="d-flex flex-column gspace-2 justify-content-end h-100 animate-box animate__animated" data-animate="animate__fadeInDown">
                                    <p>
                                        Our streamlined process ensures your digital growth is seamless and effective. ipsum dolor sit amet,
                                        consectetur adipiscing elit. In ex ligula, varius at rutrum et, finibus sed felis.
                                    </p>
                                    <div className="link-wrapper">
                                        <a href="./contact">Get Started Now</a>
                                        <i className="fa-solid fa-arrow-circle-right"></i>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="digital-process-steps-wrapper">
                                <div className="digital-process-steps">
                                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                                    {digitalSteps.map((item, index) => (
                                        <DigitalStepCard
                                            key={index}
                                            icon={item.icon}
                                            step={item.step}
                                            title={item.title}
                                            content={item.content}
                                            isFirst={index === 0}
                                        />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>  
            </div>
        </div>
    );
};

export default DigitalProcessSection;
