import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MenuEstudiante from './components/MenuEstudiante';
import MenuDocente from './components/MenuDocente';
import MenuMediador from './components/MenuMediador';
import MenuDeveloper from './components/MenuDeveloper';
import GestionUsuarios from './components/GestionUsuarios';
import GestionMediaciones from './components/GestionMediaciones';
import Estadisticas from './components/Estadisticas';
import MediacionesActivas from './components/MediacionesActivas';
import  SolicitarMediacion from './components/SolicitarMediacion';
import  InformacionPersonal from './components/InformacionPersonal';
import MediacionesEstudiante from './components/MediacionesEstudiante';
import './styles/App.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/estudiante"
                    element={
                        <ProtectedRoute>
                            <MenuEstudiante />
                        </ProtectedRoute>
                    }
                />
                
                <Route
                    path="/docente"
                    element={
                        <ProtectedRoute>
                            <MenuDocente />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mediador"
                    element={
                        <ProtectedRoute>
                            <MenuMediador />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/developer"
                    element={
                        <ProtectedRoute>
                            <MenuDeveloper />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mediacionesactivas"
                    element={
                        <ProtectedRoute>
                            <MediacionesActivas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/informacionpersonal"
                    element={
                        <ProtectedRoute>
                            <InformacionPersonal />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/solicitarmediacion"
                    element={
                        <ProtectedRoute>
                            <SolicitarMediacion />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/gestionusuarios"
                    element={
                        <ProtectedRoute>
                            <GestionUsuarios />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/gestionmediaciones"
                    element={
                        <ProtectedRoute>
                            <GestionMediaciones />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/estadisticas"
                    element={
                        <ProtectedRoute>
                            <Estadisticas />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/mediacionesestudiante"
                    element={
                        <ProtectedRoute>
                            <MediacionesEstudiante />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            </Router>
    );
}
export default App;