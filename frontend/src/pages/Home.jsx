import React, { useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import Category from '../components/Category';
import BestSeller from '../components/BestSeller';
import Bottombanner from '../components/Bottombanner';
import NewsBox from '../components/NewsBox';

const Home = () =>{
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    setIsLoaded(true);
    
    // Intersection Observer for smooth animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getSectionClass = (sectionId) => {
    const baseClass = "transition-all duration-1000 ease-out";
    const visibleClass = visibleSections.has(sectionId) 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-8";
    return `${baseClass} ${visibleClass}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-96 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Main Content */}
      <main className={`relative z-10 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
        {/* Hero Section */}
        <section 
          id="hero-section"
          data-section
          className={`${getSectionClass('hero-section')} relative`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
          <MainBanner />
        </section>

        {/* Category Section */}
        <section 
          id="category-section"
          data-section
          className={`${getSectionClass('category-section')} py-16 relative`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
                <span className="text-2xl">🏷️</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-orange-500 bg-clip-text mb-4">
                Shop by Category
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-300 to-orange-500 mx-auto rounded-full"></div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
            <Category />
          </div>
        </section>

        {/* Best Seller Section */}
        <section 
          id="bestseller-section"
          data-section
          className={`${getSectionClass('bestseller-section')} py-10 relative`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-emerald-100 rounded-full mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-800 via-green-800 to-teal-800 bg-clip-text text-transparent mb-4">
                Best Sellers
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
                Discover our most loved products, handpicked by customers worldwide
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/20 via-transparent to-emerald-50/20"></div>
            <BestSeller />
          </div>
        </section>

        {/* Promotional Banner Section */}
          <Bottombanner />

        {/* Newsletter Section */}
        <section 
          id="newsletter-section"
          data-section
          className={`${getSectionClass('newsletter-section')} py-10 relative`}
        >
          <div className="container mx-auto  px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-6">
                Get the latest updates on new products, exclusive offers, and special deals
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <div className='flex justify-center'>
              <NewsBox />
            </div>
          </div>
        </section>
      </main>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        /* Parallax effect for background decorations */
        @media (prefers-reduced-motion: no-preference) {
          .fixed {
            transform: translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Home;