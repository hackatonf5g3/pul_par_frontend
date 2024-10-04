import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/logo.png";
import car from "./assets/car.jpg";
import fondo from "./assets/fondo.png";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [mapVisible, setMapVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [locationCancelled, setLocationCancelled] = useState(false);

  const handleSubscription = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsSubscribed(true);
    } else {
      alert("Por favor, ingresa un correo electrónico válido.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/locations", {
        location,
      });
      console.log("Data submitted:", response.data);
      setLocation("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#5a0dad] to-[#e0b3ff]">
      <nav className="w-full bg-purple-500 p-4 mb-16 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">Pul-Par</div>
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden">
            <a
              href="#"
              className="block text-white py-2 px-4 hover:bg-purple-500"
            >
              Contacto Grupo 3
            </a>
            <a
              href="#"
              className="block text-white py-2 px-4 hover:bg-purple-500"
            >
              Info Hackathon F5G3
            </a>
            <a
              href="#"
              className="block text-white py-2 px-4 hover:bg-purple-500"
            >
              Uso
            </a>
            <a
              href="#"
              className="block text-white py-2 px-4 hover:bg-purple-500"
            >
              Busca en el mapa plazas disponibles en tu ciudad si eres conductor
            </a>
            <a
              href="#"
              className="block text-white py-2 px-4 hover:bg-purple-500"
            >
              Ayuda a informar en donde se encuentran plazas vacías así cuidamos
              al planeta
            </a>
          </div>
        )}
      </nav>
      {!isSubscribed ? (
        <div className="text-center mb-16">
          <img src={logo} alt="Logo" className="mb-9 w-30 mx-auto" />

          <form
            onSubmit={handleSubscription}
            className="flex flex-col items-center"
          >
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-xs"
            />
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-xs"
            />
            <img src={car} alt="car" className="mb-9 mt-8 w-full h-a mx-0" />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div
          className="text-center bg-white text-purple-600 rounded-lg w-full h-screen mb-0"
          style={{
            backgroundImage: `url(${fondo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <button
            onClick={() => setMapVisible(!mapVisible)}
            className="bg-green-600 text-white px-10 py-2 rounded-full border border-black hover:bg-purple-400 transition mb-16 mt-16"
          >
            {mapVisible ? "Retornar a Home" : "Plazas Libres"}
          </button>
          {mapVisible ? (
            <div>
              <h2 className="text-2xl mb-4">Plazas Libres</h2>
              <MapContainer
                center={coordinates || [40.4160833, -3.70088]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {coordinates && (
                  <Marker position={coordinates}>
                    <Popup>Anunciar espacios</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          ) : (
            <div>
              <form
                onSubmit={handlePost}
                className="flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="bg-purple-500 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition mb-9"
                >
                  Anunciar espacios libres
                </button>
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  // Solo se puede cambiar la ubicación desde el botón, así que no permitas cambios manuales
                  onChange={(e) => {}} // No permitir cambios manuales
                  required
                  disabled // Deshabilitar el campo de entrada
                  className="border border-gray-300 rounded-lg p-2 mb-14 w-full max-w-xs"
                />
                <button
                  type="submit"
                  className="bg-purple-400 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition"
                >
                  Enviar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLocation(""); // Limpiar la ubicación
                    setCoordinates(null); // Limpiar las coordenadas
                    setLocationCancelled(true); // Marcar que la ubicación fue cancelada
                  }}
                  className=" text-red px-2 py-2 rounded-full border border-black hover:bg-red-400 transition mb-4 mt-7"
                >
                  Cancelar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;