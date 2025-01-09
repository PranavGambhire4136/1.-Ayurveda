import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import logo from "../Assects/Logo.png";
import { jwtDecode } from "jwt-decode";
import Avatar from './Avatar';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token')); // Convert to boolean
    const [name, setName] = useState(localStorage.getItem('name'));
    const location = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        let id;

        const changeToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                // //consolelog('token', decodedToken);
                // //consolelog("profile", decodedToken.profile);
                setUser(decodedToken);

                if (decodedToken.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setIsLogin(false);
                } else {
                    setIsLogin(true);
                    setName(decodedToken.name);
                }
            } else {
                setIsLogin(false);
                if (id) clearInterval(id);
            }
        };

        changeToken();
        id = setInterval(changeToken, 60 * 1000);

        return () => {
            if (id) clearInterval(id);
        };
    }, [location]);


    const logout = () => {

        // //consolelog(document.cookie);
        // const change = " ";
        // document.cookie = `token=${change}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

        axios.get('api/logout', { withCredentials: true })
            .then(res => {
                // //consolelog(res.data);
                toast.success(res.data.message);
            })
            .catch(err => {
                // //consolelog(err);
                toast.error(err.response.data.message);
            })

        localStorage.removeItem('token');
        setIsLogin(false);
        setIsMobileMenuOpen(false);

    };

    return (
        <div className="flex justify-between items-center bg-[#1b8e53] text-white h-[10vh] w-full px-5 md:px-10">
            {/* Logo Section */}
            <div className="h-[40px] w-auto mt-2 ml-[5vw] md:ml-0 mb-2">
                <NavLink to="/">
                    <img src={logo} alt="Logo of Ayurlens" className="h-full object-contain" />
                </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
                <NavLink to="/plantInformation" className="hover:text-red-300">Plant Information</NavLink>
                <NavLink to="/blog" className="hover:text-red-300">Blog</NavLink>
                <NavLink to="/newBlog" className="hover:text-red-300">Add New Blog</NavLink>
            </div>

            {/* Login/Logout Buttons */}
            {!isLogin ? (
                <div className="hidden md:flex space-x-10 mr-[10vw]">
                    <NavLink to="/signUp" className="hover:text-red-300">Sign Up</NavLink>
                    <NavLink to="/login" className="hover:text-red-300">Log In</NavLink>
                </div>
            ) : (
                <div className="hidden md:flex space-x-10 mr-[10vw]">
                    <NavLink to="/viewProfile" className="hover:scale-105 mt-2 bg">
                    {
                        user.profile ? (
                            <img src={user.profile} alt="Profile" className="h-10 w-10 rounded-full" />
                        ) : (
                            <Avatar name={name} size={35} />
                        )
                    }
                    
                    </NavLink>
                    <button onClick={logout} className="text-white hover:text-red-300">Log Out</button>
                </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden mr-5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <button className="text-white text-2xl">☰</button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[10vh] left-0 w-full bg-black text-white flex flex-col items-center space-y-5 py-5 z-10">
                    <NavLink to="/plantInformation" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Plant Information</NavLink>
                    <NavLink to="/newPlant" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Add Plant Information</NavLink>
                    <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Blog</NavLink>

                    {!isLogin ? (
                        <div className="flex flex-col items-center space-y-2">
                            <NavLink to="/signUp" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Sign Up</NavLink>
                            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">Log In</NavLink>
                        </div>
                    ) : (


                        <div className="flex flex-col items-center space-y-2">
                            <NavLink to="/viewProfile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-300">

                                {!user.profile &&
                                    <Avatar name={name} />
                                }

                                {user.profile &&
                                    <img src={user.profile} alt="Profile" className="w-10 h-10 rounded-full" />
                                }
                            </NavLink>
                            <button onClick={logout} className="text-red-300 hover:underline">Log Out</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Navbar;