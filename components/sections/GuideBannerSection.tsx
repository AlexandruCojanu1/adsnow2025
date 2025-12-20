'use client'

import AnimateOnScroll from '../client/AnimateOnScroll'

export default function GuideBannerSection() {
  return (
    <section className="section-guide">
      <div className="guide-banner">
        <video 
          className="guide-banner-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/videos/Adsnow.mov" type="video/quicktime" />
          <source src="/assets/videos/Adsnow.mov" type="video/mp4" />
        </video>
        <div className="hero-container">
          <AnimateOnScroll animation="fadeInUp" speed="normal">
            <div className="guide-content">
              <div className="d-flex flex-column gspace-2">
                <h3 className="title-heading">Your Online Identity Advisor</h3>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

