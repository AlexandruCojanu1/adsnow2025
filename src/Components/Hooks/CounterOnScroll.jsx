import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const CounterOnScroll = ({
target,
suffix = '',
duration = 2000,
threshold = 0.5,
counterClassName = 'counter', // Default class untuk number
suffixClassName = 'counter-detail', // Default class untuk suffix
}) => {
const { ref, inView } = useInView({
    triggerOnce: true, // Hanya trigger sekali
    threshold,
});
const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            const steps = 60; // Jumlah frame animasi
            const increment = Math.max(1, Math.ceil(target / steps));
            const delay = duration / (target / increment);

            const interval = setInterval(() => {
                setCount((prev) => {
                const next = prev + increment;
                return next >= target ? target : next;
                });
            }, delay);

            return () => clearInterval(interval);
            }
    }, [inView, target, duration]);

    return (
        <span ref={ref} className="counter-wrapper">
            <span className={counterClassName} data-target={target}>
                {Math.round(count)}
            </span>
            {suffix && <span className={suffixClassName}>{suffix}</span>}
        </span>
    );
};

export default CounterOnScroll;