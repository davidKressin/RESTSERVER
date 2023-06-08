const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const generarJWT = require("../helpers/jwt");



const login = async(req=request, res=response)=>{
    
    const {correo, password} = req.body;
    
    try{

        //verificar si correo existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "usuario o password no son correctos"
            })
        }
        // si esta Activo 
        if(!usuario.estado){
            return res.status(400).json({
                msg: "usuario inactivo"
            })
        }
        
        // validar password
        const validPassword =  bcryptjs.compareSync(password, usuario.password);
        
        if(!validPassword){
            return res.status(400).json({
                msg: "usuario o password no son correctos"
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id);
        
        res.json({
            usuario,
            token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    login,
}