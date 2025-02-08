import { create } from "zustand";

interface FileState {
  currentFile: {
    id: string;
    name: string;
    content: string;
    type: "file" | "folder";
  } | null;
  setCurrentFile: (file: FileState["currentFile"]) => void;
}

export const useFileStore = create<FileState>((set) => ({
  currentFile: null,
  setCurrentFile: (file) => set({ currentFile: file }),
}));
