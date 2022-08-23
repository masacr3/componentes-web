function calcularTotalCarrito(){
    var lis = document.querySelectorAll("li")

    var total = 0

    lis.forEach(item =>{
        var cantSubtotal = item.children.item(0).children.item(2).children.item(0)
        total += parseInt(cantSubtotal.innerHTML)
    })
    document.querySelector(".total-value").innerHTML = "$ " + total

}

function estaProducto(cod){
    var lis = document.querySelectorAll("li")
    if (lis.length === 0) return false

    var ok = false
    lis.forEach(item =>{
        var codigoBarras = item.getAttribute("data-cod-barras")
        if(codigoBarras === cod){
            ok = true
        }
    })
    return ok
}

function actualizarProducto(cod, quitar){
    var item = null
    document.querySelectorAll("li").forEach(it =>{
        if ( it.getAttribute("data-cod-barras") === cod) item = it
    })
    
    var precio = item.getAttribute("data-precio")
    var cantValue = item.children.item(0).children.item(0).children.item(0)
    cantValue.innerHTML = parseInt(cantValue.innerHTML) + (quitar ? -1 : 1)
    if (cantValue.innerHTML === "0"){
        item.parentNode.removeChild(item)
        return
    }
    var cantSubtotal = item.children.item(0).children.item(2).children.item(0)
    cantSubtotal.innerHTML = parseInt(precio) * (quitar ? -1 : 1) +  parseInt(cantSubtotal.innerHTML)
    
}