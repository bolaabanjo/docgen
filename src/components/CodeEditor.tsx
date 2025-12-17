"use client";

interface CodeEditorProps {
    code: string;
    onChange: (code: string) => void;
    language: string;
}

export default function CodeEditor({
    code,
    onChange,
    language,
}: CodeEditorProps) {
    return (
        <div className="flex flex-col h-[600px] rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm text-slate-400 ml-2">
                        Input Code ({language})
                    </span>
                </div>
                <button
                    onClick={() => onChange("")}
                    className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                    Clear
                </button>
            </div>

            {/* Editor */}
            <div className="flex-1 relative">
                <textarea
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={`Paste your ${language} code here...

Example:
function greet(name) {
  return \`Hello, \${name}!\`;
}

class Calculator {
  add(a, b) {
    return a + b;
  }
}`}
                    className="absolute inset-0 w-full h-full bg-transparent text-slate-100 font-mono text-sm p-4 resize-none focus:outline-none placeholder:text-slate-600"
                    spellCheck={false}
                />
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-700/50">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{code.split("\n").length} lines</span>
                    <span>{code.length} characters</span>
                </div>
            </div>
        </div>
    );
}
