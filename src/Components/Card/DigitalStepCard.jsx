import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const DigitalStepCard = ({ icon, step, title, content, isFirst }) => {

    return (
        <>
            <AnimateOnScroll animation="fadeInUp" speed="normal">
                <div className="digital-process-card">
                    {!isFirst && <div className="step-spacer"></div>}
                        <div className="digital-process-step">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <img src={icon} alt="Digital Process Icon" className="process-icon" />
                                </div>
                                <span>{step}</span>
                            </div>
                            <div className="d-flex flex-column gspace-2">
                                <h5>{title}</h5>
                                <p>{content}</p>
                            </div>
                    </div>
                </div>
            </AnimateOnScroll>
        </>
    );
  };

export default DigitalStepCard;
