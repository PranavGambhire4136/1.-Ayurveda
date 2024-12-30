import React from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";

function BlogList(props) {
    const getCurrentBlog = () => {
        console.log(props.blog);
    };

    getCurrentBlog();

    return (
        <div>
            <div className="justify-evenly w-[1040px] flex flex-wrap">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[300px] m-2">
                    <div className="w-full h-[200px] overflow-hidden">
                        <img
                            src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
                            alt="rover"
                            className="w-full h-full object-cover"
                        /> 
                    </div>
                    <div className="flex flex-col justify-center items-start p-5 min-h-[250px]">
                        <span className="bg-teal-400 rounded-full text-white text-xs px-3 py-1 uppercase cursor-pointer">
                            Technology
                        </span>
                        <h4 className="font-medium mt-2">
                            Why is the Tesla Cybertruck designed the way it is?
                        </h4>
                        <p className="text-sm mb-10">
                            An exploration into the truck's polarising design
                        </p>
                        <div className="flex mt-auto">
                            <img
                                src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo"
                                alt="user"
                                className="rounded-full w-10 h-10 mr-3"
                            />
                            <div className="text-gray-500">
                                <h5 className="font-medium text-gray-800">July Dec</h5>
                                <small>2h ago</small>
                            </div>
                        </div>
                    </div>
                        <button><AiOutlineLike /></button>
                        <button><MdOutlineInsertComment /></button>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogList;
