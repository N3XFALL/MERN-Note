import { Loader } from "lucide-react";

export function LoadingComponent(props) {
  return (
    <div className="bg-blue-500/5 border border-blue-500 rounded-[20px] mx-auto max-w-2xl p-6">
      <div className="flex items-center gap-6">
        <div className="bg-blue-500/15 border-blue-500 border flex justify-center items-center p-4 rounded-[50%]">
          <Loader size={40} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-blue-300 text-lg font-bold">
            {props.LoadingTitle}
          </h1>
          <p className="text-blue-300">{props.LoadingContent}</p>
        </div>
      </div>
    </div>
  );
}
