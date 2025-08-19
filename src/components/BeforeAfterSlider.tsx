// components/BeforeAfterSlider.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  session?: Session | null;
  locked?: boolean;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  session,
  locked = false,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const isLoggedIn = !!session?.user?.name;
  const isLocked = locked && !isLoggedIn;

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
    if (e.buttons !== 1 || isLocked) return;
    onMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (isLocked) return;
    onMove(e.touches[0].clientX);
  };

  function handleLoginClick() {
    sessionStorage.setItem("lastVisited", pathname);
    router.push("/login");
  }

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
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 text-white font-semibold text-lg text-center px-4">
          Log in as a guest user to try this tool
          <button
            onClick={handleLoginClick}
            className="mt-4 inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Login / Register
          </button>
        </div>
      )}

      <img
        src={afterSrc}
        alt="After"
        className="absolute top-0 left-0 w-full h-full object-contain"
        draggable={false}
      />

      <img
        src={beforeSrc}
        alt="Before"
        className="absolute top-0 left-0 w-full h-full object-contain"
        draggable={false}
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      />

      {!isLocked && (
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
      )}
    </div>
  );
}
