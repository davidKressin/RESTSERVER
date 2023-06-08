const {Schema, model} = require("mongoose");

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "nombre obligatorio"],
    },
    correo: {
        type: String,
        required: [true, "correo obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password obligatorio"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // emun: ["ADMIN_ROLE, USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },
})

//Para que la peticion no nos retorne ni el __v ni la constraseña
// siempre tiene qu ser una funcion normal por que la otra deja el this fuera de la funcion
UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

//mongoose le agrega una ese al primer parametro de la funcion
module.exports = model("Usuario", UsuarioSchema);