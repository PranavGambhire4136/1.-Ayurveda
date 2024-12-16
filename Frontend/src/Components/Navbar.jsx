import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../Assects/Logo.png"

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    // const Login = () => {
        // ====> This data will be came from backend
    // }

    return (
        <div className='flex justify-between items-center bg-[#1b8e53] text-white h-[10vh] w-[100vw] px-5 md:px-10'>
            <div className=' h-[40vh] w-[10vw]  md:h-[10vh] md:w-[2vw] mt-6 ml-[5vw] md:ml-0 mb-3 flex flex-col justify-center'>
                <NavLink to="/">
                    <img src={logo} alt="Logo of ayurlens"/>
                </NavLink>
            </div>

            <div className="hidden md:flex space-x-8">
                <NavLink to="/plantInformation" className="hover:text-red-300">Plant Information</NavLink>
                <NavLink to="/blog" className="hover:text-red-300">Blog</NavLink>
                <NavLink to="/newBlog" className="hover:text-red-300">Add New Blog</NavLink>
            </div>
            {
                !isLogin &&
                <div className='hidden md:flex space-x-10 mr-[10vw]'>
                    <NavLink to="/signUp" className="hover:text-red-300">Sign Up</NavLink>
                    <NavLink to="/login" className="hover:text-red-300">Log In</NavLink>
                </div>
            }

            {
                isLogin &&
                <div>
                    <NavLink to="/viewProfile">Logo</NavLink>
                </div>
            }

            <div className="flex md:hidden mr-5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <button className="text-white">
                    ☰
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[10vh] left-0 w-full bg-black flex flex-col items-center space-y-5 py-5">
                    <NavLink to="/plantInformation" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Plant Information</NavLink>
                    <NavLink to="/newPlant" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Add Plant Information</NavLink>
                    <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Blog</NavLink>

                    {
                        !isLogin &&
                        <div>
                            <NavLink to="/signUp" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Sign Up</NavLink>
                            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Log In</NavLink>
                        </div>
                    }

                    {
                        isLogin &&
                        <div>
                            <NavLink to="/viewProfile">Logo</NavLink>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}

export default Navbar;