import React from "react";
import BlogCard from "../Card/BlogCard";
import { getBlogs } from "../../Data/BlogPostData";
import { getPublishedPosts } from "../../Data/blogPosts";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogSection() {
    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 m-0">
                        <div className="col col-lg-8 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInLeft" speed="fast">
                                <div
                                    className="d-flex flex-column gspace-2">
                                    <div className="sub-heading">
                                        <i className="fa-regular fa-circle-dot"></i>
                                        <span>Perspectiva noastra</span>
                                    </div>
                                    <h2 className="title-heading">Marketing 101</h2>
                                </div>
                            </AnimateOnScroll>
                        </div>
                        <div className="col col-lg-4 ps-0 pe-0">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div
                                    className="d-flex flex-column gspace-2 justify-content-end h-100">
                                    <p>
                                        Nu reinventam roata ci doar alegem traiectoria.
                                    </p>
                                    <div className="link-wrapper">
                                        <a href="./blog">Vezi Toate Articolele</a>
                                        <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </div>

                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                        {getPublishedPosts().map((post) => {
                            const blogs = getBlogs();
                            const blog = blogs.find(b => b.slug === post.slug) || {
                                id: post.id,
                                image: post.image,
                                date: new Date(post.date).toLocaleDateString('ro-RO', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }),
                                category: post.category,
                                title: post.title,
                                excerpt: post.excerpt,
                                link: `/blog/${post.slug}`
                            };
                            return <BlogCard key={post.id} blog={blog} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
