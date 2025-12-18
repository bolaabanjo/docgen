"use client";

import { useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import CodeEditor from "@/components/CodeEditor";
import DocumentationPreview from "@/components/DocumentationPreview";

const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "c",
  "cpp",
  "csharp",
  "php",
  "ruby",
  "swift",
  "kotlin",
];

const DOC_STYLES = [
  { value: "jsdoc", label: "JSDoc" },
  { value: "docstring", label: "Python Docstring" },
  { value: "javadoc", label: "Javadoc" },
  { value: "markdown", label: "Markdown README" },
  { value: "api", label: "API Reference" },
];

export default function Home() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [docStyle, setDocStyle] = useState("jsdoc");

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/generate",
    streamProtocol: "text",
  });

  const handleGenerate = async () => {
    if (!code.trim()) return;
    await complete("", {
      body: { code, language, docStyle },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Header */}
      <header className="border-b border-[#222] bg-[#050505] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black" />
              </div>
              <div>
                <h1 className="text-sm font-mono tracking-[0.3em] uppercase font-bold">
                  DocGen_AI
                </h1>
                <p className="text-[10px] font-mono text-[#666] uppercase tracking-wider mt-0.5">
                  Automated_Technical_Reference_System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-1 font-mono text-[10px] text-[#444]">
                <span className="w-2 h-2 bg-white/20" />
                <span>SYSTEM_READY</span>
              </div>
              <a
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono text-[#666] hover:text-white transition-colors uppercase tracking-widest border border-[#222] px-3 py-1 bg-black"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Controls Bar */}
        <div className="mb-10 p-6 border border-[#222] bg-[#050505] flex flex-wrap items-end gap-8">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-mono text-[#666] uppercase tracking-widest mb-3">
              Source_Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-black border border-[#222] px-4 py-2 text-sm font-mono focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-mono text-[#666] uppercase tracking-widest mb-3">
              Output_Style
            </label>
            <select
              value={docStyle}
              onChange={(e) => setDocStyle(e.target.value)}
              className="w-full bg-black border border-[#222] px-4 py-2 text-sm font-mono focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              {DOC_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !code.trim()}
              className="h-10 px-8 bg-white text-black font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-[#ccc] disabled:bg-[#222] disabled:text-[#444] transition-colors flex items-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-black" />
                  Generate Documentation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 border border-white bg-white text-black font-mono text-xs uppercase tracking-wider flex items-center gap-4">
            <div className="w-4 h-4 flex items-center justify-center font-bold">!</div>
            <div>
              <p className="font-bold">System_Error :: Interaction_Failed</p>
              <p className="mt-1 opacity-70">{error.message}</p>
            </div>
          </div>
        )}

        {/* Editor and Preview Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <CodeEditor code={code} onChange={setCode} language={language} />
          <DocumentationPreview content={completion} isLoading={isLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#222] mt-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4 opacity-40">
              <div className="w-6 h-6 border border-white" />
              <span className="text-[10px] font-mono tracking-widest uppercase">
                DocGen // v1.0.0
              </span>
            </div>
            <div className="flex gap-10">
              <a
                href="https://ai.google.dev/"
                className="text-[10px] font-mono text-[#666] hover:text-white uppercase tracking-widest transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gemini_Engine
              </a>
              <a
                href="https://sdk.vercel.ai/"
                className="text-[10px] font-mono text-[#666] hover:text-white uppercase tracking-widest transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                AI_SDK_Core
              </a>
              <a
                href="https://github.com/bolaabanjo/docgen"
                className="text-[10px] font-mono text-[#666] hover:text-white uppercase tracking-widest transition-colors font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source_Code
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#111] text-center">
            <p className="text-[9px] font-mono text-[#333] tracking-[0.4em] uppercase">
              Purely Technical // Strictly Monochrome // Absolutely Functional
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
