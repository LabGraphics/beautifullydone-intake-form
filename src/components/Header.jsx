import React from 'react';

export default function Header() {
  return (
    <div className="bd-header">
      <div className="bd-header-inner">
        <img 
          src="/logo.png" 
          alt="Beautifully Done Logo" 
          className="bd-logo"
        />
        <div className="bd-title-group">
          <h1 className="bd-title">BEAUTIFULLY DONE</h1>
          <p className="bd-tagline">Making every occasion memorable</p>
        </div>
      </div>
    </div>
  );
}
