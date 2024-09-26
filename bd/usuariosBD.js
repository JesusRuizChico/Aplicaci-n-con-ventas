const usuariosBD = require("./conexion").usuarios;
const {encriptarPassword, validarPassword, usuarioAutorizado, adminAutorizado} = require("../middlewares/funcionesPassword"); 
const Usuario=require("../modelos/UsuarioModelo");
const {}=require("../modelos/UsuarioModelo");


function validarDatos(usuario){
    var valido = false;
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}


async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    //console.log(usuarios.id);
    usuariosValidos = [];
    usuarios.forEach( usuario => {
        const usuario1 = new Usuario({id:usuario.id,...usuario.data()});
        if (validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
        
    });
    // console.log(usuariosValidos);
    return usuariosValidos;
    
}

// mostrarUsuarios();


async function buscarPorID(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario)) {
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
}



//buscarPorID("6UCKH0nCyIjQrCsyZrJ4");

async function nuevoUsuario(data) {
    console.log(data);
    
    // Validación para asegurar que el campo 'password' no esté vacío o undefined
    if (!data.password) {
        throw new Error("El campo de contraseña es obligatorio.");
    }

    // Encriptar la contraseña si está presente
    const {salt, hash} = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";

    const usuario1 = new Usuario(data);
    var usuarioValido = false;

    // Validar los datos del usuario antes de proceder
    if (validarDatos(usuario1.getUsuario)) {
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido = true;
    }

    return usuarioValido;
}
   
/* data = {
    nombre:"BetilloGuerrero",
    usuario:"musica regional",
    password:"xyz"
} 


async function prueba() {
    console.log(await nuevoUsuario(data));
}
*/ 

async function borrarUsuario(id) {
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if (usuarioValido) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
    
}

module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID
}

// borrarUsuario("miEjemploBD");

