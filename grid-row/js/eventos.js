function listaEventos(){
    document.querySelector("ul").addEventListener("click",e=>{

        var apretoBorrar = e.target.innerHTML === "Ok"
        var apretoCancelar = e.target.innerHTML === "Cancelar"
        var apretoCantidad = e.target.parentNode.className === "cant" || e.target.className === "cant"
        
        console.log("apreto cantidad",apretoCantidad)
    
        var padre = e.target.parentNode
       //busco el Li subiendo por los nodos
        while( padre.tagName !== "LI"){
            padre = padre.parentNode
        }
        
        if (apretoCantidad){
            var cod = padre.getAttribute("data-cod-barras")
            actualizarProducto(cod, true)
            if( document.querySelectorAll("li").length < 6 ){
                document.querySelector("ul").classList.remove("scrolling")
            }
            calcularTotalCarrito()
            return
        }
    
        if (apretoBorrar){
            padre.parentNode.removeChild(padre)
            if( document.querySelectorAll("li").length < 6 ){
                document.querySelector("ul").classList.remove("scrolling")
            }
            calcularTotalCarrito()
            return
        }
    
        if (apretoCancelar){
            var producto = padre.children.item(0)
            var borrar = padre.children.item(1)
            borrar.classList.add("no-show")
            producto.classList.remove("no-show")
            calcularTotalCarrito()
            return
    
        }
    
        var producto = padre.children.item(0)
        var borrar = padre.children.item(1)
    
        producto.classList.add("no-show")
        borrar.classList.remove("no-show")
    
    })
}