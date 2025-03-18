import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const MenuDocente = () => {
    return (
        <div className="menu-container">
            <h1>Bienvenido Docente</h1>
            <div className="menu-buttons">
                <Link to="/informacionpersonal" className="btn btn-primary">Información Personal</Link>
                <Link to="/solicitarmediacion" className="btn btn-success">Solicitar Mediación</Link>
                <Link to="/mediacionesactivas" className="btn btn-warning">Mediaciones Activas</Link>
                <Link to="/" className="btn btn-danger">Cerrar Sesión</Link>
            </div>
        </div>
    );
};

export default MenuDocente;