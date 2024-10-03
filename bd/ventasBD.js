const ventasBD = require("./conexion").ventas;
const Venta = require("../modelos/VentasModelo");


function validarDatos(venta) {
    var valido = false;
    if (venta.idUsuario != undefined && venta.idProducto != undefined && venta.fecha != undefined && venta.hora != undefined && venta.estatus != undefined ) {
        valido = true;
    }
    return valido;
}


async function mostrarVentas() {
    try {
        console.log("Iniciando la función para mostrar ventas");
        
        // Intentamos obtener las ventas de Firebase
        const ventasSnapshot = await ventasBD.get();
        console.log("Datos obtenidos desde Firebase:", ventasSnapshot);

        // Comprobamos si se recibieron ventas
        if (ventasSnapshot.empty) {
            console.log("No se encontraron ventas.");
            return [];
        }

        let ventasValidas = [];
        
        // Recorremos las ventas
        ventasSnapshot.forEach(venta => {
            console.log("Venta recibida:", venta.data());

            const venta1 = new Venta({ id: venta.id, ...venta.data() });
            console.log("Objeto Venta después de la creación:", venta1.getVenta());
            
            if (validarDatos(venta1.getVenta())) {
                ventasValidas.push(venta.data());
                console.log("Venta válida agregada:", venta.data());
            } else {
                console.log("Venta no válida:", venta1.getVenta());
            }
        });
        
        return ventasValidas;
    } catch (error) {
        console.error("Error al intentar mostrar las ventas:", error);
        throw new Error("Error al mostrar las ventas");
    }
}

async function buscarPorId(id) {
    try {
        console.log(`Buscando venta con ID: ${id}`);
        
        // Obtener el documento por ID desde Firebase
        const ventaDoc = await ventasBD.doc(id).get();
        
        // Verificamos si el documento existe
        if (!ventaDoc.exists) {
            console.log("No se encontró la venta con el ID proporcionado.");
            return null;
        }
        
        // Convertir los datos en un objeto de venta
        const venta = new Venta({ id: ventaDoc.id, ...ventaDoc.data() });
        console.log("Venta encontrada:", venta.getVenta());
        
        return venta.getVenta();
    } catch (error) {
        console.error("Error al buscar la venta por ID:", error);
        throw new Error("No se pudo obtener la venta por ID");
    }
}

async function nuevaVenta(data) {
    try {
        console.log("Datos recibidos para nueva venta:", data);
        
        const venta1 = new Venta(data);
        console.log("Datos de la venta después de crear el objeto Venta:", venta1.getVenta());
        
        var ventaValida = false;
        if (validarDatos(venta1.getVenta())) {
            await ventasBD.doc().set(venta1.getVenta());
            ventaValida = true;
        }
        return ventaValida;
    } catch (error) {
        console.error("Error al agregar nueva venta:", error);
        throw new Error("No se pudo agregar la venta");
    }
}


async function borrarVenta(id) {
    var ventaValida = await buscarPorId(id);
    var ventaBorrado = false;
    if(ventaValida) {
        await ventasBD.doc(id).delete();
        ventaBorrado = true
    }
    return ventaBorrado;

}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    buscarPorId,
    borrarVenta
}