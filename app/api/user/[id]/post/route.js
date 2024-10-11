import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const getUserPost = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(getUserPost), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify("Failed to get user profile details"), {
      status: 500,
    });
  }
};
