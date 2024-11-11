// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaHome,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaPalette,
  FaTerminal,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettingsMenu = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ul className="sidebar-menu">
        <li>
          <Link to="/adminDashboard" className="sidebar-link">
            <FaHome className="sidebar-icon" />
            {isOpen && <span>Inicio</span>}
          </Link>
        </li>
        <li>
          <Link to="/adminUsers" className="sidebar-link">
            <FaUsers className="sidebar-icon" />
            {isOpen && <span>Usuarios</span>}
          </Link>
        </li>
        <li>
          <Link to="/adminDocuments" className="sidebar-link">
            <FaFileAlt className="sidebar-icon" />
            {isOpen && <span>Documentos</span>}
          </Link>
        </li>

        {/* Ajustes con submenú */}
        <li className="sidebar-link" onClick={toggleSettingsMenu}>
          <FaCog className="sidebar-icon" />
          {isOpen && <span>Ajustes</span>}
          {isSettingsOpen && isOpen && (
            <ul className="submenu">
              <li>
                <Link to="/adminFront" className="sidebar-sublink">
                  <FaPalette className="submenu-icon" /> Config Page
                </Link>
              </li>
              <li>
                <Link to="/adminSettings" className="sidebar-sublink">
                  <FaUsers className="submenu-icon" /> Config Usuarios
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="/logs" className="sidebar-link">
            <FaTerminal className="sidebar-icon" />
            {isOpen && <span>Consola</span>}
          </Link>
        </li>
        <li className="sidebar-link logout">
          <FaSignOutAlt className="sidebar-icon" />
          {isOpen && <span>Cerrar sesión</span>}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
