import React from "react";

const Footer = () => {
  return (
    <div className="section-footer">
        <div className="bg-footer-wrapper">
            <div className="bg-footer">
                <div className="hero-container position-relative z-2">
                    <div className="d-flex flex-column gspace-2">
                        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 grid-spacer-5">
                            <div className="col col-lg-5">
                                <div className="footer-logo-container">
                                    <div className="logo-container-footer">
                                    <img src="/assets/images/logo1.png" alt="Logo" className="site-logo img-fluid" />
                                    </div>
                                    <h4>Your Online Identity Advisor</h4>
                                    <p>
                                    Nu vindem servicii. Alegem parteneri. Experiențe digitale care rămân simple pentru tine, transparente pentru parteneri și relevante pentru public.
                                    </p>
                                </div>
                            </div>

                            <div className="col col-lg-3">
                            </div>

                            <div className="col col-lg-4">
                                <div className="footer-contact-container">
                                    <h5>Informații Contact</h5>
                                    <ul className="contact-list">
                                        <li>algodigitalsolutions@gmail.com</li>
                                        <li>0771587498</li>
                                        <li>Brașov, Romania</li>
                                    </ul>
                                    <div className="d-flex flex-column gspace-1">
                                        <h5>Rețele Sociale</h5>
                                        <div className="social-container">
                                            <div className="social-item-wrapper">
                                                <a href="https://www.facebook.com/adsnow.ro" target="_blank" rel="noopener noreferrer" className="social-item">
                                                    <i className="fa-brands fa-facebook"></i>
                                                </a>
                                            </div>
                                            <div className="social-item-wrapper">
                                                <a href="https://www.tiktok.com/@adsnow.ro?_r=1&_t=ZN-92KN3Zaggdj" target="_blank" rel="noopener noreferrer" className="social-item">
                                                    <i className="fa-brands fa-tiktok"></i>
                                                </a>
                                            </div>
                                            <div className="social-item-wrapper">
                                                <a href="https://www.instagram.com/adsnow.ro/" target="_blank" rel="noopener noreferrer" className="social-item">
                                                    <i className="fa-brands fa-instagram"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="footer-content-spacer"></div>
                    </div>

                    <div className="copyright-container">
                        <span className="copyright">© 2025 Algo Digital Solutions SRL. Toate drepturile rezervate.</span>
                        <div className="d-flex flex-row gspace-2">
                            <a href="https://consumer-redress.ec.europa.eu/site-relocation_en" target="_blank" rel="noopener noreferrer" className="legal-link">Politica de Confidențialitate</a>
                            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="legal-link">ANPC</a>
                        </div>
                    </div>

                    <div className="footer-spacer"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Footer;