import { createGroq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = groq('llama3-8b-8192');

export const maxDuration = 30;

export async function POST(req: Request) {
  // The client sends UI messages (parts-based); the model needs plain model messages.
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
