// package.action{}

function armarProductoPorLi(li, i){
    var producto = {}
    producto.cod = "verduleria"+i
    producto.marca = "verduleria"
    producto.producto = li.children[0].innerHTML
    producto.preciopublico = li.children[1].innerHTML
    producto.descripcion = producto.producto
    return producto
}

//modularizacion agregar producto
function agregarProducto(producto){
    var ul = document.querySelector(".ventas")
    var lis = document.querySelectorAll(".ventas li")
    if( lis.length === 1 && lis[0].getAttribute("data-cod") === "0000" ){
        lis[0].remove()
    }

    var li = document.createElement("li")
    li.setAttribute("data-cod-barras", producto.cod)
    li.setAttribute("data-precio", producto.preciopublico)

    var dproducto = document.createElement("div")
    dproducto.classList.add("producto")
    dproducto.setAttribute("data-producto", producto.producto)

    var dcantidad = document.createElement("div")
    dcantidad.classList.add("cant")

    var dcantidadvalue = document.createElement("div")
    dcantidadvalue.classList.add("value")
    dcantidadvalue.innerHTML = "1"

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
    dsubtotalvalue.innerHTML = producto.preciopublico

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
}

//calcula el total del carrito de compras
function carritoTotal(){
    var lis = document.querySelectorAll(".ventas li")


    var total = 0
    if (! (lis.length === 1 && lis[0].getAttribute("data-cod") === "0000") ){
        lis.forEach(item =>{
            var cantSubtotal = item.children.item(0).children.item(2).children.item(0)
            total += parseInt(cantSubtotal.innerHTML)
        })
    }
    
    document.querySelector(".total-value").innerHTML = "$ " + total
}

//verifica si el articulo esta en el carrito
function carritoEstaProducto(cod){
    var lis = document.querySelectorAll("li")
    if (lis.length === 0) return false

    var ok = false
    lis.forEach(item =>{
        var codigoBarras = item.getAttribute("data-cod")
        if(codigoBarras === cod){
            ok = true
        }
    })
    return ok
}

//modifica el articulo en el carrito
// en el caso de quitar el elemento si la cantidad es 0 lo quita del carrito
function carritoActualizarProducto(cod, quitar){
    var item = null
    document.querySelectorAll("li").forEach(it =>{
        if ( it.getAttribute("data-cod") === cod) item = it
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

//agrega un elemento al carrito
//pre no verifica si el elemento esta en el carrito
//eso lo tendria q verificar otra funcion
function carritoAgregarProducto(cod){
    var servicioApi = new ServicesApiProductos()
    servicioApi.obtener(cod)
    .then(res => res.json())
    .then(res=>{
        let producto = res.articulo
        
        if (producto.cod === "0000") return;

        agregarProducto(producto)

        //agrego el scrolling si hay mas de X li en el UL
        // if ( document.querySelectorAll("li").length > 5 ){
        //     let ul = document.querySelector(".ventas")
        //     ul.classList.add("scrolling")
        // }

        carritoTotal()
    })
}

//wrappers
function carritoAgregar(cod){

    if ( carritoEstaProducto(cod) === true ){
        carritoActualizarProducto(cod, false)
    }
    else{
        var lis = document.querySelectorAll(".ventas li")
        if( lis.length === 1 && lis[0].getAttribute("data-cod") === "0000" ){
            lis[0].remove()
        }
        carritoAgregarProducto(cod)
    }
    carritoTotal()
}

//agrega productos No indexados 
//contrato
// cod, producto, marca, preciopublico, descripcion
function carritoAgregarNoIndexado(producto){
    agregarProducto(producto)
    carritoTotal()
}

function carritoVaciar(){
    var { ulVentas } = contenedoresUlVenta()
    liVacio( ulVentas )
    carritoTotal()
}

function carritoQuitar(cod){
    if ( !carritoEstaProducto(cod) ) return;
    
    carritoActualizarProducto(cod, true)
    var lis = document.querySelectorAll(".ventas li")
    if( lis.length === 0 ){
        var ul = document.querySelector(".ventas")
        var li = document.createElement("li")

        li.setAttribute("data-cod", "0000")
        li.classList.add("no-productos")
        li.innerHTML = "No hay articulos en su carrito"

        ul.appendChild(li)

    }
    carritoTotal()
}

