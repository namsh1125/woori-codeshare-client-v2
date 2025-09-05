"use client";

import { createContext, useContext, ReactNode } from "react";

interface EditorContextType {
  liveCode: string;
  snapshotCode: string;
  displayCode: string;
  isReadOnly: boolean;
  isDisabled: boolean;
  onCodeChange: (newCode: string) => void;
  onCreateSnapshot: (data: { title: string; description: string }) => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ 
  children,
  liveCode,
  snapshotCode,
  displayCode,
  isReadOnly,
  isDisabled,
  onCodeChange,
  onCreateSnapshot
}: { 
  children: ReactNode;
  liveCode: string;
  snapshotCode: string;
  displayCode: string;
  isReadOnly: boolean;
  isDisabled: boolean;
  onCodeChange: (newCode: string) => void;
  onCreateSnapshot: (data: { title: string; description: string }) => Promise<void>;
}) {
  const value: EditorContextType = {
    liveCode,
    snapshotCode,
    displayCode,
    isReadOnly,
    isDisabled,
    onCodeChange,
    onCreateSnapshot,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}