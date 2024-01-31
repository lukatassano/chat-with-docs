"use client";

import { Chat as ChatComponent } from "@ui/components/chat/chat";
import ParticlesBackground from "@ui/components/particles/ParticlesBackground";
import { Settings } from "@ui/components/settings/settings";
import { Toaster } from "@ui/components/ui/toaster";

export default function Chat() {
  return (
    <ParticlesBackground>
      <div className="flex-1 flex items-center justify-center fade">
        <div className="fixed top-2 right-2 flex gap-1">
          <Settings />
        </div>
        <ChatComponent />
      </div>
      <Toaster />
    </ParticlesBackground>
  );
}
