const express = require("express");
const usuariosRutas=require("./routes/rutasUsuarios");
const productosRutas=require("./routes/rutasProductos");
const ventasRutas=require("./routes/rutasVentas");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/", ventasRutas);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});