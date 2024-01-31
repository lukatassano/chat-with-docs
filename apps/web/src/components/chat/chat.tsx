"use client";

import {
  promptAtom,
  similarityAtom,
  temperatureAtom,
} from "@ui/contexts/chat-settings";
import { useChat } from "ai/react";
import { useAtomValue } from "jotai/react";
import { useEffect, useRef } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Message } from "./message";

export function Chat() {
  const scrollElementRef = useRef<HTMLDivElement | null>(null);
  const prompt = useAtomValue(promptAtom);
  const temperature = useAtomValue(temperatureAtom);
  const similarity = useAtomValue(similarityAtom);

  const body = {
    prompt,
    temperature,
    similarity,
  };

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "http://localhost:3000/api/chat",
      body,
      headers: { "Content-Type": "application/json" },
    });

  useEffect(() => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollTop =
        scrollElementRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-screen w-[50%] flex flex-col">
      <div
        className="flex-1 space-y-2 overflow-auto p-4"
        ref={scrollElementRef}
      >
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <footer className="p-6">
        <form className="flex flex-1 space-x-2" onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="Faça uma pergunta"
            value={input}
            onChange={handleInputChange}
          />
          <Button type="submit" disabled={isLoading}>
            Enviar
          </Button>
        </form>
      </footer>
    </div>
  );
}
