import React from "react";
import { faqData } from "../../Data/FaqData";

const FaqSection = () => {
  return (
    <div className="section">
        <div className="hero-container">
            <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                <div className="col col-lg-5">
                    <div className="faq-title-container">
                        <div className="sub-heading">
                            <i className="fa-regular fa-circle-dot"></i>
                            <span>Frequently Asked Questions</span>
                        </div>
                        <h2 className="title-heading">Got Questions? We've Got Answers.</h2>
                    </div>
                </div>
                <div className="col col-lg-7">
                    <div className="d-flex flex-column">
                        <div className="accordion" id="faqAccordion">
                            {faqData.map((item, index) => (
                                <div className="accordion-item" key={item.id}>
                                    <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#faq${item.id}`}
                                        aria-expanded={index === 0 ? "true" : "false"}
                                        aria-controls={`faq${item.id}`}
                                    >
                                        {item.question}
                                    </button>
                                    </h2>
                                    <div
                                    id={`faq${item.id}`}
                                    className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                    data-bs-parent="#faqAccordion"
                                    >
                                        <div className="accordion-body">
                                            <div className="accordion-spacer"></div>
                                            <p>{item.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FaqSection;
