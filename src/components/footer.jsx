import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import "../styles/footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Logo */}
          <div className="footer__brand">
            <div className="footer__logo">
              LOGO PRO
            </div>
            <div className="footer__tagline">
              DESARROLLO WEB
            </div>
          </div>

          {/* Sobre Nosotros */}
          <div className="footer__about">
            <h3 className="footer__title">SOBRE NOSOTROS</h3>
            <p className="footer__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Dignissim suspendisse consequat sit ac volutpat. 
              Quiserat pellentesque reprehenderit volutpatem cum netus velit.
            </p>
          </div>

          {/* Síguenos */}
          <div className="footer__social">
            <h3 className="footer__title">SÍGUENOS</h3>
            <div className="footer__social-icons">
              <a href="#" className="footer__social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer__social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="footer__social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer__copyright">
          <p className="footer__copyright-text">
            © {new Date().getFullYear()} SLee Dw - Todos los Derechos Reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;