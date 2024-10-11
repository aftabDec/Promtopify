import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error); // Log any error
    return new Response(
      JSON.stringify({ error: "Failed to fetch the prompts" }),
      { status: 500 }
    );
  }
};
