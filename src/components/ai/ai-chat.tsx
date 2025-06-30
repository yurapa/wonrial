'use client';

import { useChat } from 'ai/react';

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id} className="mb-6 whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      {isLoading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Ask a question..."
          disabled={isLoading}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
