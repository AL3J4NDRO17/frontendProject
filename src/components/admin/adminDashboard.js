// src/components/Dashboard.js
import React from 'react';
import '../../styles/admin/adminDashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Panel de Administración</h1>

      <div className="dashboard__stats">
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Usuarios Activos</h3>
          <p className="dashboard__card-value">150</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Documentos Registrados</h3>
          <p className="dashboard__card-value">300</p>
        </div>
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Auditorías Pendientes</h3>
          <p className="dashboard__card-value">20</p>
        </div>
      </div>

      <div className="dashboard__activity">
        <h2 className="dashboard__activity-title">Actividad Reciente</h2>
        <table className="dashboard__table">
          <thead className="dashboard__table-head">
            <tr>
              <th className="dashboard__table-header">Usuario</th>
              <th className="dashboard__table-header">Acción</th>
              <th className="dashboard__table-header">Fecha</th>
            </tr>
          </thead>
          <tbody className="dashboard__table-body">
            <tr className="dashboard__table-row">
              <td className="dashboard__table-cell">Juan Pérez</td>
              <td className="dashboard__table-cell">Actualizó un documento</td>
              <td className="dashboard__table-cell">21/10/2024</td>
            </tr>
            <tr className="dashboard__table-row">
              <td className="dashboard__table-cell">Ana Gómez</td>
              <td className="dashboard__table-cell">Agregó un nuevo usuario</td>
              <td className="dashboard__table-cell">20/10/2024</td>
            </tr>
            <tr className="dashboard__table-row">
              <td className="dashboard__table-cell">Pedro Martínez</td>
              <td className="dashboard__table-cell">Eliminó un documento</td>
              <td className="dashboard__table-cell">19/10/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
