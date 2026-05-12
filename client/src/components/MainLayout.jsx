import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-cyber">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* We keep the Navbar if you want a top bar too, or remove it */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
