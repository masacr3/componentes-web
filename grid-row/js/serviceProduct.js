const productos = [
    { cod : "7794000004917", marca : "knorr", producto : "bolsa para horno", descripcion : "ajo y cebolla", precio : "200"},
    { cod : "7613287850355", marca : "nesquik", producto : "chocolate", descripcion : "180g", precio : "190"},
    { cod : "7790697000522", marca : "sin sal", producto : "galletita", descripcion : "doble", precio : "200"},
    { cod : "7798113301611", marca : "villamanaos", producto : "agua", descripcion : "mineral 2l", precio : "100"}
]

function existeProducto(cod){
    return productos.filter(item => item.cod === cod).length !== 0 
}

function getProducto(cod){
    return productos.filter(item => item.cod === cod)[0]
}



