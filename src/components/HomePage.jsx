import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    // Función para redirigir al login
    const handleAcceso = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
            {/* Contenido principal */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-2xl w-full">
                {/* Título */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Bienvenido a <span className="text-blue-600">Puente Guardian</span>
                </h1>

                {/* Descripción */}
                <p className="text-gray-600 mb-6">
                    Puente Guardian es un sistema diseñado para facilitar la gestión de mediaciones entre estudiantes,
                    docentes y mediadores. Nuestra plataforma permite resolver conflictos de manera eficiente y transparente,
                    promoviendo un ambiente escolar armónico y colaborativo.
                </p>

                {/* Características */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-blue-600">Para Estudiantes</h2>
                        <p className="text-gray-600">
                            Accede a tus mediaciones activas y sigue su progreso en tiempo real.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-purple-600">Para Docentes y Mediadores</h2>
                        <p className="text-gray-600">
                            Gestiona y resuelve conflictos de manera eficiente con herramientas especializadas.
                        </p>
                    </div>
                </div>

                {/* Botón de acceso */}
                <button
                    onClick={handleAcceso}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                >
                    Acceder al Sistema
                </button>
            </div>

            {/* Pie de página */}
            <footer className="mt-8 text-white text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Puente Guardian. Todos los derechos reservados.
                </p>
            </footer>
        </div>
    );
};

export default HomePage;