import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../styles/SolicitarMediacion.css';

const SolicitarMediacion = () => {
    const [mediacion, setMediacion] = useState({
        nombre: '',
        titulo: '',
        descripcion: '',
        tipoFalta: 'Tipo 1', // Único tipo de falta
        sede: '',
    });
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    const handleInputChange = (e) => {
        setMediacion({ ...mediacion, [e.target.name]: e.target.value });
    };

    const solicitarMediacion = async () => {
        try {
            // Verificar que todos los campos obligatorios estén llenos
            if (!mediacion.nombre || !mediacion.titulo || !mediacion.descripcion || !mediacion.sede) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Todos los campos son obligatorios',
                });
                return;
            }

            // Obtener el ID del usuario autenticado
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No estás autenticado. Por favor, inicia sesión.',
                });
                navigate('/login');
                return;
            }

            // Enviar la solicitud al backend
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post(
                'http://localhost:5000/api/mediations',
                {
                    ...mediacion, // Incluir todos los campos de la mediación
                    createdBy: userId, // Añadir el ID del usuario
                },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Enviar el token en los headers
                }
            );

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Mediación solicitada',
                text: 'Los docentes y mediadores han sido notificados',
                showConfirmButton: false,
                timer: 1500,
            });

            // Redirigir a la página de mediaciones
            navigate('/solicitarmediacion');
        } catch (error) {
            console.error('Error al solicitar la mediación:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'No se pudo solicitar la mediación. Verifica tu autenticación e intenta nuevamente.',
            });
        }
    };

    const handleRegresar = () => {
        if (userRole === 'estudiante') {
            navigate('/estudiante');
        } else if (userRole === 'docente') {
            navigate('/docente');
        } else if (userRole === 'mediador') {
            navigate('/mediador');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Solicitar Mediación</h2>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={mediacion.nombre}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={mediacion.titulo}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={mediacion.descripcion}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                    />
                </div>
                <div className="mb-4">
                    <select
                    name="sede" 
                    value={mediacion.sede}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Seleccione la sede</option>
                    <option value="Central">Central</option>
                    <option value=" Jose_Maria_Calvache">Jose Maria Calvache</option>
                    <option value="Luis_Fernando_Vallejo">Luis Fernando Vallejo</option>
                    <option value="Popular_Modelo">Popular Modelo</option>
                </select>
                </div>
                <div className="mb-4">
                    <select 
                        name="tipoFalta" 
                        value={mediacion.tipoFalta} 
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Seleccione el tipo de falta</option>
                        <option value="Tipo 1">Tipo 1</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        onClick={solicitarMediacion}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Solicitar Mediación
                    </button>
                    <button
                    onClick={handleRegresar}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Regresar al Menú
                </button>
                </div>
            </div>
        </div>
    );
};


export default SolicitarMediacion;