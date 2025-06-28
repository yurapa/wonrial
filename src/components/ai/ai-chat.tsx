'use client';

import { useChat } from 'ai/react';
import { AiChatButton } from '@/components/ai';

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp shadow-three dark:bg-gray-dark mb-12 rounded-sm bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              {isLoading && (
                <h2 className="mb-3 text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl dark:text-white">
                  Loading...
                </h2>
              )}

              <div className="text-body-color mb-12 text-base font-medium dark:text-white">
                {messages.map((m) => (
                  <div key={m.id} className="mb-6 whitespace-pre-wrap">
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                    {m.content}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                  <textarea
                    rows={1}
                    placeholder="Ask a question..."
                    value={input}
                    disabled={isLoading}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                    className="border-stroke text-body-color focus:border-primary dark:text-body-color-dark dark:shadow-two dark:focus:border-primary mr-4 w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base outline-none dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                  />
                  <AiChatButton />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
