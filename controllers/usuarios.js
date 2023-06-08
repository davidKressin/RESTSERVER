const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), 
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])



    res.json({
        total, 
        usuarios
    })

}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //todo contra bbdd
    if (password) {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({
        usuario
    })

}
const usuariosDelete = async(req = request, res = response) => {
    const {id}= req.params;

    //fisicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    // const usuarioAutenticado = req.usuario;

    // const uid = req.uid;
    res.json({usuario});

}
const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    // con esto solo se crea el documento en mongoo compass
    const usuario = new Usuario({ nombre, correo, password, rol })

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos



    // ......
    await usuario.save();
    res.json({
        msg: "msj",
        usuario
    })

}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut

}