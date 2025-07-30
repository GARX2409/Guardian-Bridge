import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarModal from "./EditarModal";
import socket from "../socket";
import "../styles/gestion.css";

const GestionUsuarios = () => {
  const [, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    password: "",
    role: "",
    sede: "",
    grado: "",
  });
  const [usuariosOrganizados, setUsuariosOrganizados] = useState({});
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await axios.get("https://guardian-bridge-backend.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsuarios(response.data);
      organizarUsuarios(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los usuarios",
      });
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
    setupSocketListeners();

    return () => {
      socket.off('userStatusChanged');
    };
  }, [fetchUsuarios]);

  const setupSocketListeners = () => {
    socket.on('userStatusChanged', ({ userId, isOnline }) => {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        isOnline ? newSet.add(userId) : newSet.delete(userId);
        return newSet;
      });
    });
  };

  const organizarUsuarios = (usuarios) => {
    const organizados = {};
    usuarios.forEach((usuario) => {
      const { sede, grado } = usuario;
      if (!organizados[sede]) organizados[sede] = {};
      if (!organizados[sede][grado]) organizados[sede][grado] = [];
      organizados[sede][grado].push(usuario);
    });
    setUsuariosOrganizados(organizados);
  };

  const handleInputChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const agregarUsuario = async () => {
    try {
      await axios.post(" https://guardian-bridge-backend.onrender.com/api/users", nuevoUsuario, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      Swal.fire({
        icon: "success",
        title: "Usuario agregado",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUsuarios();
      setNuevoUsuario({
        username: "",
        password: "",
        role: "",
        sede: "",
        grado: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo agregar el usuario",
      });
    }
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setShowModal(true);
  };

  const actualizarUsuario = async () => {
    try {
      await axios.put(
        `https://guardian-bridge-backend.onrender.com/api/users/${usuarioEditando._id}`,
        usuarioEditando,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchUsuarios();
      setShowModal(false);
      setUsuarioEditando(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario",
      });
    }
  };

  const eliminarUsuario = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://guardian-bridge-backend.onrender.com/api/users/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        Swal.fire({
          icon: "success",
          title: "Usuario eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchUsuarios();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el usuario",
        });
      }
    }
  };

  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate("/developer");
  };

  return (
    <div className="gestion-usuarios-container">
      <h2>Gestión de Usuarios</h2>
      <div className="formulario">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={nuevoUsuario.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={handleInputChange}
        />
        <select
          name="role"
          value={nuevoUsuario.role}
          onChange={handleInputChange}
        >
          <option value="">Seleccione un rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="mediador">Mediador</option>
          <option value="developer">Administrador</option>
        </select>
        <select
          name="sede"
          value={nuevoUsuario.sede}
          onChange={handleInputChange}
        >
          <option value="">Seleccione una sede</option>
          <option value="popular">Popular</option>
          <option value="central">Central</option>
          <option value="vallejo">Vallejo</option>
          <option value="calvache">Calvache</option>
        </select>
        <input
          type="text"
          name="grado"
          placeholder="Grado (ej: 5-1, 6-2)"
          value={nuevoUsuario.grado}
          onChange={handleInputChange}
        />
        <button onClick={agregarUsuario}>Agregar Usuario</button>
        <button
          onClick={handleRegresar}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Regresar al Menú
        </button>
      </div>
      <div className="usuarios-organizados">
        {Object.keys(usuariosOrganizados).map((sede) => (
          <div key={sede} className="sede-container">
            <h3>Sede: {sede}</h3>
            {Object.keys(usuariosOrganizados[sede]).map((grado) => (
              <div key={grado} className="grado-container">
                <h4>Grado: {grado}</h4>
                <table className="tabla-usuarios">
                  <thead>
                    <tr>
                      <th>Nombre de Usuario</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosOrganizados[sede][grado].map((usuario) => (
                      <tr key={usuario._id}>
                        <td>{usuario.username}</td>
                        <td>{usuario.role}</td>
                        <td>
                          <span className={`status-indicator ${onlineUsers.has(usuario._id) ? 'online' : 'offline'}`}>
                            {onlineUsers.has(usuario._id) ? '● En línea' : '● Desconectado'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => editarUsuario(usuario)}
                            className="btn-editar"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarUsuario(usuario._id)}
                            className="btn-eliminar"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>

      <EditarModal
        showModal={showModal}
        cerrarModal={() => setShowModal(false)}
        guardarCambios={actualizarUsuario}
        titulo="Editar Usuario"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={usuarioEditando?.username || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, username: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={usuarioEditando?.password || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, password: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rol</label>
          <select
            name="role"
            value={usuarioEditando?.role || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, role: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="mediador">Mediador</option>
            <option value="developer">Administrador</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sede</label>
          <select
            name="sede"
            value={usuarioEditando?.sede || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, sede: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="popular">Popular</option>
            <option value="central">Central</option>
            <option value="vallejo">Vallejo</option>
            <option value="calvache">Calvache</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Grado</label>
          <input
            type="text"
            name="grado"
            value={usuarioEditando?.grado || ""}
            onChange={(e) =>
              setUsuarioEditando({ ...usuarioEditando, grado: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </EditarModal>
    </div>
  );
};

export default GestionUsuarios;