import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './sidebar'; // Asegúrate de que la ruta sea correcta
import '../../styles/admin/adminView.css'
const API_URL = "https://prophysio-server2.onrender.com/api"; 

const AdminUsers = () => {
  const [collections, setCollections] = useState([]);  // Datos de las colecciones disponibles (si las tienes)
  const [selectedCollection, setSelectedCollection] = useState('users');  // Iniciar con la colección 'users'
  const [collectionData, setCollectionData] = useState([]);  // Datos de la colección seleccionada

  // Cargar los datos de los usuarios al montar el componente
  useEffect(() => {
    axios.get(`${API_URL}/auth/collections/Users`)  // Cambia el endpoint para obtener los usuarios
      .then((response) => {
        setCollectionData(response.data);  // Guardar los datos de los usuarios
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la colección users:', error);
      });
  }, []);

  // Función para manejar el clic en "Ver historial"
  const handleHistoryClick = (user) => {
    console.log('Viendo historial de:', user);
  };

  return (
    <div className="admin-container">

      <div className="main-content">
        <div className="content-header">
          <h1>Usuarios</h1> {/* Título de la página */}
        </div>
        <div className="content-body">
          <h2>Datos de la colección de usuarios</h2>
          {collectionData.length > 0 ? (
            <table className="collection-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {collectionData.map((user, index) => (
                  <tr key={index}>
                    <td>{user.nombre}</td>
                    <td>{user.apellidos}</td>
                    <td>{user.correo}</td>
                    <td>
                      <span className={`status ${user.status === 'active' ? 'active' : 'inactive'}`}>
                        {user.status === 'active' ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => handleHistoryClick(user)} className="button">
                        Ver Acerca de
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos disponibles para usuarios</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
