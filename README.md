ToDo List - Backend API (Express + MySQL)

Este proyecto es un backend para una aplicación de lista de tareas (ToDo List) construido con **Node.js**, **Express** y **MySQL**. Está preparado para ejecutarse localmente o con Docker.

__________________________________________________________________________________________________________________________________________________________________________________________________

Requisitos

- Node.js (v16+ recomendado)
- MySQL instalado o usar Docker
- npm
- (Opcional) Docker y Docker Compose

__________________________________________________________________________________________________

Instalación

1. Clona el repositorio:

bash
git clone https://github.com/tu-usuario/todolist-express-backend.git
cd todolist-express-backend
______________________________________________________________________________________________________
Instala las dependencias:
npm install
_________________________________________________________________________________________________
Crea un archivo .env con el siguiente contenido:

MONGO_URI= # deja vacío o elimina si no usas MongoDB
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=wp
MYSQL_DATABASE=mysql
__________________________________________________________________________________________
Ejecuta en modo desarrollo:
npm run dev
__________________________________________

ó en modo producción:
npm start
__________________________________________________________
Uso con Docker (opcional)
1.Asegúrate de tener Docker y Docker Compose instalados.
2.Lanza el contenedor con MySQL:
_______________________________________________________________
docker-compose up -d

Verifica que el contenedor esté activo:
docker ps
________________________________________________________
Endpoints disponibles
Método	Ruta	Descripción
GET	/tasks/getTasks	Obtener todas las tareas
POST	/tasks/addTask	Agregar una nueva tarea
DELETE	/tasks/removeTask/:id	Eliminar una tarea por ID

Nota: Requiere header Authorization: 123456 para acceder.
___________________________________________________________________________
Autor
Desarrollado por Javier Eduardo Lara García






