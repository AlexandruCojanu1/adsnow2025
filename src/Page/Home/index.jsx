import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerHomeSection from "../../Components/Banner";
import ExpertiseSection from "../../Components/Expertise/expertise";
import ChooseUsSection from "../../Components/ChooseUs/choose";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import ServiceSection from "../../Components/Services/service";
import CaseStudiesSection from "../../Components/CaseStudies/CaseStudies";
import TestimonialSection from "../../Components/Testimonial/testimonial";
import DigitalProcessSection from "../../Components/DigitalProcess/digitalstep";
import PricingPlanSection from "../../Components/Pricing/Pricing";
import PartnershipSection from "../../Components/Partnership/Partnership";
import NewsletterSection from "../../Components/Form/Newsletter";
import BlogSection from "../../Components/Blog/blog";

function HomePage(){
    return(
        <>
            <HeadTitle title="Home - Marko - Digital Marketing Agency" />
            <BannerHomeSection />
            <ExpertiseSection />
            <PartnershipSection />
            <ChooseUsSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <ServiceSection />
            <CaseStudiesSection noPadding={true} />
            <TestimonialSection />
            <DigitalProcessSection />
            <PricingPlanSection />
            <NewsletterSection />
            <BlogSection />
        </>
    );
}

export default HomePage;