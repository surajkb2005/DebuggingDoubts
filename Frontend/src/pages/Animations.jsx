import React, { useState, useEffect } from "react";
import "./styles/animations.css";

const Animations = () => {
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        if (savedTheme === "light") {
            setTheme("light");
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            // DEFAULT DARK
            document.documentElement.removeAttribute("data-theme");
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            setTheme("light");
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        }
    };

    const cards = [
        {
            title: "Segment Hardware",
            desc: "Interactive visualization of segmentation hardware.",
            img: "/animations/images/segmentHardware.png",
            link: "/animations/OperatingSystem/segment_hardware.html",
            video: "https://youtu.be/kgQ8NN1S2z8"
        },
        {
            title: "Disk Scheduling",
            desc: "Visualization of disk scheduling algorithms.",
            img: "/animations/images/diskScheduling.png",
            link: "/animations/OperatingSystem/disk_scheduling.html",
            video: "https://youtu.be/kgQ8NN1S2z8"
        },
        {
            title: "Deadlock or Not?",
            desc: "Check if system enters deadlock.",
            img: "/animations/images/deadlock_detection.png",
            link: "/animations/OperatingSystem/deadlock_or_not.html",
        },
        {
            title: "Deadlock Handling",
            desc: "Understand process deadlock handling.",
            img: "/animations/images/deadlock.png",
            link: "/animations/OperatingSystem/Deadlock_avoid.html",
        },
        {
            title: "Banker's Algorithm",
            desc: "Visualize safe sequences.",
            img: "/animations/images/banker_algo.png",
            link: "/animations/OperatingSystem/safety_algo.html",
        },
        {
            title: "Paging Basics",
            desc: "Understand logical → physical mapping.",
            img: "/animations/images/paging.png",
            link: "/animations/OperatingSystem/paging_Initial_concepts.html",
            video: "https://youtu.be/NmdqSa0Uzpw"
        },
        {
            title: "Paging with TLB",
            desc: "Advanced paging with cache.",
            img: "/animations/images/paging_TLB.png",
            link: "/animations/OperatingSystem/paging.html",
        },
    ];

    return (
        <div className="animations-page">
            {/* Theme Toggle */}
            <div className="theme-switch-wrapper">
                <button className="theme-btn" onClick={toggleTheme}>
                    {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            {/* Header */}
            <header>
                <h1>Debugging Doubts Visualization</h1>
                <p className="subtitle">
                    Interactive academic animations for Operating Systems and beyond.
                </p>

                <a
                    href="https://youtube.com/@debuggingdoubts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-btn"
                >
                    Subscribe to Channel
                </a>
            </header>

            <h3>Operating Systems</h3>

            {/* Cards */}
            <div className="gallery-container">
                {cards.map((card, index) => (
                    <div className="card" key={index}>
                        <div className="thumbnail-box">
                            <img src={card.img} alt={card.title} />
                        </div>

                        <div className="card-content">
                            <h2 className="card-title">{card.title}</h2>
                            <p className="card-desc">{card.desc}</p>

                            <div className="card-actions">
                                <a href={card.link} target="_blank" className="view-btn">
                                    Live Demo →
                                </a>

                                {card.video && (
                                    <a
                                        href={card.video}
                                        target="_blank"
                                        className="video-link-btn"
                                    >
                                        🎥 Explanation
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className="main-footer">
                <p>© {new Date().getFullYear()} Debugging Doubts</p>
                <p className="footer-subtext">
                    Visualizing complex concepts, one animation at a time.
                </p>
            </footer>
        </div>
    );
};

export default Animations;