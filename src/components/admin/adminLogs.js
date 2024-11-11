import React, { useEffect, useState } from 'react';
import '../../Styles/cssAdmin/adminLogs.css';

const API_URL = "https://prophysio-server2.onrender.com/api";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/collections/Logs`); // Asegúrate de que la ruta sea correcta
        const data = await response.json();

        // Verifica si la respuesta es un array antes de usar setLogs
        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error al obtener los logs:', error);
      }
    };

    fetchLogs(); // Ejecutar la función al montar el componente
  }, []);

  return (
    <div className="admin-panel-container">
      <h1>Panel de Administración - Logs</h1>

      {/* Botón para realizar acciones generales */}
      <button className="admin-panel-button" onClick={() => alert('Acción del Admin')}>
        Ejecutar Acción
      </button>

      {/* Verifica si logs es un array antes de hacer el render */}
      {logs.length > 0 ? (
        <table className="admin-log-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Mensaje</th>
              
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}> {/* Asegúrate de usar el ID correcto aquí */}
                <td>{log._id}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.message}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay logs disponibles.</p>
      )}
    </div>
  );
};

export default AdminLogs;
