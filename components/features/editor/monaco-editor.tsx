import Editor from "@monaco-editor/react";
import { useMemo } from "react";
import "@/styles/editor-theme.css";

interface MonacoEditorProps {
  code: string;
  language?: string;
  isReadOnly?: boolean;
  isDark?: boolean;
  onChangeAction?: (value: string | undefined) => void;
  className?: string;
}

export default function MonacoEditor({
  code,
  language = "javascript",
  isReadOnly = false,
  isDark = false,
  onChangeAction,
  className = "",
}: MonacoEditorProps) {
  const editorOptions = useMemo(
    () => ({
      readOnly: isReadOnly,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: "on" as const,
      contextmenu: false,
      lineNumbers: "on" as const,
      folding: true,
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
    }),
    [isReadOnly]
  );

  const borderClass = isDark
    ? "border-gray-800"
    : "border-gray-200";

  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={onChangeAction}
      theme={isDark ? "vs-dark" : "vs"}
      options={editorOptions}
      className={`rounded-lg border ${borderClass} shadow-sm ${className}`}
    />
  );
}