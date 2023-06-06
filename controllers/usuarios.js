const {response, request} = require("express");


const usuariosGet = (req=request, res=response)=>{
    const query = req.query();
    res.json({
        msg: "msj",
        query
    })
}
const usuariosPut = (req=request, res=response)=>{
    const { id} = req.params;
    res.json({
        msg: "msj",
        id: id
    })
    
}
const usuariosDelete = (req=request, res=response)=>{
    res.json({
        msg: "msj"
    })
    
}
const usuariosPost = (req=request, res=response)=>{
    res.json({
        msg: "msj"
    })
    
}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut

}