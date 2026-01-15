"use client";

import { createContext, useContext, ReactNode } from "react";
import { SnapshotData } from "@/types/editor.type";

interface EditorContextType {
  liveCode: string;
  snapshotCode: string;
  displayCode: string;
  isReadOnly: boolean;
  isDisabled: boolean;
  onCodeChangeAction: (newCode: string) => void;
  onCreateSnapshotAction: (data: SnapshotData) => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ 
  children,
  liveCode,
  snapshotCode,
  displayCode,
  isReadOnly,
  isDisabled,
  onCodeChangeAction,
  onCreateSnapshotAction
}: { 
  children: ReactNode;
  liveCode: string;
  snapshotCode: string;
  displayCode: string;
  isReadOnly: boolean;
  isDisabled: boolean;
  onCodeChangeAction: (newCode: string) => void;
  onCreateSnapshotAction: (data: SnapshotData) => Promise<void>;
}) {
  const value: EditorContextType = {
    liveCode,
    snapshotCode,
    displayCode,
    isReadOnly,
    isDisabled,
    onCodeChangeAction,
    onCreateSnapshotAction,
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