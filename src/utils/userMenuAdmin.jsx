// src/components/AdminMenu.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import { FaUserCog, FaUserShield, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import "../styles/utils/userMenuAdmin.css";
import { AuthContext } from '../context/AuthContext';

const AdminMenu = () => {
    const { setIsAuthenticated, setUserRole} = useContext(AuthContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            setUserRole(null);
            toast.success("Sesión cerrada con éxito");
            navigate('/login');
        } catch (error) {
            toast.error("Error al cerrar sesión");
        }
    };


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="adminMenu-container" ref={menuRef}>
            <FaUserCog className="adminMenu-icon" onClick={toggleDropdown} />
            {isDropdownOpen && (
                <div className="adminMenu-dropdown visible">
                    <ul className="adminMenu-list">
                        <li className="adminMenu-item" onClick={() => navigate('/admin')}>
                            <FaUserShield /> Panel de Admin
                        </li>
                        <li className="adminMenu-item" onClick={() => navigate('/manage-users')}>
                            <FaUsers /> Gestión de Usuarios
                        </li>
                        <li className="adminMenu-item" onClick={() => navigate('/settings')}>
                            <FaUserCog /> Configuración
                        </li>
                        <li className="adminMenu-item" onClick={handleLogout}>
                            <FaSignOutAlt /> Cerrar sesión
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminMenu;
