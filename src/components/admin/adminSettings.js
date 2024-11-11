import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../Styles/cssAdmin/adminSettings.css"; // Estilos actuales

const API_URL = "https://prophysio-server2.onrender.com/api";

const ConfigSettings = () => {
    const [config, setConfig] = useState({
        MAX_INTENTOS: 5,
        BLOQUEO_TIEMPO_MINUTOS: 7,
        emailActivationMessage: '',
        emailActivationExpiry: 24,
    });
    const [emailSearch, setEmailSearch] = useState(''); // Campo de búsqueda de usuarios por correo
    const [userData, setUserData] = useState([]); // Datos de usuarios (lista para la tabla)
    const [filter, setFilter] = useState(''); // Filtro de estado de usuario
    const [activeSection, setActiveSection] = useState(null); // Controla la sección activa (sidebar)
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para abrir/cerrar el sidebar
    const [currentPage, setCurrentPage] = useState(1); // Página actual para la paginación
    const [usersPerPage] = useState(5); // Número de usuarios por página

    const sidebarRef = useRef(null); // Ref para el sidebar

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${API_URL}/auth/config`);
                const data = await response.json();

                const configData = {};
                data.forEach(item => {
                    if (item.type === 'max_intents') {
                        configData.MAX_INTENTOS = item.value;
                    } else if (item.type === 'bloqueo_tiempo') {
                        configData.BLOQUEO_TIEMPO_MINUTOS = item.value;
                    } else if (item.type === 'message') {
                        configData.emailActivationMessage = item.value;
                    } else if (item.type === 'expired_time') {
                        configData.emailActivationExpiry = item.value;
                    }
                });

                setConfig(configData);
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        };

        fetchConfig();
    }, []);

    // Añadir un event listener para cerrar el sidebar si se hace clic afuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false); // Cierra el sidebar si el clic es fuera de él
                setActiveSection(null); // Reseteamos la sección activa
            }
        };

        // Añadimos el listener solo si el sidebar está abierto
        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Limpiar el listener al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    const handleChange = (e) => {
        setConfig({
            ...config,
            [e.target.name]: e.target.value,
        });
    };


    const handleBlockUser = async (user) => {
        try {
            const response = await fetch(`${API_URL}/auth/blockUser/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);

                // Actualizamos el estado local para reflejar el cambio de bloqueo
                setUserData(prevData =>
                    prevData.map(u => (u._id === user._id ? { ...u, banned: data.banned } : u))
                );
            } else {
                toast.error('Error al bloquear/desbloquear usuario');
            }
        } catch (error) {
            toast.error('Error al bloquear/desbloquear usuario');
            console.error('Error:', error);
        }
    };
    // Actualizar configuración con un fetch
    const updateConfig = async (type, value) => {
        try {
            const response = await fetch(`${API_URL}/auth/config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, value }),
            });

            if (response.ok) {
                toast.success('Configuración actualizada exitosamente');
            } else {
                toast.error('Error al actualizar la configuración');
            }
        } catch (error) {
            toast.error('Error en la solicitud');
            console.error('Error al actualizar la configuración:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Creamos un array con todas las configuraciones
        const configUpdates = [
            { type: 'max_intents', value: config.MAX_INTENTOS },
            { type: 'bloqueo_tiempo', value: config.BLOQUEO_TIEMPO_MINUTOS },
            { type: 'message', value: config.emailActivationMessage },
            { type: 'expired_time', value: config.emailActivationExpiry }
        ];

        try {
            const response = await fetch(`${API_URL}/auth/config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(configUpdates), // Enviamos el array de configuraciones
            });

            if (response.ok) {
                toast.success('Configuraciones guardadas exitosamente');
            } else {
                toast.error('Error al guardar las configuraciones');
            }
        } catch (error) {
            toast.error('Error al guardar las configuraciones');
            console.error('Error al guardar las configuraciones:', error);
        }
    };



    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'message',
                    value: config.emailActivationMessage,
                }),
            });

            if (response.ok) {
                toast.success('Configuración de mensaje guardada exitosamente');
            } else {
                toast.error('Error al guardar el mensaje');
            }
        } catch (error) {
            toast.error('Error al guardar el mensaje');
            console.error('Error al guardar el mensaje:', error);
        }
    };



    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
        setSidebarOpen(true); // Abrimos el sidebar cuando se selecciona una sección
    };

    // Buscar usuarios con filtro de estado
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/collections/Users?estado=${filter}&correo=${emailSearch}`);
            const data = await response.json();
            if (data && data.length > 0) {
                setUserData(data);
                toast.success('Usuarios encontrados');
            } else {
                toast.error('No se encontraron usuarios');
                setUserData([]);
            }
        } catch (error) {
            toast.error('Error al buscar usuarios');
            console.error('Error al buscar usuarios:', error);
        }
    };

    // Lógica de paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="config-container">
            <ToastContainer position="bottom-right" autoClose={3000} />

            <h1>Panel de Configuración</h1>

            {/* Opciones de Configuración */}
            <div className="config-options">
                <div
                    className={`config-option ${activeSection === 'login' ? 'active' : ''}`}
                    onClick={() => toggleSection('login')}
                >
                    <i className="fas fa-lock"></i> Configuración de Intentos de Login
                </div>
                <div
                    className={`config-option ${activeSection === 'block' ? 'active' : ''}`}
                    onClick={() => toggleSection('block')}
                >
                    <i className="fas fa-user-lock"></i> Configuración de Bloqueos de Cuenta
                </div>
                <div
                    className={`config-option ${activeSection === 'email' ? 'active' : ''}`}
                    onClick={() => toggleSection('email')}
                >
                    <i className="fas fa-user-lock"></i> Configuración de Mensaje de cuenta
                </div>
            </div>

            {/* Sidebar Configuración */}
            <div
                ref={sidebarRef}  // Referencia del sidebar para detectar los clics afuera
                className={`sidebar-config ${sidebarOpen || activeSection ? 'open' : ''}`}
            >
                {activeSection === 'login' && (
                    <form className="config-form" onSubmit={(e) => handleSubmit(e, 'MAX_INTENTOS')}>
                        <h2>Intentos de Login y Bloqueo</h2>
                        <label htmlFor="MAX_INTENTOS">Intentos Máximos de Login:</label>
                        <input
                            type="number"
                            id="MAX_INTENTOS"
                            name="MAX_INTENTOS"
                            className="config-input"
                            value={config.MAX_INTENTOS}
                            onChange={handleChange}
                        />
                        <label htmlFor="BLOQUEO_TIEMPO_MINUTOS">Tiempo de Bloqueo (Minutos):</label>
                        <input
                            type="number"
                            id="BLOQUEO_TIEMPO_MINUTOS"
                            name="BLOQUEO_TIEMPO_MINUTOS"
                            className="config-input"
                            value={config.BLOQUEO_TIEMPO_MINUTOS}
                            onChange={handleChange}
                        />
                        <button type="submit" className="config-save-button">Guardar Configuración</button>
                    </form>
                )}

                {activeSection === 'block' && (
                    <div className="config-search">
                        <form onSubmit={handleSearch} className="search-form">
                            <h2>Usuarios Bloqueados</h2>

                            <input
                                type="text"
                                placeholder="Buscar por correo"
                                value={emailSearch}
                                onChange={(e) => setEmailSearch(e.target.value)}
                                className="search-input"
                            />



                            <button type="submit" className="config-save-button">Mostrar</button>
                        </form>


                        {currentUsers.length > 0 && (
                            <div>
                                <table className="collection-table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Correo</th>
                                            <th>Fecha de Bloqueo</th> {/* Nueva columna para la fecha de bloqueo */}
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentUsers.map((user) => (
                                            <tr key={user._id}>
                                                <td>{user.nombre}</td>
                                                <td>{user.correo}</td>
                                                <td>
                                                    {user.bloquedTo
                                                        ? new Date(user.bloquedTo).toLocaleString()  // Mostrar la fecha de bloqueo
                                                        : 'N/A'}
                                                </td>
                                                <td>
                                                    <button
                                                        className="block-button"
                                                        onClick={() => handleBlockUser(user)}
                                                    >
                                                        {user.banned ? 'Desbloquear' : 'Bloquear'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Paginación */}
                                <div className="pagination">
                                    {Array.from({ length: Math.ceil(userData.length / usersPerPage) }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                                            onClick={() => paginate(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}
                {activeSection === 'email' && (
                    <form className="config-form" onSubmit={(e) => handleSubmit(e, 'emailActivationMessage')}>
                        <h2>Configuración de Activación de Correo</h2>
                        <label htmlFor="emailActivationMessage">Mensaje de Activación:</label>
                        <textarea
                            id="emailActivationMessage"
                            name="emailActivationMessage"
                            className="config-input"
                            value={config.emailActivationMessage}
                            onChange={handleChange}
                        ></textarea>
                        <label htmlFor="emailActivationExpiry">Tiempo de Expiración (Horas):</label>
                        <input
                            type="number"
                            id="emailActivationExpiry"
                            name="emailActivationExpiry"
                            className="config-input"
                            value={config.emailActivationExpiry}
                            onChange={handleChange}
                        />
                        <button type="submit" className="config-save-button">Guardar Configuración</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ConfigSettings;
