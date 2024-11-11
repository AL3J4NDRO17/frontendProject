// src/components/AdminLayout.js
import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import '../../styles/admin/adminLayout.css';  // Asegúrate de que esté bien enlazado

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />  {/* Sidebar que estará siempre visible */}
      <div className="main-content">
        <Outlet />  {/* Aquí se renderizarán las rutas de administración */}
      </div>
    </div>
  );
};

export default AdminLayout;