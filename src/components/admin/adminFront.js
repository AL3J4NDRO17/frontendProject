import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../../Styles/cssAdmin/adminFront.css';
const API_URL = "https://prophysio-server2.onrender.com/api";

const AdminFront = () => {
  const [configs, setConfigs] = useState([]);
  const [newConfig, setNewConfig] = useState({ type: '', value: '' });
  const [logo, setLogo] = useState('');

  useEffect(() => {
    // Cargar todas las configuraciones al montar el componente
    console.log(`Haciendo GET a: ${API_URL}/front`);

    axios.get(`${API_URL}/auth/front`) // Cambiado a /front para coincidir con el nuevo endpoint
      .then((response) => {
        setConfigs(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar las configuraciones:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewConfig({ ...newConfig, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/auth/front`, newConfig) // Asegúrate de que newConfig tenga el tipo adecuado
      .then(() => {
        alert('Configuración actualizada correctamente');
        // Carga las configuraciones nuevamente
        setNewConfig({ type: '', value: '' });
        axios.get(`${API_URL}/auth/front`)
          .then((response) => {
            const updatedConfig = response.data;
            // Actualiza el estado local para reflejar el cambio
            setConfigs(updatedConfig);
          })
          .catch((error) => {
            console.error('Error al cargar las configuraciones después de actualizar:', error);
          });
      })
      .catch((error) => {
        console.error('Error al actualizar la configuración:', error);
      });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Prophysio'); // Usa el nombre de tu upload preset aquí
  
    axios.post('https://api.cloudinary.com/v1_1/dvtf5ajs4/image/upload', formData)
      .then((response) => {
        setLogo(response.data.secure_url); // Obtiene la URL segura del logotipo
        setNewConfig({ type: 'logotipo', value: response.data.secure_url }); // Actualiza el objeto nuevo con la URL
      })
      .catch((error) => {
        console.error('Error al subir el logotipo:', error);
      });
  };

  return (
    <div className="admin-container">
      
      
      <div className="main-content">
        <div className="content-header">
          <h1>Configuración de la Empresa</h1> {/* Título de la página */}
        </div>
        <div className="content-body">
          <h2>Modificar Configuración</h2>
          <form onSubmit={handleSubmit}>
            <label>Tipo de configuración:</label>
            <select name="type" value={newConfig.type} onChange={handleChange}>
              <option value="telefono">Teléfono</option>
              <option value="correo">Correo</option>
              <option value="ubicacion">Ubicación</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="vision">Visión</option>
              <option value="mision">Misión</option>
              <option value="objetivos">Objetivos</option>
              <option value="logotipo">Logotipo</option>
            </select>
            <label>Valor:</label>
            {newConfig.type === 'logotipo' ? (
              <input type="file" onChange={handleLogoUpload} />
            ) : (
              <input type="text" name="value" value={newConfig.value} onChange={handleChange} />
            )}
            <button type="submit" className="button">Guardar Cambios</button>
          </form>

          <h2>Configuraciones Actuales</h2>
          {configs.length > 0 ? (
            <table className="collection-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {configs.map((config, index) => (
                  <tr key={index}>
                    <td>{config.type}</td>
                    <td>{config.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay configuraciones disponibles</p>
          )}

          {logo && (
            <div>
              <h3>Previsualización del Logotipo</h3>
              <img src={logo} alt="Logotipo actual" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFront;
