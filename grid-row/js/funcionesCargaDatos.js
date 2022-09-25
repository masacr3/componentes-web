function cargardatos(){
    const cods = [
        "7794000006096",
        "7791866001197",
        "7790080014709",
                ]
    
    cods.forEach(codigoBarras =>{
        carritoAgregar(codigoBarras)
    })
}