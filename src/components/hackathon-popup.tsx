"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function HackathonPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-white/70 transition hover:bg-black/80 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hackathon image */}
        <div className="relative w-full">
          <Image
            src="/hackathon.png"
            alt="Zynd Aickathon - AI Hackathon"
            width={600}
            height={400}
            className="w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-4 p-6">
          <h2 className="text-xl font-bold text-white">
            Zynd Aickathon Final Offline Round
          </h2>
          <p className="text-sm text-white/70">
            A 24-hour hackathon in Delhi NCR on 21–22 February focused on
            building AI agents and real-world automation.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-white/80">
            <span className="rounded-full bg-white/10 px-3 py-1">
              ₹6,00,000 Prize Pool
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              n8n Subscriptions
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1">
              Meet Founders
            </span>
          </div>

          <a
            href="https://luma.com/16oyz168"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 py-3 text-center font-semibold text-white transition hover:opacity-90"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
