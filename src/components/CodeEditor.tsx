"use client";

import TechnicalBorder from "./TechnicalBorder";

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
        <div className="h-[600px]">
            <TechnicalBorder
                title={`Input Code :: ${language}`}
                headerContent={
                    <button
                        onClick={() => onChange("")}
                        className="text-[10px] font-mono text-[#666] hover:text-white transition-colors"
                    >
                        [ CLEAR_BUFFER ]
                    </button>
                }
            >
                <div className="flex flex-col h-full bg-black">
                    <div className="flex-1 relative">
                        <textarea
                            value={code}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={`// Paste your ${language} code here...`}
                            className="absolute inset-0 w-full h-full bg-transparent text-[#eee] font-mono text-sm p-4 resize-none focus:outline-none placeholder:text-[#333] selection:bg-white selection:text-black"
                            spellCheck={false}
                        />
                    </div>

                    {/* Footer Info */}
                    <div className="px-4 py-2 border-t border-[#222] bg-[#0a0a0a] flex items-center justify-between text-[10px] font-mono text-[#444]">
                        <span>LOC: {code.split("\n").length}</span>
                        <span>CHAR: {code.length}</span>
                    </div>
                </div>
            </TechnicalBorder>
        </div>
    );
}
