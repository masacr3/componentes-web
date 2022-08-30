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
    
    cods.forEach(codigoBarras =>{
        carritoAgregar(codigoBarras)
    })
}