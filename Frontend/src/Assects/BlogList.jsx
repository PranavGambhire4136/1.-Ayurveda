import React, { useEffect, useState } from 'react';
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import axios from 'axios';
import toast from 'react-hot-toast';
import Avatar from '../Components/Avatar';

function BlogList({ blog }) {
    const [isLike, setIsLike] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const [isDislike, setIsDislike] = useState(false);
    const [dislikeId, setDislikeId] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchLikesAndDislikes = async () => {
            console.log("blog", blog);
            try {
                const likeResponse = await axios.get(`api/isLike`, {
                    withCredentials: true,
                    params: { postId: blog._id },
                });
                setIsLike(likeResponse.data.isLiked);
                setLikeId(likeResponse.data.likeId);
                setLikeCount(likeResponse.data.likeCount);

                const dislikeResponse = await axios.get(`api/isDisLike`, {
                    withCredentials: true,
                    params: { postId: blog._id },
                });
                setIsDislike(dislikeResponse.data.isDisliked);
                setDislikeId(dislikeResponse.data.dislikeId);
                setDislikeCount(dislikeResponse.data.totalDisLikes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikesAndDislikes();
        const token = localStorage.getItem('token');
        setToken(token);
    }, [blog._id]);

    const handleLike = async () => {
        try {
            if (isLike) {
                await axios.post(`api/removeLike`, {
                    postId: blog._id,
                    likeId,
                }, { withCredentials: true });
                setIsLike(false);
                setLikeCount((prev) => prev - 1);
                toast.success("Liked Removed SuccessFully");
            } else {
                if (isDislike) await handleDislike(); 
                const response = await axios.post(`api/giveLike`, {
                    post: blog._id,
                }, { withCredentials: true });
                setIsLike(true);
                setLikeId(response.data.likeid);
                setLikeCount((prev) => prev + 1);
                toast.success("Liked successsfully");
            }
        } catch (error) {
            console.error(error);
            if (isLike) toast.error("can't Remove like");
            else toast.error("can't add Like");
        }
    };

    const handleDislike = async () => {
        try {
            if (isDislike) {
                await axios.post(`api/removeDisLike`, {
                    postId: blog._id,
                }, { withCredentials: true });
                setIsDislike(false);
                setDislikeCount((prev) => prev - 1);
                toast.success("Dislike removed successfully");
            } else {
                if (isLike) await handleLike(); // Remove like if already liked
                const response = await axios.post(`api/addDisLike`, {
                    postId: blog._id,
                }, { withCredentials: true });
                setIsDislike(true);
                setDislikeId(response.data.dislikeId);
                setDislikeCount((prev) => prev + 1);
                toast.success("Dislike added successfully");
            }
        } catch (error) {
            console.error(error);
            if (isDislike) toast.error("Dislike can't removed");
            else toast.error("Dislike can't add");
        }
    };

    return (
        <div className="justify-center w-full flex flex-wrap gap-6 bg-gradient-to-b from-green-200 to-green-100 p-10 m-5">
            <div className="bg-gray-100 rounded-xl shadow-xl overflow-hidden w-[300px] transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="w-full h-[200px] overflow-hidden">
                    <img
                        src={blog.postImage}
                        alt={blog.postHeading}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between items-start p-6 min-h-[250px]">
                    <h4 className="font-bold text-lg mt-2 text-gray-800">{blog.postHeading}</h4>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                        {blog.postContent}
                    </p>
                    {blog.user.profile &&
                        <div className="flex items-center mt-auto">
                            <img
                                src={blog.user.profile}
                                alt="user"
                                className="rounded-full w-10 h-10 mr-3 border-2 border-gray-300"
                            />
                            <span className="text-gray-700 text-sm">{blog.user.userName}</span>
                        </div>
                    }

                    {!blog.user.profile &&
                        <div className="flex items-center mt-auto">
                            <Avatar name = {blog.user.name} size = {40}/>
                            <span className="text-gray-700 text-sm">{blog.user.userName}</span>
                        </div>}
                </div>

                {
                    token &&
                    <div className="flex justify-between p-4 bg-gray-100 border-t">
                        <div className="flex items-center">
                            <button
                                onClick={handleLike}
                                className="text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                {isLike ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
                            </button>
                            <div className="ml-2 text-gray-700">{likeCount}</div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleDislike}
                                className="text-red-500 hover:text-red-600 transition-colors"
                            >
                                {isDislike ? <AiFillDislike size={20} /> : <AiOutlineDislike size={20} />}
                            </button>
                            <div className="ml-2 text-gray-700">{dislikeCount}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
    
}

export default BlogList;
