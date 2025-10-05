import React from "react";
import ContactForm from "../Form/ContactForm";

const ContactSection = () => {
  return (
    <div className="section">
        <div className="hero-container">
            <div className="row row-cols-lg-2 row-cols-1 g-5">
                <div className="col col-lg-5">
                    <div className="contact-title-wrapper">
                        <div className="card contact-title">
                            <div className="sub-heading">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>Reach out to us</span>
                            </div>
                            <h2 className="title-heading">Get in Touch</h2>
                            <p>
                            Reach out to us for tailored digital solutions that drive results sollicitudin nec.
                            </p>
                            <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                <div>
                                    <div className="icon-wrapper">
                                        <div className="icon-box">
                                            <i className="fa-solid fa-phone-volume accent-color"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <span>Phone Number</span>
                                    <h5>+1 (62) 987 7543</h5>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                <div>
                                    <div className="icon-wrapper">
                                        <div className="icon-box">
                                            <i className="fa-solid fa-envelope accent-color"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <span>Email Address</span>
                                    <h5>hello@markoagency.com</h5>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-md-row align-items-center text-md-start text-center gspace-2">
                                <div>
                                    <div className="icon-wrapper">
                                        <div className="icon-box">
                                            <i className="fa-solid fa-location-dot accent-color"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <span>Office Address</span>
                                    <h5>Marko HQ - 902 Digital Lane, San Francisco, CA 94110, USA</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-lg-7">
                    <div id="success-message" className="alert success hidden">
                        <span className="check-icon">
                            <i className="fa-solid fa-2xl fa-check"></i>
                        </span>
                        <p>Thank you! Form submitted successfully.</p>
                    </div>
                    <div id="error-message" className="alert error hidden">
                        <span className="cross-icon">
                            <i className="fa-solid fa-2xl fa-xmark"></i>
                        </span>
                        <p>Oops! Form submission failed. Please try again.</p>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactSection;
