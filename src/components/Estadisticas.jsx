import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
} from "chart.js";
import "../styles/Estadisticas.css";
import { useNavigate, Link } from "react-router-dom";

// Registra los componentes necesarios de Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, BarController);

const Estadisticas = () => {
  const [stats, setStats] = useState({
    mediacionesProceso: 0,
    mediacionesResueltas: 0,
    mediacionesCanceladas: 0,
    totalUsuarios: 0,
    totalMediaciones: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://guardian-bridge-backend.onrender.com/api/stats", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStats(response.data);
        renderCharts(response.data); // Renderiza las gráficas después de obtener los datos
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las estadísticas",
        });
      }
    };

    fetchStats();
  }, []);

  // Función para destruir gráficos anteriores
  const destroyChart = (canvasId) => {
    const canvas = document.getElementById(canvasId);
    if (canvas && Chart.getChart(canvas)) {
      Chart.getChart(canvas).destroy();
    }
  };

  // Función para renderizar las gráficas
  const renderCharts = (data) => {
    // Gráfica de mediaciones
    destroyChart("chartMediaciones");
    const ctxMediaciones = document
      .getElementById("chartMediaciones")
      .getContext("2d");
    new Chart(ctxMediaciones, {
      type: "bar",
      data: {
        labels: ["En Proceso", "Resuelto", "Cancelada"],
        datasets: [
          {
            label: "Mediaciones",
            data: [
              data.mediacionesProceso,
              data.mediacionesResueltas,
              data.mediacionesCanceladas,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });

    // Gráfica de usuarios
    destroyChart("chartUsuarios");
    const ctxUsuarios = document
      .getElementById("chartUsuarios")
      .getContext("2d");
    new Chart(ctxUsuarios, {
      type: "bar",
      data: {
        labels: ["Usuarios"],
        datasets: [
          {
            label: "Total Usuarios",
            data: [data.totalUsuarios],
            backgroundColor: ["#4BC0C0"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });

    // Gráfica de cifras generales
    destroyChart("chartCifras");
    const ctxCifras = document.getElementById("chartCifras").getContext("2d");
    new Chart(ctxCifras, {
      type: "bar",
      data: {
        labels: ["Total Mediaciones"],
        datasets: [
          {
            label: "Total Mediaciones",
            data: [data.totalMediaciones],
            backgroundColor: ["#9966FF"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  };

  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleRegresar = () => {
    // Redirige al menú según el rol
    if (userRole === "estudiante") {
      navigate("/estudiante");
    } else if (userRole === "docente") {
      navigate("/docente");
    } else if (userRole === "mediador") {
      navigate("/mediador");
    }else if (userRole === "developer") {
        navigate("/developer");
      }
  };

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas</h2>
      <div className="cifras">
        <p>
          <strong>Mediaciones En proceso:</strong> {stats.mediacionesProceso}
        </p>
        <p>
          <strong>Mediaciones Resueltas:</strong> {stats.mediacionesResueltas}
        </p>
        <p>
          <strong>Mediaciones Canceladas:</strong> {stats.mediacionesCanceladas}
        </p>
        <p>
          <strong>Total Usuarios:</strong> {stats.totalUsuarios}
        </p>
        <p>
          <strong>Total Mediaciones:</strong> {stats.totalMediaciones}
        </p>
        <button
          onClick={handleRegresar}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Regresar al Menú
        </button>
      </div>
      <div className="graficas">
        <div className="grafica">
          <h3>Mediaciones</h3>
          <div className="chart-container">
            <canvas id="chartMediaciones"></canvas>
          </div>
        </div>
        <div className="grafica">
          <h3>Usuarios</h3>
          <div className="chart-container">
            <canvas id="chartUsuarios"></canvas>
          </div>
        </div>
        <div className="grafica">
          <h3>Cifras Generales</h3>
          <div className="chart-container">
            <canvas id="chartCifras"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
