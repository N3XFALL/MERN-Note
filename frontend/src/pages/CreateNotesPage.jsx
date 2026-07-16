import React from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { LoadingComponent } from "../components/LoadingComponent";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
import api from "../lib/axios";

export function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All field are required");
      return
    }

    setIsLoading(true);
    try {
      await api.post('/notes', {
        title,
        content,
      });
      toast.success("Note created successfully!");
      navigate("/");
    } catch(error){
      console.log("Failed Creating Note", error);
      if (error.response.status === 429) {
        toast.error("You are submitting Too Fast!", {duration: 400});
      } else {
        toast.error("Failed creating note!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar mode="GoBack" />
      <div className="mx-auto max-w-6xl p-4">
        <div className="border border-blue-500 rounded-[25px] py-4 px-5">
          <h1 className="ml-4 text-[25px] text-white font-bold">Create Note</h1>
          <hr className="my-2 border border-blue-500" />
          <form onSubmit={handleSubmit}>
            <label className="block text-white text-[20px] font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title here..."
              className="w-full rounded-[15px] border border-blue-500 bg-blue-500/20 text-white mb-2 p-2"
              value={title}
              onChange={(t) => setTitle(t.target.value)}
            />
            <label className="block text-white text-[20px] font-semibold mb-2">
              Content
            </label>
            <textarea
              placeholder="Enter content here..."
              className="w-full rounded-[15px] border border-blue-500 bg-blue-500/20 text-white mb-2 p-2 h-24"
              value={content}
              onChange={(c) => setContent(c.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-[25px] bg-blue-500 hover:bg-blue-400
                disabled:bg-blue-300 disabled:hover:bg-blue-300 text-white py-1 px-3"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
