import React from 'react';
import { Hero } from '../components/sections/Hero';
import { Problems } from '../components/sections/Problems';
import { Features } from '../components/sections/Features';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Safety } from '../components/sections/Safety';
import { CTA } from '../components/sections/CTA';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Problems />
      <Features />
      <HowItWorks />
      <Safety />
      <CTA />
    </div>
  );
};