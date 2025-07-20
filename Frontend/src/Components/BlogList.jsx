import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import BlogList from '../Assects/BlogList'
import Loader from './Loader';

function BlogList2() {

    const [blogs, setBlogs] = useState([]);
    const [isLoding, setIsLoding] = useState(false);

    const getAllBlogs = async () => {
        setIsLoding(true);
        const blog = await axios.get('https://ayurveda-backend.onrender.com/api/v1/getAllPost', { withCredentials: true });
        setBlogs(blog.data.data);
        setIsLoding(false);
    }

    useEffect(() => {
        getAllBlogs();
    }, [])

    return (
        <div className="w-full flex flex-wrap justify-center gap-12 md:gap-16 z-10">
            {!isLoding &&
                blogs.map((blog) => (
                    <div key={blog._id} className="rounded-3xl border-2 border-[var(--temple-gold)] shadow-2xl bg-gradient-to-br from-[var(--temple-green)] via-[var(--temple-leaf)] to-[var(--temple-gold)] bg-opacity-95 max-w-md w-full p-0 md:p-2 mb-8 transition-transform hover:scale-105">
                        <BlogList blog={blog} />
                    </div>
                ))
            }
            {isLoding &&
                <div className="w-full flex justify-center items-center py-10">
                    <Loader />
                </div>
            }
        </div>
    )
}

export default BlogList2