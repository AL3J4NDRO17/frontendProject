import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/cssAdmin/adminDocuments.css';  // Estilos personalizados

const API_URL = "https://prophysio-server2.onrender.com/api";

const DocumentCrud = () => {
  const [documentos, setDocumentos] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);  // Documento seleccionado para editar o ver historial
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    fechaVigencia: ''
  });
  const [isEditing, setIsEditing] = useState(false);  // Estado para saber si se está editando
  const [versionHistory, setVersionHistory] = useState([]);  // Historial de versiones del documento

  useEffect(() => {
    fetchDocumentos();  // Obtener todos los documentos al montar el componente
  }, []);

  // Función para obtener los documentos
  const fetchDocumentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/documentos`);
      setDocumentos(response.data);
    } catch (error) {
      toast.error('Error al cargar documentos');
    }
  };

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para registrar o modificar un documento
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Editar documento existente
      try {
        const response = await axios.put(`${API_URL}/auth/documentos/${selectedDoc._id}`, formData);
        toast.success('Documento modificado exitosamente');
        fetchDocumentos();  // Recargar los documentos
        setIsEditing(false);  // Salir del modo de edición
        setFormData({ titulo: '', contenido: '', fechaVigencia: '' });  // Limpiar el formulario
      } catch (error) {
        toast.error('Error al modificar el documento');
      }
    } else {
      // Registrar nuevo documento
      try {
        const response = await axios.post(`${API_URL}/auth/documentos`, formData);
        toast.success('Documento registrado exitosamente');
        fetchDocumentos();  // Recargar los documentos
        setFormData({ titulo: '', contenido: '', fechaVigencia: '' });  // Limpiar el formulario
      } catch (error) {
        toast.error('Error al registrar el documento');
      }
    }
  };

  // Función para seleccionar un documento para editar
  const handleEdit = (documento) => {
    setSelectedDoc(documento);
    setFormData({
      titulo: documento.titulo,
      contenido: documento.contenido,
      fechaVigencia: documento.fechaVigencia
    });
    setIsEditing(true);
  };

  // Función para marcar un documento como eliminado (lógica)
  const handleDelete = async (documentoId) => {
    try {
      await axios.put(`${API_URL}/auth/documentos/${documentoId}/marcar-eliminado`);
      toast.success('Documento marcado como eliminado');
      fetchDocumentos();
    } catch (error) {
      toast.error('Error al eliminar el documento');
    }
  };

  // Función para ver historial de versiones
  const handleViewHistory = async (documentoId) => {
    try {
      const response = await axios.get(`${API_URL}/auth/documentos/${documentoId}/historial`);
      setVersionHistory(response.data);
      setSelectedDoc(documentos.find((doc) => doc._id === documentoId));
    } catch (error) {
      toast.error('Error al obtener el historial de versiones');
    }
  };

  return (
    <div className="document-crud-container">
      <h1>Gestión de Documentos Regulatorios</h1>
      <form onSubmit={handleSubmit} className="document-form">
        <label>Título del Documento:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <label>Contenido:</label>
        <textarea
          name="contenido"
          value={formData.contenido}
          onChange={handleChange}
          required
        />
        <label>Fecha de Vigencia:</label>
        <input
          type="date"
          name="fechaVigencia"
          value={formData.fechaVigencia}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {isEditing ? 'Guardar Cambios' : 'Registrar Documento'}
        </button>
      </form>

      <div className="document-list">
        <h2>Lista de Documentos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha de Vigencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentos.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.titulo}</td>
                <td>{doc.fechaVigencia}</td>
                <td>{doc.eliminado ? 'Eliminado' : 'Activo'}</td>
                <td>
                  <button onClick={() => handleEdit(doc)}>Editar</button>
                  <button onClick={() => handleViewHistory(doc._id)}>Historial</button>
                  {!doc.eliminado && <button onClick={() => handleDelete(doc._id)}>Eliminar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDoc && (
        <div className="version-history">
          <h2>Historial de Versiones de {selectedDoc.titulo}</h2>
          <ul>
            {versionHistory.map((version, index) => (
              <li key={index}>
                Versión: {version.version}, Fecha: {version.fechaCreacion}, Estado: {version.estado}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DocumentCrud;
