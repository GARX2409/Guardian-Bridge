import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar Bootstrap Icons

// Crea un root para la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);