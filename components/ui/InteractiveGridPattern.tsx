"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [rects, setRects] = useState<{ x: number; y: number; index: number }[]>([]);

  useEffect(() => {
    const newRects = [];
    for (let i = 0; i < horizontal * vertical; i++) {
        newRects.push({
            x: (i % horizontal) * width,
            y: Math.floor(i / horizontal) * height,
            index: i
        });
    }
    setRects(newRects);
  }, [horizontal, vertical, width, height]);

  return (
    <svg
      width="100%"
      height="100%"
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    >
      {rects.map((rect) => (
        <rect
          key={rect.index}
          x={rect.x}
          y={rect.y}
          width={width}
          height={height}
          className={cn(
            "stroke-gray-400/10 transition-all duration-300 ease-in-out [&:not(:hover)]:duration-1000",
            hoveredSquare === rect.index ? "fill-yellow-400/20" : "fill-transparent",
            squaresClassName
          )}
          onMouseEnter={() => setHoveredSquare(rect.index)}
          onMouseLeave={() => setHoveredSquare(null)}
        />
      ))}
    </svg>
  );
}
