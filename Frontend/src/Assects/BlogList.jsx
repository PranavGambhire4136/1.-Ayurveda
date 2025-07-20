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
    const [isExpanded, setIsExpanded] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchLikesAndDislikes = async () => {
            try {
                const likeResponse = await axios.get(`https://ayurveda-backend.onrender.com/api/v1/isLike`, {
                    withCredentials: true,
                    params: { postId: blog._id },
                });
                setIsLike(likeResponse.data.isLiked);
                setLikeId(likeResponse.data.likeId);
                setLikeCount(likeResponse.data.likeCount);

                const dislikeResponse = await axios.get(`https://ayurveda-backend.onrender.com/api/v1/isDisLike`, {
                    withCredentials: true,
                    params: { postId: blog._id },
                });
                setIsDislike(dislikeResponse.data.isDisliked);
                setDislikeId(dislikeResponse.data.dislikeId);
                setDislikeCount(dislikeResponse.data.totalDisLikes);
            } catch (error) {}
        };

        fetchLikesAndDislikes();
        const token = localStorage.getItem('token');
        setToken(token);
    }, [blog._id]);

    const handleLike = async () => {
        try {
            if (isLike) {
                await axios.post(`https://ayurveda-backend.onrender.com/api/v1/removeLike`, {
                    postId: blog._id,
                    likeId,
                }, { withCredentials: true });
                setIsLike(false);
                setLikeCount((prev) => prev - 1);
                toast.success("Liked Removed Successfully");
            } else {
                if (isDislike) await handleDislike();
                const response = await axios.post(`https://ayurveda-backend.onrender.com/api/v1/giveLike`, {
                    post: blog._id,
                }, { withCredentials: true });
                setIsLike(true);
                setLikeId(response.data.likeid);
                setLikeCount((prev) => prev + 1);
                toast.success("Liked successfully");
            }
        } catch (error) {
            if (isLike) toast.error("Can't remove like");
            else toast.error("Can't add Like");
        }
    };

    const handleDislike = async () => {
        try {
            if (isDislike) {
                await axios.post(`https://ayurveda-backend.onrender.com/api/v1/removeDisLike`, {
                    postId: blog._id,
                }, { withCredentials: true });
                setIsDislike(false);
                setDislikeCount((prev) => prev - 1);
                toast.success("Dislike removed successfully");
            } else {
                if (isLike) await handleLike();
                const response = await axios.post(`https://ayurveda-backend.onrender.com/api/v1/addDisLike`, {
                    postId: blog._id,
                }, { withCredentials: true });
                setIsDislike(true);
                setDislikeId(response.data.dislikeId);
                setDislikeCount((prev) => prev + 1);
                toast.success("Dislike added successfully");
            }
        } catch (error) {
            if (isDislike) toast.error("Dislike can't be removed");
            else toast.error("Dislike can't be added");
        }
    };

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-wrap justify-center gap-6 bg-gradient-to-b from-green-200 to-green-100 p-5 sm:p-10">
            <div className="bg-gray-100 rounded-xl shadow-lg overflow-hidden w-full max-w-sm sm:max-w-md transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-[200px] overflow-hidden">
                    <img
                        src={blog.postImage}
                        alt={blog.postHeading}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between p-4 sm:p-6 min-h-[250px]">
                    <h4 className="font-bold text-lg text-gray-800">{blog.postHeading}</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        {isExpanded ? blog.postContent : `${blog.postContent.slice(0, 100)}...`}
                    </p>
                    <button
                        onClick={toggleContent}
                        className="mt-2 mb-4 py-2 px-6 rounded-full font-bold text-sm bg-gradient-to-r from-[var(--temple-gold)] via-[var(--temple-leaf)] to-[var(--temple-green)] text-white shadow-[0_4px_24px_0_rgba(201,161,74,0.19)] border-2 border-[var(--temple-gold)] transition-all duration-200 hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--temple-gold)] focus:ring-offset-2"
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                    {blog.user.profile ? (
                        <div className="flex items-center mt-auto">
                            <img
                                src={blog.user.profile}
                                alt="user"
                                className="rounded-full w-10 h-10 mr-3 border-2 border-gray-300"
                            />
                            <span className="text-gray-700 text-sm">{blog.user.userName}</span>
                        </div>
                    ) : (
                        <div className="flex items-center mt-auto">
                            <Avatar name={blog.user.name} size={40} />
                            <span className="text-gray-700 text-sm">{blog.user.userName}</span>
                        </div>
                    )}
                </div>
                {token && (
                    <div className="flex justify-between p-4 bg-gray-100 border-t">
                        <div className="flex items-center">
                            <button
                                onClick={handleLike}
                                className={`rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md border-2 ${isLike ? 'bg-blue-100 border-blue-400 scale-110 shadow-blue-200' : 'bg-white border-gray-300 hover:scale-110 hover:shadow-lg'}`}
                            >
                                {isLike ? <AiFillLike size={24} color="#2563eb" /> : <AiOutlineLike size={20} color="#2563eb" />}
                            </button>
                            <div className="ml-2 text-gray-700">{likeCount}</div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleDislike}
                                className={`rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-md border-2 ${isDislike ? 'bg-red-100 border-red-400 scale-110 shadow-red-200' : 'bg-white border-gray-300 hover:scale-110 hover:shadow-lg'}`}
                            >
                                {isDislike ? <AiFillDislike size={24} color="#dc2626" /> : <AiOutlineDislike size={20} color="#dc2626" />}
                            </button>
                            <div className="ml-2 text-gray-700">{dislikeCount}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogList;
