"use client";

import { useState } from "react";
import Greeting from "@/components/Greeting";
import ConditionalRenderPage from "@/components/ConditionalRenderPage";
import ProductListPage from "@/components/ProductListPage";

import EffectDemoPage from "@/components/EffectDemoPage";

import CompositionPage from "@/components/CompositionPage";

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>你点击了{count}次</p>
      <button className='bg-red-500 text-white p-2 rounded-md' onClick={() => setCount(count + 1)}>
        点我
      </button>

      <Greeting name='世界' />
      <Greeting name='Next.js' />

      <ConditionalRenderPage />

      <ProductListPage />

      <EffectDemoPage />

      <CompositionPage />
    </div>
  );
}
