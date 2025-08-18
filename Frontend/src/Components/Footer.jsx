import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
    return (
        <footer className="bg-[var(--temple-offwhite)] pt-8 pb-4 px-4 temple-border rounded-t-3xl shadow temple-shadow mt-8 relative">
           
            <div className="flex flex-col items-center space-y-2">
                <div className="temple-heading text-xl md:text-2xl text-center mb-2" style={{fontFamily: 'Noto Serif, Merriweather, serif'}}>
                    "स्वस्थस्य स्वास्थ्य रक्षणं, आतुरस्य विकार प्रशमनं।"
                </div>
                <div className="text-sm md:text-base text-[var(--temple-brown)] text-center italic mb-2">
                    "Preserving the health of the healthy and alleviating the suffering of the sick."
                </div>
                <div className="md:text-xl text-xs text-[var(--temple-dark-green)]">
                    <span className="font-semibold">Design & Developed by</span>
                    <span className="md:ml-1 text-[var(--temple-green)] underline font-bold px-1">{import.meta.env.VITE_NAME}</span>
                </div>
                <div className="flex justify-center flex-wrap mt-4 gap-2">
                    <a href="https://www.linkedin.com/in/pranavgambhire1/" target='_blank' rel="noopener noreferrer" className="text-[#1b5e20] bg-[#c9a14a]/10 rounded-full p-2 hover:bg-[#c9a14a]/40 hover:text-[#c9a14a] transition-colors duration-200"><FaLinkedin size={28} /></a>
                    <a href="https://leetcode.com/u/Pranav_Gambhire_4136/" target='_blank' rel="noopener noreferrer" className="text-[#4caf50] bg-[#c9a14a]/10 rounded-full p-2 hover:bg-[#c9a14a]/40 hover:text-[#c9a14a] transition-colors duration-200"><SiLeetcode size={28} /></a>
                    <a href="https://wa.me/+917757931561" target='_blank' rel="noopener noreferrer" className="text-[#388e3c] bg-[#c9a14a]/10 rounded-full p-2 hover:bg-[#c9a14a]/40 hover:text-[#c9a14a] transition-colors duration-200"><FaWhatsappSquare size={28} /></a>
                    <a href="https://www.instagram.com/pranav_gambhire_3965/" target='_blank' rel="noopener noreferrer" className="text-[#c0392b] bg-[#c9a14a]/10 rounded-full p-2 hover:bg-[#c9a14a]/40 hover:text-[#c9a14a] transition-colors duration-200"><FaInstagram size={28} /></a>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer;
