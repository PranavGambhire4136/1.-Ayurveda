import React from "react";
import BlogList from "../Components/BlogList";

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--temple-green)] via-[var(--temple-leaf)] to-[var(--temple-gold)] temple-bg temple-border pb-16">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-16 md:py-24 mb-10 overflow-hidden">
                <svg className="absolute left-0 top-0 opacity-15 z-0" width="260" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="130" cy="60" rx="120" ry="38" fill="#4caf50" fillOpacity="0.10"/><ellipse cx="180" cy="80" rx="70" ry="20" fill="#c9a14a" fillOpacity="0.08"/></svg>
                <svg className="absolute right-0 bottom-0 opacity-15 z-0" width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="90" cy="45" rx="88" ry="22" fill="#4caf50" fillOpacity="0.09"/></svg>
                <h1 className="temple-heading text-5xl md:text-6xl font-extrabold text-center mb-4 tracking-wider navbar-text-shadow" style={{letterSpacing:'0.08em'}}>Ayurvedic Wisdom Blog</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--temple-green)] text-center mb-6 navbar-text-shadow" style={{fontFamily: 'Noto Serif, Merriweather, serif'}}>Insights & Stories for Mind, Body, and Spirit</h2>
                <p className="text-xl md:text-2xl text-[var(--temple-brown)] text-center max-w-2xl mx-auto mb-2 px-2" style={{fontFamily: 'Merriweather, Georgia, serif'}}>Discover ancient knowledge, holistic health tips, and inspiring journeys from the world of Ayurveda. Let your soul and intellect be nourished by sacred words.</p>
            </section>
            {/* Blog List Section */}
            <section className="relative max-w-7xl mx-auto rounded-3xl shadow-2xl temple-border bg-[var(--temple-offwhite)] bg-opacity-95 px-4 md:px-16 py-16 flex flex-col items-center overflow-hidden mb-12">
                <svg className="absolute left-0 top-0 opacity-10 z-0" width="260" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="130" cy="60" rx="120" ry="38" fill="#4caf50" fillOpacity="0.10"/><ellipse cx="180" cy="80" rx="70" ry="20" fill="#c9a14a" fillOpacity="0.08"/></svg>
                <svg className="absolute right-0 bottom-0 opacity-10 z-0" width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="90" cy="45" rx="88" ry="22" fill="#4caf50" fillOpacity="0.09"/></svg>
                <BlogList />
            </section>
            {/* Call to Action */}
            <div className="w-full flex flex-col items-center mt-10">
                <div className="text-2xl md:text-3xl font-bold text-[var(--temple-gold)] navbar-text-shadow mb-2">Share Your Ayurvedic Story</div>
                <div className="text-lg text-[var(--temple-green)] mb-4">Have wisdom or a healing journey to share? Join our community and inspire others.</div>
                <a href="/newblog" className="temple-btn text-xl px-10 py-4 font-bold shadow-lg hover:scale-105 transition-all">Write a Blog</a>
            </div>
        </div>
    );
}

export default App;
