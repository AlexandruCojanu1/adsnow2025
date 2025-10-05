import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import ContactSection from "../../Components/Contact/contact";
import MapsSection from "../../Components/Maps/map";

function ContactPage(){
    return(
        <>
            <HeadTitle title="Contact Us - Marko - Digital Marketing Agency" />
            <BannerInnerSection title="Contact Us" currentPage="Contact Us" />
            <ContactSection />
            <MapsSection />
        </>
    );
}

export default ContactPage;