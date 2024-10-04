Pul-Par Frontend
Descripción
Pul-Par es una aplicación web desarrollada como parte del Hackathon de Factoria F5 y Telefónica, celebrado del 2 al 4 de octubre de 2024 en Madrid. Esta aplicación permite a los usuarios anunciar y encontrar plazas de aparcamiento libres en su ciudad, contribuyendo así a la reducción de la contaminación y al cuidado del planeta.

Características
Suscripción de Usuarios: Los usuarios pueden registrarse con su nombre y correo electrónico.
Mapa Interactivo: Los usuarios pueden ver plazas de aparcamiento libres en un mapa interactivo.
Anuncio de Plazas Libres: Los usuarios pueden anunciar plazas de aparcamiento libres utilizando su ubicación actual.
Interfaz Responsiva: La aplicación es completamente responsiva y funciona en dispositivos móviles y de escritorio.
Requisitos
Node.js (v14 o superior)
npm (v6 o superior)
Instalación
Clonar el Repositorio

git clone https://github.com/hackatonf5g3/pul_par_frontend.git
cd pul_par_frontend
Instalar Dependencias

npm install
Iniciar el Servidor de Desarrollo

npm run dev
Esto iniciará el servidor de desarrollo y la aplicación estará disponible en http://localhost:3000.

Iniciar el Servidor de Datos (Opcional)

Si deseas utilizar el servidor de datos local para simular la API, puedes iniciarlo con el siguiente comando:

npm run server
Esto iniciará un servidor JSON en http://localhost:3001.

Uso
Registro de Usuarios:

Ingresa tu nombre y correo electrónico en el formulario de registro.
Haz clic en el botón "Login" para registrarte.
Anuncio de Plazas Libres:

Haz clic en el botón "Anunciar espacios libres" para obtener tu ubicación actual.
Ingresa la ubicación en el campo de texto.
Haz clic en el botón "Enviar" para anunciar la plaza libre.
Ver Plazas Libres en el Mapa:

Haz clic en el botón "Plazas Libres" para ver el mapa interactivo.
El mapa mostrará las plazas de aparcamiento libres anunciadas por otros usuarios.
Contribución
Este proyecto es un trabajo colaborativo desarrollado durante el Hackathon de Factoria F5 y Telefónica. Si deseas contribuir, por favor abre un issue o envía un pull request.
