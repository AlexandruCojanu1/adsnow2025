import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import FaqSection from "../../Components/FAQs/faq";
import BannerInnerSection from "../../Components/Banner/Inner";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function FaqPage(){
    return(
        <>  
            <HeadTitle title="FAQs - Marko - Digital Marketing Agency" />
            <BannerInnerSection title="Simple, Direct, and Friendly" currentPage="FAQ" />
            <FaqSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TestimonialSection />
        </>
    );
}

export default FaqPage;