import React from "react";

const Form = ({ handleSubmit, submitting, post, type, setPost }) => {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col bg-black p-4 rounded-lg shadow-lg sm:px-8 sm:py-10">
      <h1 className="head_text text-left text-white text-2xl sm:text-3xl font-bold mb-2">
        {type}
        <span className="text-indigo-500"> Post</span>
      </h1>
      <p className="desc text-left max-w-md text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 bg-gray-900 p-4 sm:p-6 rounded-lg"
      >
        <label>
          <span className="font-satoshi font-semibold text-gray-300 text-sm sm:text-base">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            className="w-full mt-2 p-3 bg-gray-800 text-white rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-gray-300 text-sm sm:text-base">
            Tag
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="w-full mt-2 p-3 bg-gray-800 text-white rounded-lg resize-none h-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 text-sm sm:text-base"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default Form;
