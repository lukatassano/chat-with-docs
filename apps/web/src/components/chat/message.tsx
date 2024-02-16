"use client";

import { Message as MessageType } from "ai/react";
import { useMemo } from "react";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Markdown } from "./markdown";

export function Message({ message: messageObj }: { message: MessageType }) {
  const [sources, msg] = useMemo(() => {
    const [metadata, msg] =
      messageObj.role === "user"
        ? ["[]", messageObj.content]
        : messageObj.content.split("-==-");
    const sourceArray = JSON.parse(metadata || "[]") as string[];

    return [sourceArray, msg];
  }, [messageObj]);

  return (
    <TooltipProvider>
      <div className="flex space-x-2" key={messageObj.id}>
        <Avatar>
          {messageObj.role !== "user" ? (
            <AvatarFallback className="bg-primary	text-black">AI</AvatarFallback>
          ) : (
            <AvatarFallback>U</AvatarFallback>
          )}
        </Avatar>
        <div className="p-2 bg-zinc-800 rounded-lg">
          <Markdown message={msg} />

          {sources.length > 0 && (
            <div className="flex gap-2 mt-2 max-w-xs overflow-auto p-1">
              {sources.map((link: any) => (
                <Tooltip key={link.url}>
                  <TooltipTrigger>
                    <Badge
                      className="cursor-pointer truncate"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      <p className="text-ellipsis overflow-hidden">
                        # {link.id}
                      </p>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.title}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
