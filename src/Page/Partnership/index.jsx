import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import PartnershipListSection from "../../Components/Partnership/PartnershipList";
import GuideBannerSection from "../../Components/Banner/guide";
import ModalVideoSection from "../../Components/Video/video";
import TestimonialSection from "../../Components/Testimonial/testimonial";

function PartnershipPage(){
    return(
        <>
            <HeadTitle title="Partnership - Marko - Digital Marketing Agency" />
            <BannerInnerSection title="Partnership" currentPage="Partnership"/>
            <PartnershipListSection />
            <GuideBannerSection />
            <ModalVideoSection />
            <TestimonialSection />
        </>
    );
}

export default PartnershipPage;