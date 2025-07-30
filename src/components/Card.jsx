import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = ({ notification, onDismiss }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role");

  // Función para redirigir según el rol
  const handleViewFile = () => {
    if (userRole === "estudiante") {
      navigate("/mediacionesestudiante");
    } else if (userRole === "docente" || userRole === "mediador") {
      navigate("/mediacionesactivas");
    }
  };

  // Función para marcar la notificación como leída
  const handleMarkAsRead = () => {
    onDismiss(notification._id); // Llama a la función para eliminar la notificación
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="container">
          <div className="left">
            {/* Indicador de estado (puedes cambiarlo según la notificación) */}
            <div className="status-ind" />
          </div>
          <div className="right">
            <div className="text-wrap">
              <p className="text-content">
                <a className="text-link" href="#">
                  {notification.user}
                </a>{" "}
                {notification.message}
              </p>
              <p className="time">{notification.time}</p>
            </div>
            <div className="button-wrap">
              {/* Botón para ver el archivo (redirige según el rol) */}
              <button className="primary-cta" onClick={handleViewFile}>
                Ver archivo
              </button>
              {/* Botón para marcar como leída */}
              <button className="secondary-cta" onClick={handleMarkAsRead}>
                Marcar como leída
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Estilos con styled-components
const StyledWrapper = styled.div`
  .card {
    width: fit-content;
    background-color: #f2f3f7;
    border-radius: 0.75em;
    cursor: pointer;
    transition: ease 0.2s;
    box-shadow: 1em 1em 1em #d8dae0b1, -0.75em -0.75em 1em #ffffff;
    border: 1.5px solid #f2f3f7;
  }

  .card:hover {
    background-color: #d3ddf1;
    border: 1.5px solid #1677ff;
  }

  .container {
    margin-top: 1.25em;
    margin-bottom: 1.375em;
    margin-left: 1.375em;
    margin-right: 2em;
    display: flex;
    flex-direction: row;
    gap: 0.75em;
  }

  .status-ind {
    width: 0.625em;
    height: 0.625em;
    background-color: #ff0000;
    margin: 0.375em 0;
    border-radius: 0.5em;
  }

  .text-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    color: #333;
  }

  .time {
    font-size: 0.875em;
    color: #777;
  }

  .text-link {
    font-weight: 500;
    text-decoration: none;
    color: black;
  }

  .button-wrap {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
  }

  .secondary-cta {
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: 400;
    color: #666;
    cursor: pointer;
  }

  .primary-cta {
    font-size: 15px;
    background-color: transparent;
    font-weight: 600;
    color: #1677ff;
    border: none;
    border-radius: 1.5em;
    cursor: pointer;
  }

  button:hover {
    text-decoration: underline;
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.875em;
  }
`;

export default Card;
