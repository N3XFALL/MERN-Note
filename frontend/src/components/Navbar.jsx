import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export function Navbar(props) {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 border-b-2 border-gray-700/80">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">MERN Note</h1>
          {props.mode === "AddNote" && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[20px] inline-flex"
              onClick={() => navigate("/create")}
            >
              <Plus className="mr-2" />
              Add Note
            </button>
          )}
          {props.mode === "GoBack" && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[20px] inline-flex"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2" />
              Go Back
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
