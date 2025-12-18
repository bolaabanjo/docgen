"use client";

import { useState } from "react";
import TechnicalBorder from "./TechnicalBorder";

interface DocumentationPreviewProps {
    content: string;
    isLoading: boolean;
}

export default function DocumentationPreview({
    content,
    isLoading,
}: DocumentationPreviewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!content) return;
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-[600px]">
            <TechnicalBorder
                title="Output :: Documentation"
                headerContent={
                    content && (
                        <button
                            onClick={handleCopy}
                            className="text-[10px] font-mono text-[#666] hover:text-white transition-colors"
                        >
                            [ {copied ? "COPIED" : "COPY_MD"} ]
                        </button>
                    )
                }
            >
                <div className="flex flex-col h-full bg-black">
                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                        {isLoading && !content ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin" />
                                <p className="text-[#666] font-mono text-[10px] uppercase tracking-widest animate-pulse">
                                    Streaming_Data...
                                </p>
                            </div>
                        ) : content ? (
                            <div className="prose prose-invert prose-sm max-w-none">
                                <pre className="whitespace-pre-wrap font-mono text-sm text-[#eee] leading-relaxed">
                                    {content}
                                </pre>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center opacity-30 px-8">
                                <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6">
                                    <div className="w-4 h-4 bg-white/10 animate-pulse" />
                                </div>
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white">
                                    Awaiting Input
                                </p>
                                <p className="font-mono text-[9px] text-[#666] mt-4 max-w-[200px] leading-relaxed">
                                    Inject code into the left buffer to initialize documentation generation.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer Info */}
                    {content && (
                        <div className="px-4 py-2 border-t border-[#222] bg-[#0a0a0a] flex items-center justify-between text-[10px] font-mono text-[#444]">
                            <span>STATUS: {isLoading ? "STREAMING" : "COMPLETE"}</span>
                            <div className="flex items-center gap-2">
                                {isLoading && (
                                    <div className="w-1 h-1 bg-white animate-ping rounded-full" />
                                )}
                                <span>LINES: {content.split("\n").length}</span>
                            </div>
                        </div>
                    )}
                </div>
            </TechnicalBorder>
        </div>
    );
}
