import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import { OrganizationSchema, WebsiteSchema, ServiceSchema } from "../../Components/SEO/StructuredData";
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

function HomePage(){
    return(
        <>
            <HeadTitle 
                title="Consultanță în Identitate Digitală și Marketing Online | Your Online Identity Advisor"
                description="Construim identități digitale pentru profesioniști și branduri care aduc valoare. Nu vindem servicii. Alegem parteneri."
                keywords="marketing digital, identitate digitală, branding, SEO, social media, web design, Brașov, performance marketing, brand strategy"
            />
            <OrganizationSchema />
            <WebsiteSchema />
            <ServiceSchema />
            <BannerHomeSection />
            <ExpertiseSection />
            <PartnershipSection />
            <ChooseUsSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <ServiceSection />
            <CaseStudiesSection noPadding={true} />
            <DigitalProcessSection />
            <PricingPlanSection />
            <NewsletterSection />
        </>
    );
}

export default HomePage;