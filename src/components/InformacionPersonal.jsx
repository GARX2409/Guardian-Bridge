import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';



const InformacionPersonal = () => {
    const [usuario, setUsuario] = useState({ username: '', password: '' });
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get('https://guardian-bridge-backend.onrender.com/api/auth/user', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsuario(response.data);
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cargar la información del usuario',
                });
            }
        };

        fetchUsuario();
    }, []);

    const actualizarContrasena = async () => {
        try {
            await axios.put(
                'https://guardian-bridge-backend.onrender.com/api/auth/user/password',
                { password: nuevaContrasena },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }
            );
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la contraseña',
            });
        }
    };

    const handleRegresar = () => {
        // Redirige al menú según el rol
        if (userRole === 'estudiante') {
            navigate('/estudiante');
        } else if (userRole === 'docente') {
            navigate('/docente');
        } else if (userRole === 'mediador') {
            navigate('/mediador');
        }
    };
    return (
        <div className="informacion-personal-container">
            <h2>Información Personal</h2>
            <p>Nombre de usuario: {usuario.username}</p>
            <p>Sede: {usuario.sede}</p>
            <p>Grado: {usuario.grado}</p>
            <div className="formulario">
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                />
                <button onClick={actualizarContrasena}>Actualizar Contraseña</button>
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

export default InformacionPersonal;