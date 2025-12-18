import React from "react";
import { services } from "../../Data/ServiceData";
import ServiceCard from "../Card/ServiceCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ServiceSection(){

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column justify-content-center text-center gspace-5">
                        <div className="d-flex flex-column justify-content-center text-center gspace-2">
                            <AnimateOnScroll animation="fadeInDown" speed="normal">    
                                <div className="sub-heading align-self-center">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Serviciile Noastre</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                <h2 className="title-heading heading-container heading-container-medium">
                                    Strategie Digitală Integrată: Branding, Web, Social, SEO, ADS
                                </h2>
                            </AnimateOnScroll>
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
                                Nu orice business merită să fie în online. Doar cele care aduc <strong>valoare</strong>. 
                                <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer"> Scrie-ne numele companiei</a> și în <strong>24 de ore</strong> primești un răspuns dacă brandul tău este compatibil cu filozofia noastră.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceSection;