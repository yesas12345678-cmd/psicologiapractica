"use client";

import React, { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
  priority?: boolean;
}

export default function Avatar({ src, alt, size, priority = false }: AvatarProps) {
  const [error, setError] = useState(false);

  const initials = alt
    .replace("Dr. ", "")
    .replace("Dra. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (error || !src) {
    return (
      <div
        className="rounded-full bg-teal-50 border border-teal-150 flex items-center justify-center text-teal-800 font-black uppercase select-none"
        style={{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.max(10, size * 0.36)}px` }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="relative rounded-full overflow-hidden bg-slate-100 border border-slate-200"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}
