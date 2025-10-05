import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import PartnershipSection from "../../Components/Partnership/Partnership";
import ChooseUsSection from "../../Components/ChooseUs/choose";
import TeamExtendSection from "../../Components/Team/TeamExtend";

function TeamPage(){
    return(
        <>
            <HeadTitle title="Our Team - Marko - Digital Marketing Agency" />
            <BannerInnerSection title="Meet Our Team" currentPage="Our Team"/>
            <TeamExtendSection />
            <PartnershipSection />
            <ChooseUsSection />
        </>
    );
}

export default TeamPage;