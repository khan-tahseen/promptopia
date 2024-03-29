import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();

    return new Response(
      JSON.stringify(newPrompt, {
        status: 201, // Created
      })
    );
  } catch (error) {
    console.log(error);
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
