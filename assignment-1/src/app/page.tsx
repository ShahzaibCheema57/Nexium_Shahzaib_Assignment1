"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { quotes } from "@/data/quotes";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [matchedQuotes, setMatchedQuotes] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = quotes.find(
      (item) => item.topic.toLowerCase() === topic.toLowerCase()
    );

    if (found) {
      setMatchedQuotes(found.quotes);
    } else {
      setMatchedQuotes(["No quotes found for this topic."]);
    }
  };

  const popularTopics = quotes.map((q) => q.topic);

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-600 p-4">
      <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 max-w-2xl w-full space-y-8 border border-purple-300">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700">✨ Quote Generator ✨</h1>
        <p className="text-center text-gray-600 text-lg">
          Enter a topic to get inspiring quotes instantly!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          <Input
            type="text"
            placeholder="Type a topic e.g. life, motivation, love..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-grow border-purple-300 focus:ring-2 focus:ring-purple-200"
          />
          <Button type="submit" className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white shadow-lg">Get Quotes</Button>
        </form>

        <div className="flex flex-wrap gap-2 justify-center">
          <p className="w-full text-center text-sm text-gray-500">💡 Try these topics:</p>
          {popularTopics.map((t, index) => (
            <button
              key={index}
              className="px-3 py-1 text-sm rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50 transition"
              onClick={() => setTopic(t)}
              type="button"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {matchedQuotes.map((quote, index) => (
            <div key={index} className="bg-purple-50 border border-purple-200 p-4 rounded-xl shadow-sm text-gray-800 text-lg">
              “{quote}”
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
