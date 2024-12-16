import React, { useEffect, useState } from "react";

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    if (loading) return <p className="text-center mt-10">Loading posts...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center mb-5">Blog Posts</h1>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="border rounded-md shadow-md p-4 bg-white hover:shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-3">{post.postHeading}</h2>
                        {post.postImage && (
                            <img
                                src={post.postImage}
                                alt="Post"
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                        )}
                        <p className="text-gray-700 mb-3">{post.postContent.substring(0, 100)}...</p>
                        <p className="text-sm text-gray-500">
                            By: {post.user?.name || "Anonymous"}
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                            <p className="text-gray-500 text-sm">
                                {post.likes.length} Likes, {post.comments.length} Comments
                            </p>
                            <button className="text-blue-500 hover:underline">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
