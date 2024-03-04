import React, { useState } from 'react';
import './homepage.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const showSidebar = () => {
    setIsOpen(true);
  };

  const sidebarClass = isOpen ? 'sidebar' : 'sidebar hidden';

  return (
    <div>
      <nav>
        <ul className={sidebarClass}>
          <li onClick={closeSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </li>
          <li>MedInsight</li>
          <li>About Us</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
        <ul>
          <li>MedInsight</li>
          <li className="hide">About Us</li>
          <li className="hide">Services</li>
          <li className="hide">Contact</li>
          <li className="menu-button" onClick={showSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
