import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';

export default function App() {
  const location = useLocation();
  const path = location.pathname;
  
  let currentStep = 1;
  if (path.includes('step2')) currentStep = 2;
  else if (path.includes('step3')) currentStep = 3;
  else if (path.includes('step4')) currentStep = 4;
  else if (path.includes('step5')) currentStep = 5;
  else if (path.includes('step6')) currentStep = 6;
  else if (path.includes('step7')) currentStep = 7;
  else if (path.includes('step8')) currentStep = 8;
  else if (path.includes('summary')) currentStep = 9;

  const hideProgressBar = path.includes('confirmation');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 py-6 md:py-10 w-full overflow-x-hidden">
        {!hideProgressBar && (
          <div className="bd-progress">
            <div className="bd-progress-top">
              <span className="bd-progress-label">Step {currentStep} of 9</span>
            </div>
            <div className="bd-progress-track">
              <motion.div 
                className="bd-progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 9) * 100}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="w-full">
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
    </div>
  );
}
