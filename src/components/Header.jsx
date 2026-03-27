import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-[#0D1B2A] shadow-md z-10 py-5 px-4 md:py-8">
      <div className="flex flex-col md:flex-row md:justify-between items-center text-center max-w-[900px] mx-auto w-full">
        <h1 className="text-[#E8A6B8] text-xl sm:text-2xl md:text-3xl m-0 tracking-wide leading-tight" style={{ color: '#E8A6B8' }}>Beautifully Done</h1>
        <p className="text-white font-serif italic m-0 text-lg sm:text-xl opacity-90 mt-2 md:mt-0 md:ml-4">Making every occasion memorable</p>
      </div>
    </header>
  );
}
