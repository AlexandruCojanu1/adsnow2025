import React from "react";
import { services } from "../../Data/ServiceData";
import ServiceCard from "../Card/ServiceCard";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

function ServiceSection(){
    useAnimateOnScroll();

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column justify-content-center text-center gspace-5">
                        <div className="d-flex flex-column justify-content-center text-center gspace-2">
                            <div className="sub-heading align-self-center animate-box animate__animated" data-animate="animate__fadeInDown">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>Our Core Services</span>
                            </div>
                            <h2 className="title-heading heading-container heading-container-medium animate-box animate__animated" data-animate="animate__fadeInDown">
                                Digital Solutions That Drive Real Results
                            </h2>
                        </div>
                        <div className="card-service-wrapper">
                            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-2">
                                {services.map((item) => (
                                    <div className="col" key={item.id}>
                                        <ServiceCard 
                                            icon={item.icon}
                                            title={item.title}
                                            content={item.content}
                                            speed={item.speed}
                                            link={item.link}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="service-link-footer">
                            <p>
                                Need a custom solution? Let&apos;s create a strategy tailored for your business.
                                <a href="./contact"> Get a Free Strategy Call</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceSection;