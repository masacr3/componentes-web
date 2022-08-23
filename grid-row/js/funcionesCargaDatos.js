function cargardatos(){
    const cods = ["7794000004917",
                  "7613287850355",
                  "7790697000522",
                  "7798113301611",
                  "7790697000522",
                  "7798113301611",
                  "7613287850355",
                  "7790697000522",
                  "7798113301611",
                  "7790697000522",
                ]
    
    cods.forEach(codigo =>{
        var {cod, marca, producto, descripcion, precio} = getProducto(codigo)
        producto += " " + descripcion
        agregarli(cod, marca, producto, "1", precio)
    })
}