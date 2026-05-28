const express = require('express'); //importar express y crear servidor
const fs = require(fs); //leer y escribir archivos
const path = require('path'); //manejar rutas de archivos

const app = express(); // estas dos nos permite configurar el servidor.
const PORT = 3000;

app.use(express.json()); //para parsear el cuerpo de las solicitudes como JSON
app.use(express.static(__dirname)); //leer todo tipo de archivos.

const rutaCandidatos = path.join(__dirname, "data", "candidatos.json"); //ruta del archivo de datos
// funcion que nos permite leer los candidatos desde el archivo JSON
function leerCandidatos() {
    
        const data = fs.readFileSync(rutaCandidatos, 'utf-8');
        return JSON.parse(data); //lo convierte en arreglo de javascript
}

function guardarCnadidatos(candidatos) {
    fs.writeFileSync(rutaCandidatos, JSON.stringify(candidatos, null, 2)); //escribir el arreglo de candidatos en el archivo JSON
}
// Ruta para obtener todos los candidatos
 app.get("api/candidatos", function (req, res) {
    const candidatos = leerCandidatos();
    res.json(candidatos);
}); //definir la ruta para obtener los candidatos

// si queremos guardar nuevo candidato hacemos ruta POST
app.post("/api/candidatos", function (req, res) {
    const nuevoCandidato = {
        id: Date.now(), //generar un ID único basado en la fecha y hora.
        nombre: req.body.nombre,
        rol: req.body.rol,
        propuesta: req.body.propuesta,
        estado: "Perfil de práctica académica"
    
    };
    if (!nuevoCandidato.nombre || !nuevoCandidato.rol || !nuevoCandidato.propuesta) {
        return res.status(400).json({ error: "Faltan datos obligatorios" 

        });
    }
    const candidatos = leerCandidatos();
    candidatos.push(nuevoCandidato);
    guardarCandidatos(candidatos);

    res.status(201).json(({
        mensaje ="Perfil Guardado correctamente",
        candidatos: nuevoCandidato
    });
}); //definir la ruta para guardar un nuevo candidato

//iniciar el servidor para que pueda recivir solicitudes
app.listen(PORT, function () {
    console.log("Servidor funcionando  en http://localhost:" + PORT);
});