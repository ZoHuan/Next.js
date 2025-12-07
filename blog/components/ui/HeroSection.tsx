import { useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  onSearch: (searchTerm: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className='mb-12'>
      <div className='relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg'>
        <div className='absolute inset-0 opacity-20'>
          <Image src='/images/hero-background.png' alt='技术背景' width={1200} height={400} className='w-full h-full object-cover' priority />
        </div>
        <div className='relative z-10 p-8 md:p-12'>
          <h1 className='text-3xl md:text-4xl font-bold mb-4 tracking-tight'>发现技术之美</h1>
          <p className='text-lg md:text-xl mb-6 max-w-2xl opacity-90 leading-relaxed'>探索前端开发、UI设计和现代Web技术的无限可能</p>
          <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-xl mx-auto sm:mx-0'>
            <input
              type='text'
              placeholder='搜索文章...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className='px-4 py-2.5 rounded-md bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all'
            />
            <button
              onClick={handleSearch}
              className='px-4 py-2.5 bg-white text-blue-600 font-medium rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center shadow-md hover:shadow-lg'
            >
              <i className='fa-solid fa-search mr-2'></i> 搜索
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
