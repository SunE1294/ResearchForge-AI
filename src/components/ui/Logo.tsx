import React from "react";

interface LogoProps {
  className?: string;
  size?: number | "sm" | "md" | "lg";
  showText?: boolean;
  textClassName?: string;
}

export function Logo({
  className = "",
  size = "md",
  showText = false,
  textClassName = "",
}: LogoProps) {
  const pixelSize =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 28
      : size === "lg"
      ? 48
      : 36;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* High-Precision SVG Brand Mark */}
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="ResearchForge AI Logo"
      >
        <defs>
          {/* Deep Navy to Ocean Blue Gradient */}
          <linearGradient id="rfBookGradient" x1="4" y1="12" x2="44" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Electric Cyan to Blue Flame / AI Spark Gradient */}
          <linearGradient id="rfSparkGradient" x1="16" y1="4" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          {/* Inner Glow / Highlights */}
          <linearGradient id="rfPageGlow" x1="24" y1="14" x2="24" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
          </linearGradient>

          <filter id="rfGlowFilter" x="12" y="2" width="24" height="24" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Plate & Shadow Shield */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          className="fill-slate-900/5 dark:fill-white/5 stroke-slate-200/80 dark:stroke-slate-800/80"
          strokeWidth="1"
        />

        {/* Open Book Wings (Left & Right folios) */}
        {/* Left Page Folio */}
        <path
          d="M24 38C19 35 10 35 6 37.5V17C10 14.5 19 14.5 24 17.5V38Z"
          fill="url(#rfBookGradient)"
          className="opacity-95"
        />
        <path
          d="M24 38C19 35 10 35 6 37.5V17C10 14.5 19 14.5 24 17.5"
          fill="url(#rfPageGlow)"
        />

        {/* Right Page Folio */}
        <path
          d="M24 38C29 35 38 35 42 37.5V17C38 14.5 29 14.5 24 17.5V38Z"
          fill="url(#rfBookGradient)"
          className="opacity-95"
        />
        <path
          d="M24 38C29 35 38 35 42 37.5V17C38 14.5 29 14.5 24 17.5"
          fill="url(#rfPageGlow)"
        />

        {/* Book Spine Center Seam */}
        <path
          d="M24 16.5V39.5"
          stroke="#0f172a"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="dark:stroke-slate-950"
        />

        {/* Neural Network Circuit Lines on Folios */}
        {/* Left Neural Pathways */}
        <path
          d="M10 24H15L18 28H21"
          stroke="#7dd3fc"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.5 1.5"
          className="opacity-80"
        />
        <circle cx="10" cy="24" r="1.5" fill="#38bdf8" />
        <circle cx="18" cy="28" r="1.25" fill="#bae6fd" />

        {/* Right Neural Pathways */}
        <path
          d="M38 24H33L30 28H27"
          stroke="#7dd3fc"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1.5 1.5"
          className="opacity-80"
        />
        <circle cx="38" cy="24" r="1.5" fill="#38bdf8" />
        <circle cx="30" cy="28" r="1.25" fill="#bae6fd" />

        {/* Central Forge AI Spark / Diamond Star */}
        <path
          d="M24 4.5C25.5 10 28 12.5 33.5 14C28 15.5 25.5 18 24 23.5C22.5 18 20 15.5 14.5 14C20 12.5 22.5 10 24 4.5Z"
          fill="url(#rfSparkGradient)"
          filter="url(#rfGlowFilter)"
        />

        {/* Spark Core Nucleus */}
        <circle cx="24" cy="14" r="2.2" fill="#ffffff" />
        <circle cx="24" cy="14" r="1" fill="#38bdf8" />

        {/* Satellite Synapse Sparks */}
        <circle cx="32.5" cy="7.5" r="1.2" fill="#38bdf8" className="animate-pulse" />
        <circle cx="15.5" cy="8.5" r="1" fill="#67e8f9" className="animate-pulse" />
      </svg>

      {/* Optional Embedded Wordmark */}
      {showText && (
        <div className={`flex flex-col ${textClassName}`}>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-slate-200 dark:to-cyan-200 bg-clip-text text-transparent">
            ResearchForge<span className="text-indigo-600 dark:text-cyan-400">AI</span>
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
            Academic Co-Pilot
          </span>
        </div>
      )}
    </div>
  );
}
