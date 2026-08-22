import React from "react";
import { Navbar } from "../components/Navbar";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "../lib/axios";

export function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(res.data);
        setNotes(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes!");
        console.log(error.response);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to Import Notes.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note Update Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Note Update Unsuccessful!", error);
      toast.error("Note Update Unsuccessful!");
    } finally {
      setIsLoading(false);
    }
    };

    const handleDelete = async (e) => {
      e.preventDefault();

      if (!window.confirm("Are you sure you want to delete this note?")) return;
      setIsLoading(true);

      try {
        await api.delete(`/notes/${id}`);
        navigate("/");
        toast.success("Note Deleted Successfully");
      } catch (error) {
        console.log("Error Deleting Note!");
        toast.error("Note Deletion Unsuccessful!");
      }
    };
  
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar mode="GoBack" />
      <div className="mx-auto max-w-6xl p-4">
        <div className="border border-blue-500 rounded-[25px] py-4 px-5">
          <h1 className="ml-4 text-[25px] text-white font-bold">Create Note</h1>
          <hr className="my-2 border border-blue-500" />
          <form onSubmit={handleUpdate}>
            <label className="block text-white text-[20px] font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full rounded-[15px] border border-blue-500 bg-blue-500/20 text-white mb-2 p-2"
              value={title}
              onChange={(t) => setTitle(t.target.value)}
            />
            <label className="block text-white text-[20px] font-semibold mb-2">
              Content
            </label>
            <textarea
              className="w-full rounded-[15px] border border-blue-500 bg-blue-500/20 text-white mb-2 p-2 min-h-24"
              value={content}
              onChange={(c) => setContent(c.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button 
                type="button"
                onClick={(e) => handleDelete(e)}
                className="rounded-[25px] bg-red-500 hover:bg-red-400
                disabled:bg-red-300 disabled:hover:bg-red-300 text-white py-1 px-3"
                disabled={isLoading}>
                  Delete
              </button>
              <button
                type="submit"
                className="rounded-[25px] bg-blue-500 hover:bg-blue-400
                disabled:bg-blue-300 disabled:hover:bg-blue-300 text-white py-1 px-3"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
