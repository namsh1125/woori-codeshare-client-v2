"use client";

import { createContext, useContext, ReactNode } from "react";
import { RoomInfo } from "@/utils/roomStorage";

interface RoomContextType {
  roomInfo: RoomInfo | null;
  isAuthorized: boolean;
  roomId: string | number | undefined;
  roomUuid: string | undefined;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ 
  children, 
  roomInfo,
  isAuthorized 
}: { 
  children: ReactNode; 
  roomInfo: RoomInfo | null;
  isAuthorized: boolean;
}) {
  const value: RoomContextType = {
    roomInfo,
    isAuthorized,
    roomId: roomInfo?.roomId,
    roomUuid: roomInfo?.uuid,
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}