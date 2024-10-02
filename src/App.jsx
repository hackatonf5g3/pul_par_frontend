import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.png"; // Asegúrate de tener un logo en esta ruta

const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [location, setLocation] = useState("");
  const [plazaNumber, setPlazaNumber] = useState("");
  const [mapVisible, setMapVisible] = useState(false);

  const handleSubscription = () => {
    setIsSubscribed(true);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/locations", {
        location,
        plazaNumber,
      });
      console.log("Data submitted:", response.data);
      setLocation("");
      setPlazaNumber("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center justify-center p-4">
      {!isSubscribed ? (
        <div className="text-center">
          <img src={logo} alt="Logo" className="mb-4 w-32 mx-auto" />
          <h1 className="text-4xl text-white font-bold mb-4">
            Bienvenido a Pul-Par
          </h1>
          <button
            onClick={handleSubscription}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Suscribirse
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">Pul-Par</h1>
          <button
            onClick={() => setMapVisible(!mapVisible)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition mb-4"
          >
            {mapVisible ? "Retornar a Home" : "Ver Mapa"}
          </button>
          {mapVisible ? (
            <div>
              <h2 className="text-2xl text-white mb-4">Mapa de Ubicación</h2>
              <p className="text-white">Mapa se mostraría aquí.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl text-white mb-4">Enviar Ubicación</h2>
              <form
                onSubmit={handlePost}
                className="flex flex-col items-center"
              >
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-xs"
                />
                <input
                  type="number"
                  placeholder="Número de Plaza"
                  value={plazaNumber}
                  onChange={(e) => setPlazaNumber(e.target.value)}
                  required
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-xs"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
