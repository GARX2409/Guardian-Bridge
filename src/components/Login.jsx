import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://guardian-bridge-backend.onrender.com/api/auth/login', {
                username,
                password,
            });

            // Verifica que los datos estén presentes en la respuesta
            if (res.data.token && res.data.role && res.data.userId) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('userId', res.data.userId);

                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Redirección según el rol
                navigate(`/${res.data.role}`);
            } else {
                throw new Error('Datos incompletos en la respuesta del servidor');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nombre de usuario o contraseña incorrectos',
            });
            console.error('Error en la solicitud:', error.response?.data || error.message);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            <form id="loginForm" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Ingrese su nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;