// Profile.js
import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ data, desc, handleDelete, handleEdit, name }) => {
  return (
    <section className="w-full  p-14 text-white text-center">
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          {name} Profile
        </span>
      </h1>
      <p className="mt-2 text-gray-400">{desc}</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map((post) => (
          <PromptCard
            post={post}
            key={post.id}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
