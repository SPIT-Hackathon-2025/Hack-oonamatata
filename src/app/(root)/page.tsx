import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import FileExplorer from "./_components/FileExplorer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1800px] mx-auto p-4">
        <Header />

        <div className="grid grid-cols-[250px_1fr] gap-4">
          <FileExplorer />
          <div className="grid grid-rows-1 lg:grid-rows-2 gap-4">
            <EditorPanel />
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
