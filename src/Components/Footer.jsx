import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";

function Footer() {
    return (
        <div>


            <div className='h-[2px] bg-black w-full'></div>

            <div className='flex justify-center'>
                <div className='display flex text-xl'>
                    <div>
                        Design and Developed by
                    </div>
                    <div className='ml-1 text-green-700 underline font-bold'>
                        {import.meta.env.VITE_NAME}
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>

                <div className='text-blue-700 m-4'>
                    <FaLinkedin />
                </div>
                <div className='text-red-700 m-4'>
                    <FaInstagram />
                </div>
                <div className='text-blue-700 m-4'>
                    <FaFacebook />
                </div>
                <div className='text-green-700 m-4'>
                    <FaWhatsappSquare />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Footer