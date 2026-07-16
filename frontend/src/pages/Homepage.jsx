import React from "react";
import { Navbar } from "../components/Navbar";
import { RateLimitedUI } from "../components/RateLimitedUI";
import { LoadingComponent } from "../components/LoadingComponent";
import { useState, useEffect } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { NoteCard } from "../components/NoteCard";

export function Home() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
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
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar mode="AddNote" />
      <div className="mx-auto max-w-7xl p-4">
        {isRateLimited && <RateLimitedUI />}
      </div>
      <div className="mx-auto max-w-7xl p-4">
        {isLoading && (
          <LoadingComponent
            LoadingTitle="Loading Data!"
            LoadingContent="Please wait while we fetch your notes."
          />
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
