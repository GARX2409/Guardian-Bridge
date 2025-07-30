import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card"; // Asegúrate de que la ruta sea correcta

const NotificationDropdown = ({ notifications, onDismiss }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el dropdown está abierto

  return (
    <StyledDropdown>
      {/* Icono de notificaciones */}
      <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height={24}
          width={24}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-6 h-6 text-gray-800 dark:text-white"
        >
          <path
            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>
        {/* Badge para mostrar si hay notificaciones nuevas */}
        {notifications.length > 0 && <div className="notification-badge" />}
      </div>

      {/* Dropdown de notificaciones */}
      {isOpen && (
        <div className="dropdown-content">
          <h3>Notificaciones</h3>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card
                key={notification._id} // Usar _id como clave única
                notification={notification}
                onDismiss={onDismiss} // Pasa la función onDismiss al componente Card
              />
            ))
          ) : (
            <p>No hay notificaciones nuevas.</p>
          )}
        </div>
      )}
    </StyledDropdown>
  );
};

// Estilos con styled-components
const StyledDropdown = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  .notification-icon {
    width: 40px;
    height: 40px;
    background-color: rgb(58, 58, 58);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s;
    position: relative;
  }

  .notification-icon:hover {
    background-color: rgb(26, 26, 26);
  }

  .notification-icon svg {
    color: rgba(255, 255, 255, 0.651);
    transform: scale(1.2);
    transition: color 0.2s;
  }

  .notification-icon:hover svg {
    color: white;
  }

  .notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: rgb(0, 255, 0);
    border-radius: 50%;
  }

  .dropdown-content {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    padding: 16px;
  }

  .dropdown-content h3 {
    margin-bottom: 12px;
    font-size: 18px;
    color: #333;
  }

  .dropdown-content p {
    color: #777;
    text-align: center;
  }
`;

export default NotificationDropdown;