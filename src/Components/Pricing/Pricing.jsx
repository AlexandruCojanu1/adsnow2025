import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function PricingPlanSection(){
    return(
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column justify-content-center text-center gspace-5">
                    <AnimateOnScroll animation="fadeInUp" speed="normal">
                        <div className="d-flex flex-column gspace-2">
                            <div className="sub-heading align-self-center">
                                <i className="fa-regular fa-circle-dot"></i>
                                <span>Serviciile Noastre Principale</span>
                            </div>
                            <h2 className="title-heading heading-container heading-container-short">
                                Planuri de Prețuri Flexibile pentru Fiecare Business
                            </h2>
                        </div>
                    </AnimateOnScroll>
                    <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2">
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                    <div className="card card-pricing-title">
                                        <div className="spacer" />
                                        <div className="content">
                                            <h3 className="title-heading">Să Găsim Strategia Potrivită pentru Tine!</h3>
                                            <div className="link-wrapper">
                                            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Rezervă o Consultație Gratuită</a>
                                            <img src="/assets/images/cursor.png" alt="arrow" className="cursor-icon" />
                                            </div>
                                        </div>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>Starter</h4>
                                        <p>Perfect pentru startup-uri și afaceri mici</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <p>de la</p>
                                            <h3>$99</h3>
                                            <p>/Lună</p>
                                        </div>
                                        <ul className="check-list">
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">SEO și Marketing de Bază</a></li>
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Management Rețele Sociale (1 Platformă)</a></li>
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Raport Lunar de Performanță</a></li>
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                        <div className="col">
                            <AnimateOnScroll animation="fadeInUp" speed="slow">
                                <div className="card card-pricing pricing-highlight">
                                    <div className="spacer" />
                                    <h4>Enterprise</h4>
                                    <p>Marketing complet pentru impact maxim</p>
                                    <div className="d-flex flex-row gspace-1 align-items-center">
                                        <p>de la</p>
                                        <h3>$399</h3>
                                        <p>/Lună</p>
                                    </div>

                                    <div className="core-benefits">
                                        <div className="benefit">
                                            <i className="fa-solid fa-brain"></i>
                                            <a href="#">Manager de Cont Dedicat</a>
                                        </div>
                                        <div className="benefit">
                                            <i className="fa-brands fa-accessible-icon"></i>
                                            <a href="#">Suport Priorititar 24/7</a>
                                        </div>
                                        <div className="benefit">
                                            <i className="fa-solid fa-bug"></i>
                                            <a href="#">Strategie de Creștere Personalizată</a>
                                        </div>
                                    </div>

                                    <ul className="check-list">
                                        <li><a href="#">Suite Completă de Marketing Digital</a></li>
                                        <li><a href="#">Management Anunțuri Plătite</a></li>
                                        <li><a href="#">Manager de Cont Dedicat</a></li>
                                        <li><a href="#">Marketing prin Email și Automatizare</a></li>
                                        <li><a href="#">Manager de Cont Dedicat</a></li>
                                        <li><a href="#">Perspective Săptămânale de Performanță</a></li>
                                    </ul>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col">
                            <div className="pricing-container">
                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="card pricing-highlight-box">
                                        <div className="d-flex flex-column gspace-2 w-100">
                                            <h5>Creșterea Ta, Prioritatea Noastră!</h5>
                                            <div className="d-flex flex-column gspace-2">
                                                <div className="pricing-highlights">
                                                    <a href="#">Marketing Digital Bazat pe Date</a>
                                                    <img src="/assets/images/cursor.png" alt="arrow" className="cursor-icon" />
                                                </div>
                                                <div className="pricing-highlights">
                                                    <a href="#">Strategii Dovedite pentru Rezultate Mai Bune</a>
                                                    <img src="/assets/images/cursor.png" alt="arrow" className="cursor-icon" />
                                                </div>
                                                <div className="pricing-highlights">
                                                    <a href="#">Soluție Scalabilă pentru Fiecare Business</a>
                                                    <img src="/assets/images/cursor.png" alt="arrow" className="cursor-icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="spacer" />
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="card card-pricing">
                                        <h4>Creștere</h4>
                                        <p>Cel mai bun pentru afaceri în creștere</p>
                                        <div className="d-flex flex-row gspace-1 align-items-center h-100">
                                            <p>de la</p>
                                            <h3>$299</h3>
                                            <p>/Lună</p>
                                        </div>
                                        <ul className="check-list">
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">SEO și Marketing de Bază</a></li>
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Management Rețele Sociale (1 Platformă)</a></li>
                                            <li><a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" target="_blank" rel="noopener noreferrer">Raport Lunar de Performanță</a></li>
                                        </ul>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PricingPlanSection;