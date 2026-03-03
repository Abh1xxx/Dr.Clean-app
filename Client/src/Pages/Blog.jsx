import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs/all");
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <section className="text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">Stories</p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Our Recent Works</h1>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            See before-after highlights and updates from our completed cleaning projects.
          </p>
        </section>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-800">No blog posts yet</h3>
            <p className="text-slate-500 mt-2 text-sm">Please check back later.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  {blog.media?.length > 0 ? (
                    <img
                      src={blog.media[0].url}
                      alt="blog"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">No Media</div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-1">
                    {blog.title || "Work Update"}
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-2">{blog.caption}</p>

                  <div className="mt-4 text-xs text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
