import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getPublishedPosts } from "../../Data/blogPosts";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const BlogPostContent = ({ post }) => {
  const contentRef = useRef(null);
  const iframeRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const recentPosts = getPublishedPosts()
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // Check if content is full HTML document or just body content
  const isFullHTML = post.content && post.content.trim().startsWith('<!DOCTYPE html>');

  useEffect(() => {
    if (isFullHTML && iframeRef.current) {
      // For full HTML documents, use iframe
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Write the full HTML content
      doc.open();
      doc.write(post.content);
      doc.close();
      
      // Adjust iframe height to content
      const adjustHeight = () => {
        try {
          const body = doc.body;
          const html = doc.documentElement;
          const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          iframe.style.height = height + 'px';
        } catch (e) {
          console.error('Error adjusting iframe height:', e);
        }
      };
      
      iframe.onload = adjustHeight;
      setTimeout(adjustHeight, 100);
    }
  }, [post.content, isFullHTML]);

  return (
    <div className="section">
      <div className="hero-container">
        <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
          {/* Sidebar */}
          <div className="col col-lg-4 order-2 order-lg-1">
            <div className="d-flex flex-column flex-md-row flex-lg-column gspace-5">
              {/* Recent Posts */}
              <div className="card recent-post">
                <h4>Articole Recente</h4>
                {recentPosts.map((recentPost) => (
                  <div
                    className="d-flex flex-row w-100 gspace-1"
                    key={recentPost.id}
                  >
                    <div className="image-container">
                      <img
                        src={recentPost.image}
                        alt={recentPost.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-grid">
                      <div className="d-flex flex-row gspace-1 align-items-center">
                        <i className="fa-solid fa-calendar accent-color"></i>
                        <span className="meta-data-post">{formatDate(recentPost.date)}</span>
                      </div>
                      <Link to={`/blog/${recentPost.slug}`} className="blog-link-post">
                        {recentPost.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Banner */}
              <div className="cta-service-banner">
                <div className="spacer"></div>
                <h3 className="title-heading">Transformă Business-ul Tău cu Algo Digital Solutions!</h3>
                <p>
                  Du marketing-ul digital la următorul nivel cu strategii bazate pe date și soluții inovatoare. Să creăm ceva uimitor împreună!
                </p>
                <div className="link-wrapper">
                  <a 
                    href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ38JrGsAlyvinUx2IY6KHYyI7IQ-QaifvAz9diIDscT3oKh-S-_tG2_Kgkv_CYFaGW_RxtNrH73" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Aplică acum
                  </a>
                  <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col col-lg-8 order-1 order-lg-2">
            <AnimateOnScroll animation="fadeInUp" speed="normal">
              <div className="d-flex flex-column gspace-2">
                {/* Meta Information - Only show if not full HTML */}
                {!isFullHTML && (
                  <>
                    {/* Featured Image */}
                    {post.image && (
                      <div className="post-image">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="img-fluid"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3>{post.title}</h3>
                    <div className="underline-muted-full"></div>

                    {/* Meta Information */}
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex flex-row align-items-center gspace-2">
                        <div className="d-flex flex-row gspace-1 align-items-center">
                          <i className="fa-solid fa-calendar accent-color"></i>
                          <span className="meta-data-post">{formatDate(post.date)}</span>
                        </div>
                        <div className="d-flex flex-row gspace-1 align-items-center">
                          <i className="fa-solid fa-folder accent-color"></i>
                          <span className="meta-data-post">{post.category}</span>
                        </div>
                      </div>
                      <div className="d-flex flex-row gspace-1 align-items-center">
                        <i className="fa-solid fa-user accent-color"></i>
                        <span className="meta-data">{post.author}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="d-flex flex-row flex-wrap gspace-2 align-items-center">
                        <i className="fa-solid fa-tags accent-color"></i>
                        {post.tags.map((tag, index) => (
                          <span key={index} className="badge bg-secondary">{tag}</span>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Content */}
                {isFullHTML ? (
                  // Full HTML document - render in iframe
                  <div style={{ width: '100%', minHeight: '600px', border: 'none' }}>
                    <iframe
                      ref={iframeRef}
                      title={post.title}
                      style={{
                        width: '100%',
                        border: 'none',
                        minHeight: '600px',
                        display: 'block'
                      }}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  </div>
                ) : (
                  // Regular HTML content - render directly
                  <div 
                    className="blog-post-content"
                    ref={contentRef}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                )}

                {/* Share Buttons - Only show if not full HTML */}
                {!isFullHTML && (
                  <div className="d-flex flex-row gspace-2 align-items-center">
                    <span>Distribuie:</span>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-share"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-share"
                    >
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-share"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </div>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
