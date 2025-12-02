import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Ministries from '../components/home/Ministries';
import Features from '../components/home/Features';
import PackagesSection from '../components/home/PackagesSection';
import Process from '../components/home/Process';
import Partners from '../components/home/Partners';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';

import WhyChooseUs from '../components/home/WhyChooseUs';
import SuccessNumbers from '../components/home/SuccessNumbers';

const Home: React.FC = () => {
  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      <Hero />
      <Ministries />
      <Features />
      <PackagesSection />
      <WhyChooseUs />
      <SuccessNumbers />
      <Process />
      <Testimonials />
      <Partners />
      <Stats />
    </div>
  );
};

export default Home;