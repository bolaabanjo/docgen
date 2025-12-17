"use client";

import { useState } from "react";

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
        <div className="flex flex-col h-[600px] rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <svg
                        className="w-5 h-5 text-violet-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span className="text-sm text-slate-400">Generated Documentation</span>
                </div>
                {content && (
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded bg-slate-700/50 hover:bg-slate-700"
                    >
                        {copied ? (
                            <>
                                <svg
                                    className="w-4 h-4 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4">
                {isLoading && !content ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        </div>
                        <p className="text-slate-400 text-sm">Generating documentation...</p>
                    </div>
                ) : content ? (
                    <div className="prose prose-invert prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300 leading-relaxed">
                            {content}
                        </pre>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                            <svg
                                className="w-8 h-8 text-slate-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Paste your code and click &quot;Generate Docs&quot;
                        </p>
                        <p className="text-slate-600 text-xs mt-2">
                            Documentation will appear here in real-time
                        </p>
                    </div>
                )}
            </div>

            {/* Footer */}
            {content && (
                <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-700/50">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{content.split("\n").length} lines</span>
                        <span className="flex items-center gap-1">
                            {isLoading && (
                                <span className="inline-block w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                            )}
                            {isLoading ? "Streaming..." : "Complete"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
