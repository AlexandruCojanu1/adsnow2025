import React from "react";
import { partnerships } from "../../Data/PartnershipData";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PartnershipSection = () => {
    useAnimateOnScroll();

    return (
        <div className="section-partner">
            <div className="hero-container">
                <div className="card card-partner animate-box animated animate__animated" data-animate="animate__fadeInRight">
                <div className="partner-spacer"></div>

                <div className="row row-cols-lg-2 row-cols-1 align-items-center px-5 position-relative z-2">
                    <div className="col">
                        <div className="d-flex flex-column justify-content-start pe-lg-3 pe-0">
                            <h3 className="title-heading">Powering Success for Top Brands</h3>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column ps-lg-3 ps-0">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex ligula, varius at rutrum et, finibus sed felis. 
                                Quisque eget tincidunt lectus. Sed quis diam sed neque mattis feugiat.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="swiperPartner-layout">
                    <div className="swiperPartner-overlay">
                        <div className="spacer"></div>
                    </div>

                    <div className="swiperPartner-container">
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={20}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            breakpoints={{
                            230: { slidesPerView: 3 },
                            767: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                            }}
                            className="swiperPartner"
                        >
                            {partnerships.concat(partnerships).map((partner) => (
                            <SwiperSlide key={partner.id + Math.random()}>
                                <div className="partner-slide">
                                    <img src={partner.logo} alt="Client" className="partner-logo img-fluid" />
                                </div>
                            </SwiperSlide>
                            ))}
                        </Swiper>   
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default PartnershipSection;
