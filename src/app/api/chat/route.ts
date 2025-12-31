import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = groq('llama3-8b-8192');

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    messages,
  });

  return result.toDataStreamResponse();
}
