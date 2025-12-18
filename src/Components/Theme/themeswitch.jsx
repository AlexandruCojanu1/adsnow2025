import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const [lightMode, setLightMode] = useState(false);

    useEffect(() => {
        const mode = localStorage.getItem('lightmode');
        if (mode === 'active') {
            setLightMode(true);
            document.body.classList.add('lightmode');
        }
    }, []);

    useEffect(() => {
        const updateLogos = () => {
            const siteLogos = document.querySelectorAll('.site-logo');
            const partnerLogos = document.querySelectorAll('.partner-logo');
    
            if (lightMode) {
                document.body.classList.add('lightmode');
                localStorage.setItem('lightmode', 'active');
    
                siteLogos.forEach((logo) => {
                    logo.setAttribute('src', 'assets/images/logo1.png');
                });
    
                partnerLogos.forEach((img) => {
                    const src = img.getAttribute('src');
                    if (!src.includes('-dark')) {
                        img.setAttribute('src', src.replace('.png', '-dark.png'));
                    }
                });
            } else {
                document.body.classList.remove('lightmode');
                localStorage.removeItem('lightmode');
    
                siteLogos.forEach((logo) => {
                    logo.setAttribute('src', 'assets/images/logo1.png');
                });
    
                partnerLogos.forEach((img) => {
                    const src = img.getAttribute('src');
                    img.setAttribute('src', src.replace('-dark.png', '.png'));
                });
            }
        };
    
        updateLogos();
    
        const observer = new MutationObserver(() => {
            updateLogos();
        });
    
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    
        return () => {
            observer.disconnect();
        };
    }, [lightMode]);
    
    

    const toggleMode = () => {
        setLightMode((prev) => !prev);
    };

    return (
        <button id="themeSwitch" onClick={toggleMode}>
            <i
                id="themeIcon"
                className={`fas ${lightMode ? 'fa-sun' : 'fa-moon'}`}
            ></i>
        </button>
    );
}
