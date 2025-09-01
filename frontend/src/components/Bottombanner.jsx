import React, { useState, useEffect, useRef } from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedFeatures, setAnimatedFeatures] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate features one by one
          features.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedFeatures(prev => new Set([...prev, index]));
            }, 200 + index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className='relative mt-24 overflow-hidden group'>
      {/* Background Images with Enhanced Effects */}
      <div className='relative border-none rounded-2xl'>
        <img 
          src={assets.bottom_banner_image} 
          alt="banner" 
          className='w-full hidden md:block object-cover transition-transform duration-700 group-hover:scale-105' 
        />
        <img 
          src={assets.bottom_banner_image_sm} 
          alt="banner" 
          className='w-full md:hidden object-cover transition-transform duration-700 group-hover:scale-105' 
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-blue-800/50 md:from-transparent md:via-blue-900/20 md:to-blue-800/60 rounded-2xl'></div>
        
        {/* Decorative Elements */}
        <div className='absolute top-10 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse hidden md:block'></div>
        <div className='absolute bottom-10 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse hidden md:block'></div>
      </div>

      {/* Content Container */}
      <div className='absolute inset-1 flex flex-col items-center md:items-end md:justify-center pt-12 md:pt-0 md:pr-10 lg:pr-20 xl:pr-24 px-6'>
        <div className={`max-w-lg transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Enhanced Header */}
          <div className='text-center md:text-left mb-8'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-1 text-black'>
                Why Choose Us?
              </h1>
            
            <p className='text-white/90 md:text-gray-700 text-base md:text-md leading-relaxed drop-shadow-lg'>
              Discover what makes us the preferred choice for thousands of satisfied customers
            </p>
          </div>

          {/* Enhanced Features List */}
          <div className='space-y-3'>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group/item flex items-center gap-4 p-1 rounded-2xl backdrop-blur-sm 
                  bg-white/10 md:bg-white/90 border border-white/20 md:border-gray-200
                  hover:shadow-xl hover:bg-white/20 md:hover:bg-white hover:scale-[1.02] 
                  transition-all duration-500 transform ${
                    animatedFeatures.has(index) 
                      ? 'translate-x-0 opacity-100' 
                      : 'translate-x-8 md:-translate-x-8 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Enhanced Icon Container */}
                <div className='relative flex-shrink-0'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 
                    rounded-full blur-lg scale-150 opacity-0 group-hover/item:opacity-100 
                    transition-opacity duration-300'></div>
                  <div className='relative w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-100 to-cyan-100 
                    rounded-2xl flex items-center justify-center shadow-lg group-hover/item:scale-110 
                    transition-transform duration-300'>
                    <img 
                      src={feature.icon} 
                      alt={feature.title} 
                      className='w-5 h-5 md:w-6 md:h-6 filter group-hover/item:brightness-110
                        transition-all duration-300'
                    />
                  </div>
                </div>
                
                {/* Enhanced Content */}
                <div className='flex-1 min-w-0'>
                  <h3 className='text-lg md:text-md font-bold text-white md:text-gray-800 
                    group-hover/item:text-orange-600 md:group-hover/item:text-orange-600 
                    transition-colors duration-300 drop-shadow-sm md:drop-shadow-none'>
                    {feature.title}
                  </h3>
                  <p className='text-white/80 md:text-gray-600 text-sm md:text-sm leading-relaxed 
                    drop-shadow-sm md:drop-shadow-none'>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BottomBanner