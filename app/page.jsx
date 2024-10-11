import React from "react";
import Feed from "@/components/feed";

const Home = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center py-16 bg-black">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-200 text-center">
        Discover & share
      </h1>
      <br className="max-md:hidden" />
      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 bg-clip-text text-transparent mt-2 text-center">
        AI-Powered Prompts
      </span>
      <p className="mt-6 text-lg sm:text-xl text-gray-400 text-center max-w-2xl">
        Promptify is an open-source AI prompting tool for the modern world to
        discover and share creative prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
