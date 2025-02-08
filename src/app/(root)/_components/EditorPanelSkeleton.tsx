import { Terminal } from "lucide-react";

export function EditorPanelSkeleton() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-700/5 rounded-xl blur-2xl" />
      <div className="relative bg-[#0a0a0a]/90 backdrop-blur rounded-xl border border-green-600/40 p-6 h-[600px]">
        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-green-600/40">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-700/5" />
          <div className="h-[600px] bg-[#101010]/50 backdrop-blur-sm p-4">
            {/* Code line skeletons */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-4 bg-white/5 rounded`} />
                <div
                  className={`h-4 bg-white/5 rounded`}
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-3 flex justify-end">
          <div className={`w-40 h-6 bg-white/5 rounded-lg`} />
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative bg-[#0a0a0a] rounded-xl p-4 ring-1 ring-green-600/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#101010] ring-1 ring-green-500/20">
            <Terminal className="w-4 h-4 text-green-400/50" />
          </div>
          <div className={`w-16 h-4 bg-white/5 rounded`} />
        </div>
      </div>

      {/* Output Area Skeleton */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#101010] to-[#0f0f0f] rounded-xl -z-10" />
        <div className="relative bg-[#101010]/50 backdrop-blur-sm border border-green-600/40 rounded-xl p-4 h-[600px]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl`} />
              <div className={`w-48 h-4 mx-auto bg-white/5 rounded`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}
