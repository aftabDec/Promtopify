// MyProfile.js
"use client";
import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const PromptIdFetcher = ({ onPromptIdFetched }) => {
  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");

  useEffect(() => {
    if (promptId) {
      onPromptIdFetched(promptId);
    }
  }, [promptId, onPromptIdFetched]);

  return null; // This component does not render anything itself
};

const EditPrompt = () => {
  const router = useRouter();
  const [promptId, setPromptId] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          console.error("Failed to fetch prompt details");
          return;
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error(
          "An error occurred while fetching prompt details:",
          error
        );
      }
    };
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading prompt...</div>}>
      <PromptIdFetcher onPromptIdFetched={setPromptId} />
      {promptId && (
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
        />
      )}
    </Suspense>
  );
};

export default EditPrompt;
