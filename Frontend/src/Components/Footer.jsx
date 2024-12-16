import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

function Footer() {
    return (
        <div className='bg-gray-100 py-4'>
            <div className='h-[2px] bg-black w-full'></div>

            <div className='flex flex-col items-center'>
                <div className='md:text-xl text-xs'>
                    <div className='flex'>
                        Design and Developed by <div className='md:ml-1 text-green-700 underline font-bold px-1'> {import.meta.env.VITE_NAME} </div> 
                    </div>
                    {/* <div className='ml-1 text-green-700 underline font-bold'>
                        {import.meta.env.VITE_NAME}
                    </div> */}
                </div>

                <div className='flex justify-center flex-wrap mt-4'>
                    <div className='text-blue-700 m-2 hover:scale-150 transition-transform'>
                        <a href="https://www.linkedin.com/in/pranav-gambhire/" target='_blank' rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                    <div className='text-orange-500 m-2 hover:scale-150 transition-transform'>
                        <a href="https://leetcode.com/u/Pranav_Gambhire/" target='_blank' rel="noopener noreferrer">
                            <SiLeetcode />
                        </a>
                    </div>
                    <div className='text-red-700 m-2 hover:scale-150 transition-transform'>
                        <a href="https://www.instagram.com/pranav_gambhire_3965/" target='_blank' rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                    </div>
                    <div className='text-green-700 m-2 hover:scale-150 transition-transform'>
                        <a href="https://wa.me/+917757931561" target='_blank' rel="noopener noreferrer">
                            <FaWhatsappSquare />
                        </a>
                    </div>
                    <div className='text-blue-700 m-2 hover:scale-150 transition-transform'>
                        <a href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
