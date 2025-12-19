import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const ServiceCard = ({icon, title, content, link, speed = ""}) => {
    return(
        <>
            <AnimateOnScroll animation="fadeInLeft" speed={speed}>
                <div className="card card-service">
                    <div className="d-flex flex-row gspace-2 gspace-md-3 align-items-center">
                        <div>
                            <div className="service-icon-wrapper">
                                <div className="service-icon">
                                    <img src={icon} alt="Service Icon" className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="service-title">
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <p>{content}</p>
                </div>
            </AnimateOnScroll>
        </>
    );
}

export default ServiceCard;