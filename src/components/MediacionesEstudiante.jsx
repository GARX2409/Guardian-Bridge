import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/MediacionesActivas.css'; // Asegúrate de importar el archivo CSS


const MediacionesEstudiante = () => {
    const [mediaciones, setMediaciones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMediaciones();
    }, []);

    const fetchMediaciones = async () => {
        try {
            const response = await axios.get('https://guardian-bridge-backend.onrender.com/api/mediations', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            const userId = localStorage.getItem('userId');
            const filteredMediaciones = response.data.filter(mediacion => mediacion.createdBy._id === userId);

            setMediaciones(filteredMediaciones);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las mediaciones',
            });
        }
    };

    const filteredMediaciones = mediaciones.filter((mediacion) => {
        return (
            mediacion.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mediacion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mediacion.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mediacion.tipoFalta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mediacion.sede.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleRegresar = () => {
        navigate('/estudiante');
    };

    const getEstadoClase = (estado) => {
        switch (estado) {
            case 'cancelada':
                return 'cancelada';
            case 'Proceso':
                return 'proceso';
            case 'resuelta':
                return 'resuelta';
            default:
                return 'default';
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Mis Mediaciones Activas</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar mediación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

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
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMediaciones.length > 0 ? (
                            filteredMediaciones.map((mediacion) => (
                                <tr key={mediacion._id} className="border-b">
                                    <td className="px-4 py-2">{mediacion.nombre}</td>
                                    <td className="px-4 py-2">{mediacion.titulo}</td>
                                    <td className="px-4 py-2">{mediacion.descripcion}</td>
                                    <td className="px-4 py-2">{mediacion.tipoFalta}</td>
                                    <td className="px-4 py-2">{mediacion.sede}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center">
                                            <div
                                                className={`estado-circulo ${getEstadoClase(mediacion.estado)}`}
                                            ></div>
                                            {mediacion.estado}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    No tienes mediaciones activas.
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
        </div>
    );
};

export default MediacionesEstudiante;