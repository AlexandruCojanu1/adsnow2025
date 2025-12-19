import React from "react";
import { useParams, Navigate } from "react-router-dom";
import HeadTitle from "../../Components/Head/HeadTitle";
import BannerInnerSection from "../../Components/Banner/Inner";
import BlogPostContent from "../../Components/Blog/BlogPostContent";
import { BlogPostSchema, BreadcrumbSchema } from "../../Components/SEO/StructuredData";
import { getPostBySlug } from "../../Data/blogPosts";

function BlogPostPage() {
    const { slug } = useParams();
    const post = getPostBySlug(slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const siteUrl = "https://adsnow.ro";
    const breadcrumbItems = [
        { name: "Acasă", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` }
    ];

    return (
        <>
            <HeadTitle 
                title={post.seo?.metaTitle || `${post.title} - Blog`}
                description={post.seo?.metaDescription || post.excerpt}
                keywords={post.seo?.keywords}
                image={post.image}
                url={`/blog/${post.slug}`}
            />
            <BlogPostSchema post={post} siteUrl={siteUrl} />
            <BreadcrumbSchema items={breadcrumbItems} siteUrl={siteUrl} />
            <BannerInnerSection title={post.title} currentPage="Blog" />
            <BlogPostContent post={post} />
        </>
    );
}

export default BlogPostPage;
