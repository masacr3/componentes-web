const HOST = "http://192.168.0.52:3000"

function consultar(){
    var conn = HOST +"/obtenerproducto"

    fetch(conn).then(res=>res.json())
    .then(res => console.log(res))
}

function obtener(cod){
    var conn =  HOST +"/obtenerproducto/"+cod

    fetch(conn).then(res=>res.json())
    .then(res => console.log(res))
}

function crear(producto){
    var conn = HOST + "/crearproducto"

    fetch(conn,{
        method : "POST",
        body : JSON.stringify(producto),
        headers : { "Content-Type" : "a" }
    })
}