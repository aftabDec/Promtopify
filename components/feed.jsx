"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";



export const PromptCardList = ({ data }) => {
  return (
    <div className="mt-8 grid grid-cols-1  sm:grid-cols-2 gap-6">
      {data.map((post) => (
        <PromptCard post={post} key={post._id} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch("/api/prompt");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };
    fetchPrompt();
  }, []);

  return (
    <section className="p-6">
      <form className="mb-6">
        <input
          type="text"
          onChange={handleSearchChange}
          value={searchText}
          placeholder="Search for a user"
          className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
