import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import NewsletterSection from "../../Components/Form/Newsletter";
import BlogSection from "../../Components/Blog/blog";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function TestimonialPage(){
    return(
        <>
            <HeadTitle title="Testimonials - Marko - Digital Marketing Agency" />
            <BannerInnerSection title="Testimonials" currentPage="Testimonials" />
            <TestimonialSection />
            <NewsletterSection />
            <BlogSection />
        </>
    );
}

export default TestimonialPage;