import React from "react";

const CaseStudiesSection = ({ noPadding }) => {

    return (
        <div className={`section ${noPadding ? "p-0" : ""}`}>
            <div className="hero-container">
                <div className="case-studies-layout">
                    <div className="spacer"></div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesSection;
