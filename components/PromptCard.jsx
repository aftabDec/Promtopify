import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const PromptCard = ({ post, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState(false);
  const { data: session } = useSession();
  const pathName = usePathname();
  const user = session?.user;

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt).then(() => {
      setCopy(true);
      setTimeout(() => setCopy(false), 1500);
    });
  };

  return (
    <div className="relative bg-gray-900 text-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Copy Button */}
      <button
        className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full hover:bg-indigo-600 transition-colors duration-200"
        onClick={handleCopy}
      >
        {copy ? "Copied!" : "Copy"}
      </button>

      {/* Creator Info */}
      <div className="flex items-center mb-5">
        {post.creator?.image ? (
          <Image
            src={post.creator.image}
            alt="Creator"
            width={50}
            height={50}
            className="rounded-full border-2 border-indigo-500"
          />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-700 text-white font-semibold">
            {post.creator?.username?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div className="ml-4">
          <p className="text-lg font-bold">
            {post.creator?.username || "Unknown"}
          </p>
          <p className="text-sm text-indigo-400">
            {post.creator?.email || "No email provided"}
          </p>
        </div>
      </div>

      {/* Prompt and Tag */}
      <p className="mb-4 text-start text-lg leading-relaxed text-gray-300">
        {post.prompt}
      </p>
      <p className="text-sm text-start text-indigo-400 font-medium mb-4">
        #{post.tag}
      </p>

      {/* Edit/Delete Actions */}
      {session && user?.id === post.creator?._id && pathName === "/profile" && (
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={() => handleEdit(post)}
            className="bg-transparent border border-indigo-500 text-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition-all duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(post)}
            className="bg-transparent border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
