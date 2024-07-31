"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState(0);
  return <main className="w-screen h-screen flex flex-col items-center">
    {number}
    <button onClick={() => setNumber(number + 1)}>test</button>
  </main>
}
