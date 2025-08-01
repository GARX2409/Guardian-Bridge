import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarModal from "./EditarModal";
import "../styles/gestion.css";

const GestionMediaciones = () => {
  const [mediaciones, setMediaciones] = useState([]);
  const [mediacionEditada, setMediacionEditada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMediaciones();
  }, []);

  const fetchMediaciones = async () => {
    try {
      const response = await axios.get("https://guardian-bridge-backend.onrender.com/api/mediations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMediaciones(response.data);
    } catch (error) {
      console.error("Error al cargar mediaciones:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las mediaciones",
      });
    }
  };

  const abrirModalEditar = (mediacion) => {
    setMediacionEditada(mediacion);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setMediacionEditada(null);
  };

  const guardarCambios = async () => {
    try {
      await axios.put(
        `https://guardian-bridge-backend.onrender.com/api/mediations/${mediacionEditada._id}`,
        mediacionEditada,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchMediaciones();
      cerrarModal();
      Swal.fire({
        icon: "success",
        title: "Mediación actualizada",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la mediación",
      });
    }
  };

  const eliminarMediacion = async (id) => {
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
        await axios.delete(`https://guardian-bridge-backend.onrender.com/api/mediations/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchMediaciones();
        Swal.fire({
          icon: "success",
          title: "Mediación eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la mediación",
        });
      }
    }
  };

  const handleRegresar = () => {
    navigate("/developer");
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "cancelada":
        return "red";
      case "Proceso":
        return "orange";
      case "resuelta":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Mediaciones</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Tipo de Falta</th>
              <th className="px-4 py-2">Sede</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mediaciones.length > 0 ? (
              mediaciones.map((mediacion) => (
                <tr key={mediacion._id} className="border-b">
                  <td className="px-4 py-2">{mediacion.nombre}</td>
                  <td className="px-4 py-2">{mediacion.titulo}</td>
                  <td className="px-4 py-2">{mediacion.descripcion}</td>
                  <td className="px-4 py-2">{mediacion.tipoFalta}</td>
                  <td className="px-4 py-2">{mediacion.sede}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor: getEstadoColor(mediacion.estado),
                        }}
                      ></div>
                      {mediacion.estado}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => abrirModalEditar(mediacion)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarMediacion(mediacion._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No hay mediaciones activas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handleRegresar}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Regresar al Menú
        </button>
      </div>

      <EditarModal
        showModal={showModal}
        cerrarModal={cerrarModal}
        guardarCambios={guardarCambios}
        titulo="Editar Mediación"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            value={mediacionEditada?.nombre || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                nombre: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Título</label>
          <input
            type="text"
            value={mediacionEditada?.titulo || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                titulo: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            value={mediacionEditada?.descripcion || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                descripcion: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tipo de Falta</label>
          <input
            type="text"
            value={mediacionEditada?.tipoFalta || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                tipoFalta: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sede</label>
          <select
            value={mediacionEditada?.sede || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                sede: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Seleccione una sede</option>
            <option value="Popular">Popular modelo</option>
            <option value="central">Central/principal</option>
            <option value="vallejo">Luis Fernando Vallejo</option>
            <option value="calvache">José María Calvache</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado</label>
          <select
            value={mediacionEditada?.estado || ""}
            onChange={(e) =>
              setMediacionEditada({
                ...mediacionEditada,
                estado: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Proceso">En Proceso</option>
            <option value="resuelta">Resuelta</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </EditarModal>
    </div>
  );
};

export default GestionMediaciones;