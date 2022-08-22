function agregarli(cod, marca, descripcion, cant, precio){
                
    if ( estaProducto (cod) ){
        actualizarProducto(cod, false)
        console.log("actualizo producto")
        return
    }
    
    var ul = document.querySelector("ul")

    //verifica si esta vacio el carrito
    if ( document.querySelectorAll("li").length == 2 && document.querySelectorAll("li")[1].innerHTML === "El carrito se encuentra vacio"){
        ul.removeChild(document.querySelectorAll("li")[1])
    }

    var li = document.createElement("LI")

    li.setAttribute("data-cod-barras", cod)
    li.setAttribute("data-precio",precio)

    var _producto = document.createElement("DIV")
    var _cant = document.createElement("DIV")
    var _cantValue = document.createElement("DIV")
    var placeholderCant = document.createElement("DIV")
    var _articulo = document.createElement("DIV")
    var _marca = document.createElement("DIV")
    var _descripcion = document.createElement("DIV")
    var _subtotal = document.createElement("DIV")
    var _cantSubtotal = document.createElement("DIV")
    var placeholderSubtotal = document.createElement("DIV")
    var borrar = document.createElement("DIV")
    var titulo = document.createElement("DIV")
    var ok = document.createElement("DIV")
    var cancel = document.createElement("DIV")

    //agregamos las clases correspondientes
    _producto.classList.add("producto")
    _cant.classList.add("cant")
    _cantValue.classList.add("value")
    placeholderCant.classList.add("mute")
    _articulo.classList.add("articulo")
    _marca.classList.add("marca")
    _descripcion.classList.add("descripcion")
    _descripcion.classList.add("truncado-articulos")
    _subtotal.classList.add("subtotal")
    _cantSubtotal.classList.add("value")
    placeholderSubtotal.classList.add("mute-der")
    borrar.classList.add("borrar")
    borrar.classList.add("no-show")
    titulo.classList.add("titulo")
    ok.classList.add("ok")
    cancel.classList.add("cancel")
    
    //agregamos el texto correspondiente
    _cantValue.innerHTML = cant
    placeholderCant.innerHTML = "cantidad"
    _marca.innerHTML = marca
    _descripcion.innerHTML = descripcion
    _cantSubtotal.innerHTML = precio
    placeholderSubtotal.innerHTML = "subtotal"
    titulo.innerHTML = "Borrar articulo?"
    ok.innerHTML = "Ok"
    cancel.innerHTML = "Cancelar"


    //agregamos dependencia entre objetos
    _cant.append(_cantValue)
    _cant.appendChild(placeholderCant)
    _articulo.appendChild(_marca)
    _articulo.appendChild(_descripcion)
    _subtotal.appendChild(_cantSubtotal)
    _subtotal.appendChild(placeholderSubtotal)
    _producto.appendChild(_cant)
    _producto.appendChild(_articulo)
    _producto.appendChild(_subtotal)
    borrar.appendChild(titulo)
    borrar.appendChild(ok)
    borrar.appendChild(cancel)

    li.appendChild(_producto)
    li.appendChild(borrar)

    ul.appendChild(li)

    calcularTotalCarrito()

    if ( document.querySelectorAll("li").length > 5 ){
        ul.classList.add("scrolling")
    }

}