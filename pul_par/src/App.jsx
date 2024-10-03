import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [location, setLocation] = useState('');
  const [plazaNumber, setPlazaNumber] = useState('');
  const [mapVisible, setMapVisible] = useState(false);

  const handleSubscription = () => {
    setIsSubscribed(true);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-endpoint.com/locations', {
        location,
        plazaNumber,
      });
      console.log('Data submitted:', response.data);
      // Reset form or show success message
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      {!isSubscribed ? (
        <div>
          <h1>Bienvenido a Pul-Par</h1>
          <button onClick={handleSubscription}>Suscribirse</button>
        </div>
      ) : (
        <div>
          <h1>Pul-Par</h1>
          <button onClick={() => setMapVisible(!mapVisible)}>
            {mapVisible ? 'Retornar a Home' : 'Ver Mapa'}
          </button>
          {mapVisible ? (
            <div>
              <h2>Mapa de Ubicación</h2>
              {/* Aquí puedes insertar el componente de mapa */}
              <p>Mapa se mostraría aquí.</p>
            </div>
          ) : (
            <div>
              <h2>Enviar Ubicación</h2>
              <form onSubmit={handlePost}>
                <input
                  type="text"
                  placeholder="Ubicación"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Número de Plaza"
                  value={plazaNumber}
                  onChange={(e) => setPlazaNumber(e.target.value)}
                  required
                />
                <button type="submit">Enviar</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;