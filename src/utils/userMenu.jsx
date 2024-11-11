// src/components/UserMenu.jsx
import React, { useState, useEffect, useRef,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';
import { FaUserCircle, FaCog, FaSignOutAlt, FaUserAlt } from 'react-icons/fa';
import "../styles/utils/userMenu.css";
import { AuthContext } from '../context/AuthContext';


const UserMenu = () => {
    
    const {setIsAuthenticated, setUserRole } = useContext(AuthContext);

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
        console.log("Dropdown open state:", isDropdownOpen);
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
        <div className="userMenu-container" ref={menuRef}>
            <FaUserCircle className="userMenu-icon" onClick={toggleDropdown} />
            {isDropdownOpen && (
                <div className="userMenu-dropdown visible">
                    <ul className="userMenu-list">
                        <li className="userMenu-item" onClick={() => navigate('/user-profile')}>
                            <FaUserAlt /> Perfil
                        </li>
                        <li className="userMenu-item" onClick={() => navigate('/settings')}>
                            <FaCog /> Configuración
                        </li>
                        <li className="userMenu-item" onClick={handleLogout}>
                            <FaSignOutAlt /> Cerrar sesión
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
