const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        this.authPath = "/api/auth";

        //Conexion base de datos
        this.conectarDB();
        

        //middlewares
        this.middlewares()

        // Lectura y parseo del body
        this.app.use(express.json())


        //rutas
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        // DIRECTORIO PUBLICO
        this.app.use(express.static("public"));
    }

    routes(){
        this.app.use(this.usuariosPath, require("../routes/user"));
        this.app.use(this.authPath, require("../routes/auth"));
    }
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor en puerto ", this.port);
        })
    }
}

module.exports = Server;