import React, { useState } from "react";
import axios from "axios";
import logo from "./assets/logo.png";
import car from "./assets/car.jpg";
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

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude}, Long: ${longitude}`);
        setCoordinates([latitude, longitude]);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-purple-600 min-h-screen flex flex-col items-center  p-4">
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
          <img src={logo} alt="Logo" className="mb-4 w-32 mx-auto" />
          <h1 className="text-3xl text-white font-bold mb-4">Pul-Par</h1>
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
            <img src={car} alt="car" className="mb-9 mt-8 w-34 mx-auto" />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition"
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center mb-16 bg-white text-purple-600 p-4 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Pul-Par</h1>
          <button
            onClick={() => setMapVisible(!mapVisible)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition mb-4"
          >
            {mapVisible ? "Retornar a Home" : "Ver Mapa"}
          </button>
          {mapVisible ? (
            <div>
              <h2 className="text-2xl mb-4">Mapa de Ubicación</h2>
              <MapContainer
                center={coordinates || [40.4160833, -3.700891]}
                zoom={13}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {coordinates && (
                  <Marker position={coordinates}>
                    <Popup>Tu ubicación</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl mb-4">Enviar Ubicación</h2>
              <form
                onSubmit={handlePost}
                className="flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition mb-4"
                >
                  Obtener Ubicación
                </button>
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-xs"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-full border border-black hover:bg-purple-400 transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
      <footer className="w-full p-4 py-1 mt- text-center text-purple">
        @grupo3 - 2024
      </footer>
    </div>
  );
};

export default App;
