import React from "react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogCard({ blog }) {
    return (
        <div className="col">
            <AnimateOnScroll animation="fadeInUp" speed="normal">
                <div className="card card-blog">
                    <div className="blog-image">
                        <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="card-body">
                        <div className="d-flex flex-row gspace-2">
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-calendar accent-color"></i>
                                <span className="meta-data">{blog.date}</span>
                            </div>
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-folder accent-color"></i>
                                <span className="meta-data">{blog.category}</span>
                            </div>
                        </div>
                        <Link to={blog.link} className="blog-link">
                            {blog.title}
                        </Link>
                        <p>{blog.excerpt}</p>
                        <Link to={blog.link} className="read-more">
                            Citește mai mult
                        </Link>
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default BlogCard;
