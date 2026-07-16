import { Link } from "react-router";
import { FilePen, Trash2 } from "lucide-react";
import { dateFormat } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

export function NoteCard({note, setNotes}) {

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
        await api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter(note => note._id !== id)); //remove matching id of the deleted from display
        toast.success("Note Deleted Successfully");
    } catch(error) {
        console.log("Error Deleting Note!");
        toast.error("Note Deletion Unsuccessful!");
    }
  };

  return (
    <Link to={`/notes/${note._id}`}>
      <div className="bg-blue-500/20 border-blue-500 border-t-4 rounded-[20px] p-4">
        <div className="text-white text-xl font-bold">{note.title}</div>
        <div className="text-gray-300">{note.content}</div>
        <div className="text-gray-300 text-sm gap-2 flex items-center justify-between">
          {note.updatedAt !== note.createdAt
            ? dateFormat(new Date(note.updatedAt))
            : dateFormat(new Date(note.createdAt))}
          <div className="flex items-center gap-2">
            <button className="rounded-[10px] hover:bg-blue-500/20 p-2">
              <FilePen className="text-white" />
            </button>
            <button
              className="rounded-[10px] hover:bg-blue-500/40 p-2"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2 className="text-white" />
            </button>
          </div>
        </div>
        <div className="text-gray-600 text-[10px] text-right">
          Note Id: {note._id}
        </div>
      </div>
    </Link>
  );
}
