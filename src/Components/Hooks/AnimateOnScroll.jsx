import React, { cloneElement } from 'react';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

const AnimateOnScroll = ({
    children,
    animation = 'fadeInUp',
    delay = 0,
    speed = 'normal',
    threshold = 0.15,
}) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold,
    });

    const speedClass = {
        normal: '',
        fast: 'animate__fast',
        slow: 'animate__slow',
    }[speed];

    // Pastikan children adalah elemen React tunggal
    const child = React.Children.only(children);

    // Clone child, tambahkan ref, class, dan style opacity
    return cloneElement(child, {
        ref,
        className: `${child.props.className || ''} animate__animated ${
            inView ? `animate__${animation} ${speedClass}` : ''
        }`.trim(),
        style: {
            ...child.props.style, // Pertahankan style asli anak (misal width: 60%)
            opacity: inView ? 1 : 0, // Atur opacity berdasarkan inView
            animationDelay: inView ? `${delay}ms` : undefined, // Hanya terapkan delay saat inView
        },
    });
};

AnimateOnScroll.displayName = 'AnimateOnScroll';

export default AnimateOnScroll;