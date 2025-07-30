import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import "../styles/Menu.css";
import NotificationDropdown from "./NotificationDropdown";

const MenuDocente = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicializar socket
    const newSocket = io("https://guardian-bridge-backend.onrender.com", {
      auth: {
        token: localStorage.getItem("token")
      }
    });
    setSocket(newSocket);

    // Cargar notificaciones iniciales
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("https://guardian-bridge-backend.onrender.com/api/notification", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };
    fetchNotifications();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleStatusChange = ({ userId, isOnline: status }) => {
      if (userId === localStorage.getItem("userId")) {
        setIsOnline(status);
      }
    };

    const handleNotification = (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    };

    socket.on("connect", () => {
      socket.emit("userOnline", localStorage.getItem("userId"));
    });

    socket.on("userStatusChanged", handleStatusChange);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("userStatusChanged", handleStatusChange);
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.put(
        `https://guardian-bridge-backend.onrender.com/api/notification/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
    } catch (error) {
      console.error("Error al marcar notificación:", error);
    }
  };

  return (
    <div className="menu-container">
      <div className="status-container">
        <div className={`status-indicator ${isOnline ? "online" : "offline"}`}>
          {isOnline ? "En línea" : "Desconectado"}
        </div>
      </div>

      <h1 className="menu-title">Bienvenido Docente</h1>

      <div className="notification-wrapper">
        <NotificationDropdown
          notifications={notifications}
          onDismiss={markNotificationAsRead}
        />
      </div>

      <div className="menu-buttons">
        <Link to="/informacionpersonal" className="btn btn-primary">
          Información Personal
        </Link>
        <Link to="/solicitarmediacion" className="btn btn-success">
          Solicitar Mediación
        </Link>
        <Link to="/mediacionesactivas" className="btn btn-warning">
          Mediaciones Activas
        </Link>
        <Link to="/" className="btn btn-danger">
          Cerrar Sesión
        </Link>
      </div>
    </div>
  );
};

export default MenuDocente;