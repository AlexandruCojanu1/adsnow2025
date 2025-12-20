'use client'

import AnimateOnScroll from '../client/AnimateOnScroll'

interface ServiceCardProps {
  icon: string
  title: string
  content: string
  link: string
  speed?: 'fast' | 'normal' | 'slow'
}

export default function ServiceCard({ icon, title, content, link, speed = 'normal' }: ServiceCardProps) {
  return (
    <AnimateOnScroll animation="fadeInLeft" speed={speed}>
      <div className="card card-service">
        <div className="d-flex flex-row gspace-2 gspace-md-3 align-items-center">
          <div>
            <div className="service-icon-wrapper">
              <div className="service-icon">
                <img src={icon} alt={`${title} Icon`} className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="service-title">
            <h4>{title}</h4>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </AnimateOnScroll>
  )
}

