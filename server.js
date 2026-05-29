const express = require('express'); //importar express y crear servidor
const fs = require("fs"); //leer y escribir archivos
const path = require('path'); //manejar rutas de archivos

const app = express(); // estas dos nos permite configurar el servidor.
const PORT = 3000;

app.use(express.json()); //para parsear el cuerpo de las solicitudes como JSON
app.use(express.static(__dirname)); //leer todo tipo de archivos.

const rutaCandidatos = path.join(__dirname, "data", "candidatos.json"); //ruta del archivo de datos
const rutaVotos = path.join(__dirname, "data", "votos.json"); //ruta del archivo de votos path,join unir parte de una ruta
// funcion que nos permite leer los candidatos desde el archivo JSON
function leerVotos() {
    const data = fs.readFileSync(rutaVotos, 'utf-8');
    return JSON.parse(data); //lo convierte en arreglo de javascript
}
//funcion para guardar los votos en el archivo JSON, recibe un arreglo de votos y lo escribe en el archivo JSON
function guardarVotos(votos) {
    fs.writeFileSync(rutaVotos, JSON.stringify(votos, null, 2)); //escribir el arreglo de votos en el archivo JSON
}

function leerCandidatos() {
    
        const data = fs.readFileSync(rutaCandidatos, 'utf-8');
        return JSON.parse(data); //lo convierte en arreglo de javascript
}

function guardarCandidatos(candidatos) {
    fs.writeFileSync(rutaCandidatos, JSON.stringify(candidatos, null, 2)); //escribir el arreglo de candidatos en el archivo JSON
}
// Ruta para obtener todos los candidatos
 app.get("/api/candidatos", function (req, res) {
    const candidatos = leerCandidatos();
    res.json(candidatos);
}); //definir la ruta para obtener los candidatos

app.get("/api/votos", function (req, res){
    const votos = leerVotos();
    res.json(votos);
})

//registrar un voto en el servidor
app.post("/api/votos", function (req, res) {
    const indentificacion = req.body.indentificacion;
    const candidato = req.body.candidato;
    if (!indentificacion || !candidato) {
        return res.status(400).json({ error: "Faltan datos: identificacion o candidato" });
    }
        id: Date.now(); //generar un ID único basado en la fecha y hora.

        const votos = leerVotos();

        const yaVotos = votos.find(function (voto) {
            return voto.indentificacion === indentificacion;
        });
        if (yaVotos) {
            return res.status(400).json({ error: "Esta identificaciòn ya registrò un voto pedagògico" });
        }
        const nuevoVoto = {
            id: Date.now(),
            indentificacion: indentificacion,
            candidato: candidato,
            fecha: new Date().toISOString() // Agregar la fecha del voto
        };

        votos.push(nuevoVoto);
        guardarVotos(votos);

        res.status(201).json({
            mensaje: "Voto pedagògico guardado correctamente",
            voto: nuevoVoto
        });
});
    // Verificar si el usuario ya ha votado

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
        mensaje: "Perfil Guardado correctamente",
        candidatos: nuevoCandidato
    }));
}); //definir la ruta para guardar un nuevo candidato
//iniciar el servidor para que pueda recivir solicitudes
app.listen(PORT, function () {
    console.log("Servidor funcionando  en http://localhost:" + PORT);
});
