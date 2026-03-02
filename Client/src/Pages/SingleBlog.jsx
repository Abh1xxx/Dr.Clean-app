import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { useParams } from "react-router-dom";

function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-900 mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-700 mb-8 leading-relaxed">
        {blog.caption}
      </p>

      <div className="space-y-6">
        {blog.media.map((item, index) =>
          item.type === "video" ? (
            <video
              key={index}
              controls
              className="w-full rounded-xl"
              src={item.url}
            />
          ) : (
            <img
              key={index}
              src={item.url}
              alt="blog"
              className="w-full rounded-xl"
            />
          )
        )}
      </div>
    </div>
  );
}

export default SingleBlog;