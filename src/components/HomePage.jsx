import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    // Función para redirigir al login
    const handleAcceso = () => {
        navigate('/login');
    };

    return (
        <div className="homepage-container">
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <img src="Icon.png" alt="Puente Guardian Logo" className="logo-img" />
                </div>
                <nav className="nav-links">
                    <button
                        onClick={handleAcceso}
                        className="nav-btn"
                    >
                        Acceder
                    </button>
                </nav>
            </header>

            

            {/* Sección de Información */}
            <section className="info-section">
                <h2 className="info-title">
                    ¿Qué ofrece Puente Guardian?
                </h2>
                <p className="info-description">
                    Facilitamos la creación, seguimiento y resolución de mediaciones entre estudiantes, docentes y mediadores.
                </p>
                <div className="info-buttons">
                    <button onClick={handleAcceso} className="btn-info">Acceder</button>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Enlaces Rápidos</h3>
                        <ul>
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/login">Acceder</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Puente Guardian. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;