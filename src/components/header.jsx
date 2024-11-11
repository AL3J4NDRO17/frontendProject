// src/components/Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import '../styles/header.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../services/authService';
import { toast } from 'react-toastify';

import UserMenu from '../utils/userMenu';

import UserMenuAdmin from '../utils/userMenuAdmin';

const Header = () => {
    const { isAuthenticated, userRole, isLoading, setIsAuthenticated, setUserRole } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    useEffect(() => {
        // Escucha cambios de autenticación o rol para ajustar el header dinámicamente
    }, [userRole, isAuthenticated]);
    console.log(userRole, isAuthenticated)

    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) {
            setIsServicesOpen(false);
        }
    };

    const toggleServices = (e) => {
        e.preventDefault();
        setIsServicesOpen(!isServicesOpen);
    };

    return (
        <header className="site-header">
            <div className="top-bar">
                <div className="container">
                    <p className="registration-number">REG: TH2024-ABC123</p>
                    <div className="contact-info">
                        <a href="https://wa.me/1234567890" className="whatsapp-link">Contáctanos por WhatsApp</a>
                        <div className="social-icons">
                            <a href="#" className="social-icon">Email</a>
                            <a href="#" className="social-icon">Facebook</a>
                            <a href="#" className="social-icon">YouTube</a>
                            <a href="#" className="social-icon">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-header">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src="/logo.png" alt="Logo" className="logo-img" />
                        </Link>
                    </div>

                    <button
                        className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
                        <ul className="nav-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li className={`has-dropdown ${isServicesOpen ? 'active' : ''}`}>
                                <a href="/servicios" onClick={toggleServices}>Servicios</a>
                                <ul className={`dropdown-menu ${isServicesOpen ? 'open' : ''}`}>
                                    <li><Link to="/servicio1">Servicio 1</Link></li>
                                    <li><Link to="/servicio2">Servicio 2</Link></li>
                                    <li><Link to="/servicio3">Servicio 3</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/ubicaciones">Ubicaciones</Link></li>
                            <li><Link to="/testimonios">Testimonios</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/whatsapp">Whatsapp</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                            
                        </ul>

                        {/* Botones de auth para móvil */}
                        <div className="auth-buttons mobile">
                            {isAuthenticated ? (
                                userRole === 'admin' ? (
                                    <UserMenuAdmin />
                                ) : (
                                    <UserMenu />
                                )
                            ) : (
                                <>
                                    <Link to="/login" className="btn-login">Iniciar sesión</Link>
                                    <Link to="/register" className="btn-register">Registrarse</Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <div className="header-right">
                        {/* Botones de auth para desktop */}
                        <div className="auth-buttons desktop">
                            {isAuthenticated ? (
                                userRole === 'admin' ? (
                                    <UserMenuAdmin />
                                ) : (
                                    <UserMenu />
                                )
                            ) : (
                                <>
                                    <Link to="/login" className="btn-login">Iniciar sesión</Link>
                                    <Link to="/register" className="btn-register">Registrarse</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
