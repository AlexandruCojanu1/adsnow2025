import React from "react";

const BlogPostSection = () => {
  return (
    <div className="section">
        <div className="hero-container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex flex-column gspace-2">
                        <div className="post-image">
                            <img
                            src="/assets/images/dummy-img-600x400.jpg"
                            alt="Recent Post"
                            className="img-fluid"
                            />
                        </div>
                        <h3>How to Grow Your Digital Business</h3>
                        <div className="underline-muted-full"></div>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-row align-items-center gspace-2">
                                <div className="d-flex flex-row gspace-1 align-items-center">
                                    <i className="fa-solid fa-calendar accent-color"></i>
                                    <span className="meta-data-post">March 27, 2025</span>
                                </div>
                                <div className="d-flex flex-row gspace-1 align-items-center">
                                    <i className="fa-solid fa-folder accent-color"></i>
                                    <span className="meta-data-post">SEO</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row gspace-1 align-items-center">
                                <i className="fa-solid fa-user accent-color"></i>
                                <span className="meta-data">Fox Creation</span>
                            </div>
                        </div>

                    <div>
                        <p>
                            In today's fast-paced digital landscape, growing a business online requires more than just a website and a few ads.
                            To achieve sustainable growth, digital businesses must implement a well-rounded strategy that includes brand positioning,
                            performance marketing, and customer retention. In this post, we'll explore actionable growth strategies to help your digital
                            business scale successfully.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis ac odio et efficitur. Proin velit neque, sollicitudin
                            nec purus eu, suscipit feugiat tellus. Mauris non iaculis nulla. Curabitur placerat nulla sodales, consequat nunc nec, consectetur
                            ante. Aenean et enim eu orci dapibus maximus ut non ex. Sed eu pharetra orci, sed consequat nisi. Praesent porta ipsum id erat
                            interdum, eleifend bibendum enim sodales. In ut nisl blandit, molestie enim sit amet, ultricies ipsum. Nunc eu sapien leo.
                            Nullam a tristique lacus, sit amet fringilla turpis. Pellentesque tempor, diam sed consectetur fermentum, leo turpis lobortis mi,
                            eu gravida lorem mauris ut est. Donec pellentesque nisl vel purus condimentum posuere. Nulla laoreet arcu non convallis lobortis.
                            Aenean in lacus nec magna tincidunt faucibus vel sit amet risus.
                        </p>
                    </div>
                    <div className="quote-container">
                        <div>
                        <div className="icon-wrapper">
                            <div className="icon-box">
                            <i className="fa-solid fa-quote-right"></i>
                            </div>
                        </div>
                        </div>
                        <p className="quote">
                            Nam finibus diam non orci lobortis volutpat. In non odio in enim scelerisque finibus. Praesent mattis accumsan metus ut ultrices.
                            Quisque tortor dui, facilisis at pharetra non, tincidunt a sem. quam diam. Morbi lobortis massa id porta maximus.
                        </p>
                        <div>
                        <h5>Adam Malik</h5>
                        <p className="quote-description">User Malik</p>
                        </div>
                    </div>
                    <p>
                        Pellentesque ac velit libero. Phasellus sed elit sit amet diam ultricies dapibus. Curabitur pretium, eros ut posuere finibus, sem
                        mauris accumsan nulla, nec elementum metus turpis at nibh. Phasellus commodo lobortis semper. Fusce velit augue, efficitur id elit
                        ut, volutpat feugiat est. Cras ac mi orci. Maecenas nibh neque, faucibus sed lacus nec, elementum tempor dui. Fusce porta nunc vitae
                        finibus dapibus. In vulputate nisl id mollis fringilla.
                    </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BlogPostSection;