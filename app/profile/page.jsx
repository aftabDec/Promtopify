// MyProfile.js
"use client";
import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [Mypost, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/user/${session.user.id}/post`);
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      }
    };

    fetchData();
  }, [session]);

  const handleDelete = async (post) => {
    const hasConfirm = confirm("are you sure you wanna delete this post?");
    if (hasConfirm) {
      const response = await fetch(`/api/prompt/${post._id.toString()}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const filteredPost = Mypost.filter((p) => p._id !== post.id);
        setPost(filteredPost);
      } else {
        console.error("Failed to delete post");
      }
    }
  };

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);

    // Handle edit logic here
    console.log("Editing post:", post);
  };

  if (!session) return <p>Loading...</p>;

  return (
    <Profile
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      desc="Welcome to your personalized profile page"
      data={Mypost}
      name="My"
    />
  );
};

export default MyProfile;
