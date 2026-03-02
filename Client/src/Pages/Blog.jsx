import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs/all");
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
        Our Recent Works
      </h1>

      {/* Responsive Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog._id}`}
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              {blog.media?.length > 0 ? (
                <img
                  src={blog.media[0].url}
                  alt="blog"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {blog.title || "Work Update"}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {blog.caption}
              </p>

              <div className="mt-4 text-xs text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;