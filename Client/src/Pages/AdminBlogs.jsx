import React, { useEffect, useState } from "react";
import axiosInstance from "../Axios/axiosInstance";

function AdminBlogs() {
  const token = localStorage.getItem("token");

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    caption: "",
    status: "draft",
    media: [],
  });

  const [previewMedia, setPreviewMedia] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axiosInstance.get("/blogs/admin/all", { headers });
      setBlogs(res.data.blogs || []);
    } catch (err) {
      setError("Failed to load blogs. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      caption: "",
      status: "draft",
      media: [],
    });
    setPreviewMedia([]);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      const fileList = Array.from(files || []);
      setForm((prev) => ({ ...prev, media: fileList }));

      const previews = fileList.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image",
        source: "local",
      }));

      setPreviewMedia(previews);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.caption.trim()) {
      setError("Caption is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("caption", form.caption);
    formData.append("status", form.status);

    form.media.forEach((file) => {
      formData.append("media", file);
    });

    try {
      setSubmitting(true);
      setError("");

      if (editingId) {
        await axiosInstance.put(`/blogs/update/${editingId}`, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("/blogs/create", formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      await fetchBlogs();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save blog.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      caption: blog.caption || "",
      status: blog.status || "draft",
      media: [],
    });

    setPreviewMedia(
      (blog.media || []).map((item) => ({
        url: item.url,
        type: item.type,
        source: "server",
      }))
    );
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this blog post?");
    if (!confirmed) return;

    try {
      setError("");
      await axiosInstance.delete(`/blogs/delete/${id}`, { headers });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete blog.");
    }
  };

  const handleQuickStatus = async (id, status) => {
    try {
      setError("");
      await axiosInstance.put(
        `/blogs/update/${id}`,
        { status },
        {
          headers,
        }
      );

      setBlogs((prev) =>
        prev.map((blog) => (blog._id === id ? { ...blog, status } : blog))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update blog status.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-blue-700 font-semibold">
              Admin Panel
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Manage Blogs
            </h1>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Create drafts, publish posts, update content, and remove old blogs.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total blogs</p>
            <p className="text-2xl font-bold text-blue-900">{blogs.length}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 md:p-7 space-y-5 sticky top-24"
            >
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingId ? "Edit Blog" : "Create Blog"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  You can save as draft or publish immediately.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Blog title"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Caption</label>
                  <textarea
                    name="caption"
                    value={form.caption}
                    onChange={handleChange}
                    placeholder="Write blog caption/content"
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 min-h-28 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Media (up to 5 files)
                  </label>
                  <input
                    type="file"
                    name="media"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleChange}
                    className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Uploading new files will replace existing media on update.
                  </p>
                </div>

                {previewMedia.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {previewMedia.map((item, idx) =>
                      item.type === "video" ? (
                        <video
                          key={`${item.url}-${idx}`}
                          src={item.url}
                          controls
                          className="w-full h-28 object-cover rounded-lg border border-slate-200"
                        />
                      ) : (
                        <img
                          key={`${item.url}-${idx}`}
                          src={item.url}
                          alt="preview"
                          className="w-full h-28 object-cover rounded-lg border border-slate-200"
                        />
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Blog"
                    : "Create Blog"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-slate-500 text-center">
                Loading blogs...
              </div>
            ) : blogs.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                <h3 className="text-lg font-semibold text-slate-800">No blogs yet</h3>
                <p className="text-slate-500 mt-2 text-sm">Create your first post.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="p-4 md:p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {blog.title || "Untitled Blog"}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {new Date(blog.createdAt).toLocaleDateString()} by {blog.createdBy?.name || "Admin"}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            blog.status === "published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 line-clamp-3">{blog.caption}</p>

                      {blog.media?.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {blog.media.slice(0, 3).map((item, idx) =>
                            item.type === "video" ? (
                              <video
                                key={`${blog._id}-video-${idx}`}
                                src={item.url}
                                className="w-full h-24 object-cover rounded-lg border border-slate-200"
                              />
                            ) : (
                              <img
                                key={`${blog._id}-img-${idx}`}
                                src={item.url}
                                alt="blog media"
                                className="w-full h-24 object-cover rounded-lg border border-slate-200"
                              />
                            )
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Delete
                        </button>

                        {blog.status === "draft" ? (
                          <button
                            onClick={() => handleQuickStatus(blog._id, "published")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => handleQuickStatus(blog._id, "draft")}
                            className="bg-slate-700 hover:bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Move to Draft
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;
