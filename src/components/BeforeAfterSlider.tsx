// components/BeforeAfterSlider.tsx
"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useState as useReactState,
} from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useReactState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = beforeSrc;
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
  }, [beforeSrc]);

  const onMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - left) / width) * 100;
    pos = Math.min(100, Math.max(0, pos));
    setSliderPos(pos);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    onMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    onMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto my-8"
      style={{
        userSelect: "none",
        touchAction: "none",
        aspectRatio: aspectRatio ?? "16 / 9",
        position: "relative",
      }}
      onMouseDown={(e) => e.preventDefault()}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-contain"
        draggable={false}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={beforeSrc}
        alt="After"
        className="absolute top-0 left-0 w-full h-full object-contain"
        draggable={false}
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          height: "100%",
          width: "4px",
          backgroundColor: "white",
          cursor: "ew-resize",
          zIndex: 10,
          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}
