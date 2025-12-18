"use client";

import React from "react";

interface TechnicalBorderProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    headerContent?: React.ReactNode;
}

export default function TechnicalBorder({
    title,
    children,
    className = "",
    headerContent,
}: TechnicalBorderProps) {
    return (
        <div className={`flex flex-col h-full bg-black border border-[#222] overflow-hidden ${className}`}>
            {(title || headerContent) && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#222] bg-[#0a0a0a]">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-white opacity-20" />
                            <div className="w-1.5 h-1.5 bg-white opacity-20" />
                            <div className="w-1.5 h-1.5 bg-white opacity-20" />
                        </div>
                        {title && (
                            <span className="text-[11px] font-mono tracking-widest text-[#666] uppercase">
                                {title}
                            </span>
                        )}
                    </div>
                    {headerContent}
                </div>
            )}
            <div className="flex-1 relative overflow-hidden backdrop-blur-3xl">
                {children}
            </div>
        </div>
    );
}
