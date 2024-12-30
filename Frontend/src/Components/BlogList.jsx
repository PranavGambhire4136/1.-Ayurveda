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
        const blog = await axios.get('http://localhost:4000/api/v1/getAllPost', { withCredentials: true });
        setBlogs(blog.data.data);
        setIsLoding(false);
    }

    useEffect(() => {
        getAllBlogs();
    }, [])


    return (
        <div className='md:grid md:grid-cols-4 md:gap-4'>
            { !isLoding && 
                blogs.map((blog) => (
                    <BlogList key={blog._id} blog={blog} />
                ))
            }

            {isLoding &&
                <Loader />
            }
        </div>
    )
}

export default BlogList2