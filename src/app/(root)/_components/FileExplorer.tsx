"use client";

import { useState } from "react";
import { FolderIcon, FileIcon, PlusIcon, FolderPlusIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  content?: string;
  parentId: string | null;
}

export default function FileExplorer() {
  const [newItemName, setNewItemName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creationType, setCreationType] = useState<"file" | "folder" | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const files = useQuery(api.files.list) || [];
  const createFile = useMutation(api.files.create);

  const handleCreate = async (type: "file" | "folder") => {
    if (!newItemName.trim()) return;
    
    await createFile({
      name: newItemName,
      type,
      parentId: currentFolder,
      content: type === "file" ? "// Write your code here" : undefined,
    });

    setNewItemName("");
    setIsCreating(false);
    setCreationType(null);
  };

  const renderFileTree = (parentId: string | null = null) => {
    const items = files.filter((item) => item.parentId === parentId);

    return items.map((item) => (
      <div key={item.id} className="ml-4">
        <div className="flex items-center gap-2 p-1 hover:bg-[#1a1a1a] rounded">
          {item.type === "folder" ? (
            <FolderIcon className="h-4 w-4 text-yellow-500" />
          ) : (
            <FileIcon className="h-4 w-4 text-blue-500" />
          )}
          <span className="text-sm text-gray-300">{item.name}</span>
        </div>
        {item.type === "folder" && renderFileTree(item.id)}
      </div>
    ));
  };

  return (
    <div className="bg-[#0a0a0a]/90 backdrop-blur rounded-xl border border-green-600/40 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-white">Files</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsCreating(true);
              setCreationType("file");
            }}
            className="p-1 hover:bg-[#1a1a1a] rounded"
          >
            <PlusIcon className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={() => {
              setIsCreating(true);
              setCreationType("folder");
            }}
            className="p-1 hover:bg-[#1a1a1a] rounded"
          >
            <FolderPlusIcon className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="mb-4">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={`New ${creationType}`}
            className="w-full bg-[#1a1a1a] text-gray-300 text-sm rounded-lg p-2 focus:ring-2 focus:ring-green-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && creationType) {
                handleCreate(creationType);
              }
            }}
          />
        </div>
      )}

      <div className="overflow-y-auto">{renderFileTree()}</div>
    </div>
  );
}
