import React from "react";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogSection from "../../Components/Blog/blog";
import { BreadcrumbSchema } from "../../Components/SEO/StructuredData";

function BlogPage(){
    const siteUrl = "https://adsnow.ro";
    const breadcrumbItems = [
        { name: "Acasă", url: "/" },
        { name: "Blog", url: "/blog" }
    ];

    return(
        <>
            <HeadTitle 
                title="Blog - Articole despre Marketing Digital | ADSNOW"
                description="Explorează cele mai recente articole despre marketing digital, SEO, social media și strategii de business online."
                keywords="blog marketing digital, articole SEO, strategii marketing, social media tips"
                url="/blog"
            />
            <BreadcrumbSchema items={breadcrumbItems} siteUrl={siteUrl} />
            <BannerInnerSection title="Blog" currentPage="Blog" />
            <BlogSection />            
        </>
    );
}

export default BlogPage;