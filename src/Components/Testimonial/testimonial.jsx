import React from "react";
import { testimonials } from "../../Data/TestimonialData";
import TestimonialCard from "../Card/TestimonialCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import CounterOnScroll from "../Hooks/CounterOnScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const TestimonialSection = () => {
    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                        <div className="col col-lg-4">
                            <AnimateOnScroll animation="fadeInDown" speed="fast">
                                <div className="testimonial-header-wrapper">
                                    <div className="card card-testimonial-reviewer">
                                        <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-between gspace-3">
                                            <div className="testimonial-reviewer">
                                                <div className="avatar-container">
                                                    <img src="/assets/images/dummy-img-400x400.jpg" alt="Testimonial Reviewer" className="avatar" />
                                                    <img src="/assets/images/dummy-img-400x400.jpg" alt="Testimonial Reviewer" className="avatar" />
                                                    <img src="/assets/images/dummy-img-400x400.jpg" alt="Testimonial Reviewer" className="avatar" />
                                                    <img src="/assets/images/dummy-img-400x400.jpg" alt="Testimonial Reviewer" className="avatar" />
                                                </div>
                                                <div className="detail">
                                                    <h6>2.7k Positive</h6>
                                                    <h6>Reviews</h6>
                                                </div>
                                            </div>
                                            <div className="testimonial-rating-container">
                                                <div className="d-flex flex-column justify-content-center align-items-center gspace-1">
                                                    <div className="d-flex flex-row align-items-center">
                                                        <CounterOnScroll
                                                            target={90}
                                                            suffix="%"
                                                            counterClassName="counter"
                                                            suffixClassName="counter-detail"
                                                        />
                                                    </div>
                                                    <p>Improved Project</p>
                                                </div>
                                                <div className="underline-vertical"></div>
                                                <div className="d-flex flex-column justify-content-center align-items-center gspace-1">
                                                    <div className="d-flex flex-row align-items-center">
                                                    <CounterOnScroll
                                                        target={49}
                                                        suffix="%"
                                                        counterClassName="counter"
                                                        suffixClassName="counter-detail"
                                                    />
                                                    </div>
                                                    <p>New Project</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-center gspace-2">
                                            <div className="testimonial-header-link-wrapper">
                                                <i className="fa-regular fa-circle-check accent-color"></i>
                                                <a href="#">Social Media Growth</a>
                                            </div>
                                            <div className="testimonial-header-link-wrapper">
                                                <i className="fa-regular fa-circle-check accent-color"></i>
                                                <a href="#">Performance Marketing</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col col-lg-8">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div className="testimonial-header-wrapper-title">
                                    <div className="card-testimonial-header-title">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>What Our Client Says</span>
                                        </div>
                                        <h2 className="title-heading">Hear from Our Satisfied Clients, Real Success Stories</h2>
                                        <p>Discover how businesses like yours achieved outstanding growth with Marko's expert digital marketing solutions.</p>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    <AnimateOnScroll animation="fadeInUp" speed="normal">
                        <div className="d-flex flex-column">
                            <div className="overflow-hidden">
                                <Swiper
                                slidesPerView={3} 
                                spaceBetween={50} 
                                speed={1000} 
                                loop={true}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                breakpoints={{
                                    230: { slidesPerView: 1 },
                                    767: { slidesPerView: 2 },
                                    1024: { slidesPerView: 3 },
                                }}
                                className="swiperTestimonial">
                                    {testimonials.map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <TestimonialCard {...item} />
                                    </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </div>
        </div>
    );
};

export default TestimonialSection;