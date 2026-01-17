export interface SnapshotData {
  title: string;
  description?: string;
  code?: string;
}

export interface EditorProps {
  code: string;
  isDisabled?: boolean;
  isSidebarOpen?: boolean;
  isRightPanelOpen?: boolean;
}

export interface LiveSessionEditorProps extends EditorProps {
  onCodeChangeAction: (code: string) => void;
  onCreateSnapshotAction: (snapshotData: SnapshotData) => void;
}

export interface SnapshotEditorProps extends EditorProps {
  title: string;
  description?: string;
}