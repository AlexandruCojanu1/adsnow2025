import React from "react";
import { caseStudiesData } from "../../Data/CaseStudiesData";
import CaseStudyCard from "../Card/CaseStudiesCard";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

const CaseStudiesSection = ({ noPadding }) => {
    useAnimateOnScroll();

    return (
        <div className={`section ${noPadding ? "p-0" : ""}`}>
            <div className="hero-container">
                <div className="case-studies-layout">
                    <div className="card card-case-studies">
                        <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                            <div className="col">
                                <div className="d-flex flex-column gspace-2 animate-box animated animate__animated" data-animate="animate__fadeInLeft">
                                    <div className="sub-heading">
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <span>Case Studies</span>
                                    </div>
                                    <h2 className="title-heading">See How We Help Businesses Thrive</h2>
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex flex-column h-100 justify-content-end gspace-2 animate-box animated animate__animated" data-animate="animate__fadeInRight">
                                    <p>We don't just talk about results—we deliver them. Here are some of our most impactful case studies showcasing how our digital marketing strategies drive success.</p>
                                    <div className="link-wrapper">
                                        <a href="./case_studies">More Case Studies</a>
                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="d-flex flex-column gspace-2">
                            <div className="d-flex flex-column flex-lg-row gspace-2">
                                {caseStudiesData.slice(0, 2).map((item) => ( 
                                    <CaseStudyCard key={item.id} {...item} />
                                ))}
                            </div>
                            <div className="d-flex flex-column flex-lg-row gspace-2">
                                {caseStudiesData.slice(2, 4).map((item) => (
                                    <CaseStudyCard key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="spacer"></div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesSection;
