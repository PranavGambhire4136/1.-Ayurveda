import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../Assects/Logo.png"

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='flex justify-between items-center bg-black text-white h-[10vh] px-5 md:px-10'>
            <div className='h-[10vh] w-[5vw] mt-6 ml-[5vw] md:ml-0 mb-3 flex flex-col justify-center'>
                <NavLink to="/">
                    <img src={logo} alt="Logo of ayurlens" width={50} height={50} />
                </NavLink>
            </div>

            <div className="hidden md:flex space-x-8">
                <NavLink to="/plantInformation" className="hover:text-red-300">Plant Information</NavLink>
                <NavLink to="/newPlant" className="hover:text-red-300">Add Plant Information</NavLink>
                <NavLink to="/blog" className="hover:text-red-300">Blog</NavLink>
            </div>

            <div className='hidden md:flex space-x-10 mr-[10vw]'>
                <NavLink to="/signUp" className="hover:text-red-300">Sign Up</NavLink>
                <NavLink to="/login" className="hover:text-red-300">Log In</NavLink>
            </div>

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
                    <NavLink to="/signUp" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Sign Up</NavLink>
                    <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Log In</NavLink>
                </div>
            )}
        </div>
    );
}

export default Navbar;