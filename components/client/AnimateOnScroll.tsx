'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'
import 'animate.css'

interface AnimateOnScrollProps {
  children: React.ReactElement
  animation?: string
  delay?: number
  speed?: 'normal' | 'fast' | 'slow'
  threshold?: number
}

export default function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = 0,
  speed = 'normal',
  threshold = 0.15,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  })

  const speedClass = {
    normal: '',
    fast: 'animate__fast',
    slow: 'animate__slow',
  }[speed]

  const child = React.Children.only(children) as React.ReactElement<any>

  return (
    <div ref={ref} style={{ display: 'contents' }}>
      {React.cloneElement(child, {
        className: `${(child.props as any).className || ''} animate__animated ${
          inView ? `animate__${animation} ${speedClass}` : ''
        }`.trim(),
        style: {
          ...((child.props as any).style || {}),
          opacity: inView ? 1 : 0,
          animationDelay: inView ? `${delay}ms` : undefined,
        },
      } as any)}
    </div>
  )
}

