// components/ClientCounter.tsx
"use client";
import { useState } from "react";

export default function ClientCounter({ label }: { label: string }) {
  const [n, setN] = useState(0);
  return (
    <button className='px-3 py-2 border rounded' onClick={() => setN(n + 1)}>
      {label}: {n}
    </button>
  );
}
