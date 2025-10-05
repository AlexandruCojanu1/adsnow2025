import React from "react";
import BlogCard from "../Card/BlogCard";
import { blogs } from "../../Data/BlogPostData";
import useAnimateOnScroll from "../Hooks/useAnimateOnScroll";

function BlogSection() {
    useAnimateOnScroll();
    return (
        <div className="section">
            <div className="hero-container">
                <div className="d-flex flex-column gspace-5">
                    <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5 m-0">
                        <div className="col col-lg-8 ps-0 pe-0">
                            <div
                                className="d-flex flex-column gspace-2 animate-box animate__animated fast"
                                data-animate="animate__fadeInLeft"
                            >
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Insights & Trends</span>
                                </div>
                                <h2 className="title-heading">Latest Digital Marketing Strategies & Tips</h2>
                            </div>
                        </div>
                        <div className="col col-lg-4 ps-0 pe-0">
                            <div
                                className="d-flex flex-column gspace-2 justify-content-end h-100 animate-box animate__animated"
                                data-animate="animate__fadeInRight"
                            >
                                <p>
                                    Explore our latest blog articles covering industry trends,
                                    expert insights, and actionable strategies to elevate your
                                    digital marketing game.
                                </p>
                                <div className="link-wrapper">
                                    <a href="./blog">View All Articles</a>
                                    <i className="fa-solid fa-circle-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-md-2 row-cols-1 grid-spacer-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogSection;
