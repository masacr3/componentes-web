
// package.action{}


function carritoTotal(){
    var lis = document.querySelectorAll("li")

    var total = 0

    lis.forEach(item =>{
        var cantSubtotal = item.children.item(0).children.item(2).children.item(0)
        total += parseInt(cantSubtotal.innerHTML)
    })
    document.querySelector(".total-value").innerHTML = "$ " + total

}

function carritoEstaProducto(cod){
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

function carritoActualizarProducto(cod, quitar){
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

function carritoAgregarProducto(cod){
    var producto = serviceApiProducto(cod)

    var ul = document.querySelector("ul")

    var li = document.createElement("li")
    li.setAttribute("data-cod-barras", producto.cod)
    li.setAttribute("data-precio", producto.precio)

    var dproducto = document.createElement("div")
    dproducto.classList.add("producto")

    var dcantidad = document.createElement("div")
    dcantidad.classList.add("cant")

    var dcantidadvalue = document.createElement("div")
    dcantidadvalue.classList.add("value")
    dcantidadvalue.innerHTML = producto.cantidad

    var dplaceholdercant = document.createElement("div")
    dplaceholdercant.classList.add("mute")
    dplaceholdercant.innerHTML = "cantidad"

    var darticulo =  document.createElement("div")
    darticulo.classList.add("articulo")

    var dmarca = document.createElement("div")
    dmarca.classList.add("marca")
    dmarca.innerHTML = producto.marca

    var ddescripcion = document.createElement("div")
    ddescripcion.classList.add("descripcion")
    ddescripcion.classList.add("truncado-articulos")
    ddescripcion.innerHTML = producto.descripcion 


    var dsubtotal = document.createElement("div")
    dsubtotal.classList.add("subtotal")

    var dsubtotalvalue = document.createElement("div")
    dsubtotalvalue.classList.add("value")
    dsubtotalvalue.innerHTML = producto.precio

    var dplaceholdersubtotal = document.createElement("div")
    dplaceholdersubtotal.classList.add("mute-der")
    dplaceholdersubtotal.innerHTML = "subtotal"

    var dborrar = document.createElement("div")
    dborrar.classList.add("borrar")
    dborrar.classList.add("no-show")

    var dtitulo = document.createElement("div")
    dtitulo.classList.add("titulo")
    dtitulo.innerHTML = "Borrar articulo?"

    var dok = document.createElement("div")
    dok.classList.add("ok")
    dok.innerHTML = "Ok"

    var dcancel = document.createElement("div")
    dcancel.classList.add("cancel")
    dcancel.innerHTML = "Cancelar"

    //armamos el arbol de dependencias

    dcantidad.appendChild(dcantidadvalue)
    dcantidad.appendChild(dplaceholdercant)
    darticulo.appendChild(dmarca)
    darticulo.appendChild(ddescripcion)
    dsubtotal.appendChild(dsubtotalvalue)
    dsubtotal.appendChild(dplaceholdersubtotal)
    dproducto.appendChild(dcantidad)
    dproducto.appendChild(darticulo)
    dproducto.appendChild(dsubtotal)
    dborrar.appendChild(dtitulo)
    dborrar.appendChild(dok)
    dborrar.appendChild(dcancel)

    li.appendChild(dproducto)
    li.appendChild(dborrar)

    ul.appendChild(li)


    //agrego el scrolling si hay mas de X li en el UL
    if ( document.querySelectorAll("li").length > 5 ){
        ul.classList.add("scrolling")
    }
  
}