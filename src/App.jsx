import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';

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

  const hideProgressBar = path.includes('summary') || path.includes('confirmation');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 py-6 md:py-10 w-full overflow-x-hidden">
        {!hideProgressBar && (
          <div className="w-full max-w-[600px] mb-4">
            <ProgressBar currentStep={currentStep} />
          </div>
        )}
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
