import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import socket from './socket';
import axios from 'axios';
import Login from './components/Login';
import MenuEstudiante from './components/MenuEstudiante';
import MenuDocente from './components/MenuDocente';
import MenuMediador from './components/MenuMediador';
import MenuDeveloper from './components/MenuDeveloper';
import GestionUsuarios from './components/GestionUsuarios';
import GestionMediaciones from './components/GestionMediaciones';
import Estadisticas from './components/Estadisticas';
import MediacionesActivas from './components/MediacionesActivas';
import SolicitarMediacion from './components/SolicitarMediacion';
import InformacionPersonal from './components/InformacionPersonal';
import MediacionesEstudiante from './components/MediacionesEstudiante';
import HomePage from './components/HomePage';
import './styles/App.css';
import ProtectedRoute from './components/ProtectedRoute';

// Configuración de axios para usar la URL base
axios.defaults.baseURL = 'http://localhost:5000/api';

const App = () => {
  const [notifications, setNotifications] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener notificaciones al cargar la página
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/notification', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        if (error.response && error.response.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userId');
          setUserRole(null);
        }
        setError('Error al cargar notificaciones');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  // Escuchar notificaciones en tiempo real
  useEffect(() => {
    const handleNewNotification = (notification) => {
      const userId = localStorage.getItem('userId');
      if (notification.userId === userId) {
        setNotifications((prev) => [notification, ...prev]);
      }
    };

    socket.on('notification', handleNewNotification);

    return () => {
      socket.off('notification', handleNewNotification);
    };
  }, []);

  // Escuchar cambios en el estado de conexión
  useEffect(() => {
    const handleUserStatusChanged = ({ userId, isOnline: status }) => {
      if (userId === localStorage.getItem('userId')) {
        setIsOnline(status);
      }
    };

    socket.on('userStatusChanged', handleUserStatusChanged);

    return () => {
      socket.off('userStatusChanged', handleUserStatusChanged);
    };
  }, []);

  // Notificar al servidor que el usuario está en línea
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      socket.emit('userOnline', userId);
    }
  }, []);

  // Marcar una notificación como leída y eliminarla
  const handleDismiss = async (id) => {
    try {
      await axios.put(
        `/notifications/mark-as-read/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error('Error al marcar la notificación como leída:', error);
    }
  };

  // Actualizar el rol del usuario cuando cambie
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
  }, []);

  if (loading) {
    return <div className="loading-container">Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute>
              <MenuEstudiante 
                notifications={notifications} 
                onDismiss={handleDismiss} 
                isOnline={isOnline} 
                error={error}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/docente"
          element={
            <ProtectedRoute>
              <MenuDocente 
                notifications={notifications} 
                onDismiss={handleDismiss} 
                isOnline={isOnline} 
                error={error}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mediador"
          element={
            <ProtectedRoute>
              <MenuMediador 
                notifications={notifications} 
                onDismiss={handleDismiss} 
                isOnline={isOnline} 
                error={error}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/developer"
          element={
            <ProtectedRoute>
              <MenuDeveloper 
                notifications={notifications} 
                onDismiss={handleDismiss} 
                isOnline={isOnline} 
                error={error}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mediacionesestudiante"
          element={
            <ProtectedRoute>
              <MediacionesEstudiante />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mediacionesactivas"
          element={
            <ProtectedRoute>
              <MediacionesActivas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/informacionpersonal"
          element={
            <ProtectedRoute>
              <InformacionPersonal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solicitarmediacion"
          element={
            <ProtectedRoute>
              <SolicitarMediacion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestionusuarios"
          element={
            <ProtectedRoute>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestionmediaciones"
          element={
            <ProtectedRoute>
              <GestionMediaciones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadisticas"
          element={
            <ProtectedRoute>
              <Estadisticas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;