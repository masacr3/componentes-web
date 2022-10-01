function cargardatos(){
    const cods = [
        "7794000006096",
        "7798048720907",
        "7798001880235",
        "7791954001016",
        "7798031156072",
        "7798031151046",
        "7798031151220",
        "7790036048260"
                ]
    
    cods.forEach(codigoBarras =>{
        carritoAgregar(codigoBarras)
    })
}