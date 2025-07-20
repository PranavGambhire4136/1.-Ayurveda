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

        axios.get('https://ayurveda-backend.onrender.com/api/v1/logout', { withCredentials: true })
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
        <nav className="flex justify-between items-center bg-gradient-to-r from-[#1b5e20] via-[#4caf50] to-[#c9a14a] shadow-lg temple-border h-[10vh] w-full px-5 md:px-16 rounded-b-2xl" style={{fontFamily: 'Noto Serif, Merriweather, serif', minHeight: '70px'}}>
            {/* Logo Section */}
            <div className="flex items-center h-[55px] w-auto mt-2 ml-[5vw] md:ml-0 mb-2">
                <NavLink to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Root of Ayurveda Logo" className="h-12 w-12 rounded-full border-4 border-[#c9a14a] shadow temple-shadow bg-white p-1" />
                    <span className="text-3xl font-bold temple-heading tracking-wide text-white navbar-text-shadow" style={{letterSpacing: '0.04em'}}>Root of Ayurveda</span>
                </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 items-center">
                <NavLink to="/plantInformation" className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Plant Information</NavLink>
                <NavLink to="/blog" className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Blog</NavLink>
                <NavLink to="/newBlog" className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Add New Blog</NavLink>
            </div>

            {/* Login/Logout Buttons */}
            {!isLogin ? (
                <div className="hidden md:flex space-x-10 mr-[10vw] items-center">
                    <NavLink to="/signUp" className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Sign Up</NavLink>
                    <NavLink to="/login" className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Log In</NavLink>
                </div>
            ) : (
                <div className="hidden md:flex space-x-10 mr-[10vw] items-center">
                    <NavLink to="/viewProfile" className="hover:scale-105 mt-2">
                    {
                        user.profile ? (
                            <img src={user.profile} alt="Profile" className="h-10 w-10 rounded-full border-2 border-[#c9a14a]" />
                        ) : (
                            <Avatar name={name} size={35} />
                        )
                    }
                    </NavLink>
                    <button onClick={logout} className="bg-[#c9a14a] text-[#1b5e20] px-4 py-1 rounded-lg font-semibold shadow temple-shadow hover:bg-[#4caf50] hover:text-white transition-colors duration-200 navbar-text-shadow">Log Out</button>
                </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden mr-5" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <button className="text-white text-3xl p-2 rounded-full bg-[#1b5e20] shadow temple-shadow navbar-text-shadow">☰</button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-[10vh] left-0 w-full bg-[#1b5e20] text-white flex flex-col items-center space-y-5 py-5 z-20 rounded-b-2xl shadow temple-shadow navbar-text-shadow">
                    <NavLink to="/plantInformation" onClick={() => setIsMobileMenuOpen(false)} className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Plant Information</NavLink>
                    <NavLink to="/newPlant" onClick={() => setIsMobileMenuOpen(false)} className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Add Plant Information</NavLink>
                    <NavLink to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Blog</NavLink>

                    {!isLogin ? (
                        <div className="flex flex-col items-center space-y-2">
                            <NavLink to="/signUp" onClick={() => setIsMobileMenuOpen(false)} className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Sign Up</NavLink>
                            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white navbar-text-shadow text-lg font-semibold transition-colors duration-200 hover:text-[#b8891b] focus:text-[#b8891b]">Log In</NavLink>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-2">
                            <NavLink to="/viewProfile" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#c9a14a]">
                                {!user.profile && <Avatar name={name} />}
                                {user.profile && <img src={user.profile} alt="Profile" className="w-10 h-10 rounded-full border-2 border-[#c9a14a]" />}
                            </NavLink>
                            <button onClick={logout} className="bg-[#c9a14a] text-[#1b5e20] px-4 py-1 rounded-lg font-semibold shadow temple-shadow hover:bg-[#4caf50] hover:text-white transition-colors duration-200 navbar-text-shadow">Log Out</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;