import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
// Using inline SVGs is a best practice in React to keep components self-contained
// and avoid extra network requests. They can also be styled with CSS.

const SecureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const ScalableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
);

const SmartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-400">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <path d="M12 17h.01"></path>
        <path d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h1.945"></path>
        <path d="M12 2a10 10 0 0 1 5.922 16.524l1.51 1.51a2 2 0 0 1-2.828 2.828l-1.424-1.424A10 10 0 1 1 12 2z"></path>
    </svg>
);


// --- Main App Component ---
export default function App() {
    // Array of features to cycle through. Adding new items here will automatically include them in the animation.
    const features = [
        {
            title: "Secure",
            description: "Security-First Approach to protect your data and user privacy.",
            Icon: SecureIcon,
            textColor: "text-cyan-400",
        },
        {
            title: "Scalable",
            description: "Solutions that grow with your user base without compromising Performance.",
            Icon: ScalableIcon,
            textColor: "text-purple-400",
        },
        {
            title: "Accelerated",
            description: "Your App, Ready in Record Time..",
            Icon: SmartIcon,
            textColor: "text-lime-400",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Effect to handle the cycling animation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % features.length);
        }, 3500); // Change feature every 3.5 seconds

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [features.length]);

    const currentFeature = features[currentIndex];

    return (
        <div className="flex items-center justify-center pt-4 font-sans text-white p-4">
            <div className="w-full pt-10 text-center">
                
                {/* Main Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                    Building
                    {/* Animated Text Container */}
                    <div className="relative inline-block h-16 md:h-15 w-64 md:w-80 mx-6 align-baseline">
                        {features.map((feature, index) => (
                            <span
                                key={feature.title}
                                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${feature.textColor} ${index === currentIndex ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-full'}`}
                                aria-hidden={index !== currentIndex}
                            >
                                {feature.title}
                            </span>
                        ))}
                    </div>
                    Web Experiences
                </h1>

                {/* Animated Icon and Description */}
                <div className="relative h-48 mt-12 flex flex-col items-center justify-center">
                    {features.map((feature, index) => {
                         const { Icon, description } = feature;
                         const isActive = index === currentIndex;
                         return (
                            <div
                                key={feature.title}
                                className={`absolute inset-0 flex flex-col items-center justify-start transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                aria-hidden={!isActive}
                            >
                                <div className="mb-4">
                                    <Icon />
                                </div>
                                <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                                    {description}
                                </p>
                            </div>
                         )
                    })}
                </div>
            </div>
        </div>
    );
}
