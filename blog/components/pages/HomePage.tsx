import HeroSection from "@/components/ui/HeroSection";
import ArticleList from "@/components/blog/ArticleList";
import Sidebar from "@/components/layout/Sidebar";

export default function HomePage() {
  return (
    <main className='flex-1 container mx-auto px-4 py-8'>
      <HeroSection />
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        <ArticleList />
        <Sidebar />
      </div>
    </main>
  );
}
