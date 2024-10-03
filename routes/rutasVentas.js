var rutas = require("express").Router();
var {mostrarVentas, nuevaVenta, borrarVenta, buscarPorId} = require("../bd/ventasBD");


rutas.get("/mostrarVentas",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var ventasValidas = await mostrarVentas();
    //console.log(usuarisValidos);
    res.json(ventasValidas);
});

rutas.get("/buscarVentaPorId/:id", async(req,res) => {
    var ventaValida = await buscarPorId(req.params.id)
    //console.log (usuarioValido);
    res.json(ventaValida);
    
});

rutas.get("/borrarVenta/:id", async(req,res) => {
    var ventaBorrado = await borrarVenta(req.params.id);
    res.json(ventaBorrado);
});

rutas.post("/nuevaVenta", async (req,res) => {
    var ventaValida = await nuevaVenta(req.body);
    console.log(ventaValida);
    res.json(ventaValida);
})

module.exports = rutas;