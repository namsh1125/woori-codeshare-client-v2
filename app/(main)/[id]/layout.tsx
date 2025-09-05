"use client";

import { WebSocketProvider } from "@/contexts/websocket-context";

export default function RoomLayout({ children }: { children: React.ReactNode }) {
  return <WebSocketProvider>{children}</WebSocketProvider>;
}
