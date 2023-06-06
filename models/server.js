const express = require("express");
const cors = require("cors");


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios"

        //middlewares
        this.middlewares()

        // Lectura y parseo del body
        this.app.use(express.json())


        //rutas
        this.routes();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        // DIRECTORIO PUBLICO
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.usuariosPath, require("../routes/user"));
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor en puerto ", this.port);
        })
    }
}

module.exports = Server;