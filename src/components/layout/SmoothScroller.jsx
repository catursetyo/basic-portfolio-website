import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroller() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    lenis.scrollTo(target, {
                        offset: 0,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Same easing
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

        return () => {
            lenis.destroy();
            anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
        };
    }, []);

    return null;
}
