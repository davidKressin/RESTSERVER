const {Router} = require('express');
const {check} = require("express-validator");
const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete} = require("../controllers/usuarios")

const {
    validarCampos,
    validarJWT,
    tieneRole
} = require("../middlewares")

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const router = Router();


router.get("/", usuariosGet)

router.put("/:id", [
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos
],usuariosPut)

router.post("/",[
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("nombre", "El nombre no es válido").not().isEmpty(),
    check("password", "El password es obligatorio y de mas de 6 letras").isLength({min: 6}),
    // check("rol", "El rol no es válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos
] ,usuariosPost)

router.delete("/:id", [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE"),
    check("id", "no es un id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos 
],usuariosDelete) 




module.exports = router;