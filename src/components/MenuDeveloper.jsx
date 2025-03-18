import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css';

const MenuDeveloper = () => {
    return (
        <div className="menu-container">
            <h1>Bienvenido Administrador</h1>
            <div className="menu-buttons">
                <Link to="/gestionusuarios" className="btn btn-primary">Gestionar Usuarios</Link>
                <Link to="/gestionmediaciones" className="btn btn-success">Gestionar Mediaciones</Link>
                <Link to="/estadisticas" className="btn btn-warning">Ver Estadísticas</Link>
                <Link to="/" className="btn btn-danger">Cerrar Sesión</Link>
            </div>
        </div>
    );
};

export default MenuDeveloper;