import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

// GET (read)
export const GET = async (request, { params }) => {
  if (!params.id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id);

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error occurred" }), {
      status: 500,
    });
  }
};

// PATCH (update)
export const PATCH = async (request, { params }) => {
  if (!params.id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });
  }

  const { prompt, tag } = await request.json();
  if (!prompt || !tag) {
    return new Response(
      JSON.stringify({ error: "Prompt and tag are required" }),
      { status: 400 }
    );
  }

  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
      });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error occurred" }), {
      status: 500,
    });
  }
};
// delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify("Prompt deleted"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error occurred" }), {
      status: 500,
    });
  }
};
