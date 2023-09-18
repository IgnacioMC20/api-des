const dotenv = require('dotenv');
dotenv.config(); // Carga las variables de entorno desde .env

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

try {
    mongoose.connect(process.env.db_connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('conectado a la base de datos')   
} catch (error) {
    throw new Error('error al conectar a la base de datos:', error)
}
// Conexión a la base de datos MongoDB

const app = express();

// Middleware para procesar JSON
app.use(bodyParser.json());

// Definir el modelo de datos
const Contacto = mongoose.model('Contacto', {
  nombre: String,
  direccion: String,
  telefono: String,
});

// Ruta para guardar un contacto (POST)
app.post('/contacto', async (req, res) => {
  try {
    const contacto = new Contacto(req.body);
    await contacto.save();
    res.status(201).send(contacto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Ruta para obtener todos los contactos (GET)
app.get('/contacto', async (req, res) => {
  try {
    const contactos = await Contacto.find();
    res.status(200).send(contactos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Puerto en el que se ejecutará la API
const port = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
