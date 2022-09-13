function listaEventos(){
    document.querySelector("ul").addEventListener("click",e=>{

        var apretoBorrar = e.target.innerHTML === "Ok"
        var apretoCancelar = e.target.innerHTML === "Cancelar"
        var apretoCantidad = e.target.parentNode.className === "cant" || e.target.className === "cant"
    
        var padre = e.target.parentNode
       //busco el Li subiendo por los nodos
        while( padre.tagName !== "LI"){
            padre = padre.parentNode
        }
        
        if (apretoCantidad){
            var cod = padre.getAttribute("data-cod-barras")
            carritoQuitar(cod)

            if( document.querySelectorAll("li").length < 6 ){
                document.querySelector("ul").classList.remove("scrolling")
            }
            carritoTotal()
            return
        }
    
        if (apretoBorrar){
            padre.parentNode.removeChild(padre)
            
            if( document.querySelectorAll("li").length < 6 ){
                document.querySelector("ul").classList.remove("scrolling")
            }

            var lis = document.querySelectorAll("li")
            if( lis.length === 0 ){
                var ul = document.querySelector("ul")
                var li = document.createElement("li")
                li.setAttribute("data-cod-barras", "0000")
                li.classList.add("no-productos")
                li.innerHTML = "No hay articulos en su carrito"
                ul.appendChild(li)
            }
            carritoTotal()
            return
        }
    
        if (apretoCancelar){
            var producto = padre.children.item(0)
            var borrar = padre.children.item(1)
            borrar.classList.add("no-show")
            producto.classList.remove("no-show")
            carritoTotal()
            return
    
        }
    
        var producto = padre.children.item(0)
        var borrar = padre.children.item(1)
    
        producto.classList.add("no-show")
        borrar.classList.remove("no-show")
    
    })

    document.querySelector("#codbarras").addEventListener("keypress", e=>{
        if (e.key === "Enter"){
            var codbarras = document.querySelector("#codbarras")
            carritoAgregar(codbarras.value)
            carritoTotal()
            codbarras.value = ""
        }
    })

    document.querySelectorAll("img").forEach(item=>{
        item.addEventListener("click",e=>{
            if(item.getAttribute("data-menu") === "carritoOn"){
                console.log("clickeo carrito")
            }
            if(item.getAttribute("data-menu") === "agregarOn"){
                console.log("clickeo agregar")
            }
            if(item.getAttribute("data-menu") === "actualizarOn"){
                console.log("clickeo actualizar")
            }
        })
    })
}