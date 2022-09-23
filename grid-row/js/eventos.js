function listaEventos(){
    document.querySelector(".ventas").addEventListener("click",e=>{

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
                document.querySelector(".ventas").classList.remove("scrolling")
            }
            carritoTotal()
            return
        }
    
        if (apretoBorrar){
            padre.parentNode.removeChild(padre)
            
            if( document.querySelectorAll("li").length < 6 ){
                document.querySelector(".ventas").classList.remove("scrolling")
            }

            var lis = document.querySelectorAll("li")
            if( lis.length === 0 ){
                var ul = document.querySelector(".ventas")
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
            if(item.getAttribute("data-menu") === "frutason"){
                console.log("clickeo frutas")
                let col1 = document.querySelector(".col1")
                let col2 = document.querySelector(".col2")
                let col3 = document.querySelector(".col3")
                col1.classList.add("no-show")
                col2.classList.add("no-show")
                col3.classList.remove("no-show")
                var ip = localStorage.getItem("coneccionservidor")
                var url = "http://"+ ip +":3000/verduleria";
                fetch(url).then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    let verduras = res.verduras
                    let ul = document.querySelector(".verduleria")
                    verduras.forEach(verdura =>{
                        var li = document.createElement("li")
                        li.innerHTML = verdura.producto + " " + verdura.preciop
                        ul.appendChild(li)
                    })
                })
            }
            if(item.getAttribute("data-menu") === "agregarOn"){
                console.log("clickeo agregar")
            }
            if(item.getAttribute("data-menu") === "actualizarOn"){
                console.log("clickeo actualizar")
            }
            if(item.getAttribute("data-menu") === "tiket"){
                console.log("clickeo tiket")
                var ip = localStorage.getItem("coneccionservidor")
                var url = "http://"+ ip +":3000/api-pdf";
                //var url = "http://"+ ip +":3000/tiket";
                var data = { "productos": recoletar_datos() };

                console.log(data)
                
                fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(res =>{
                    fetch(url).then(res=> res.blob())
                    .then(data=>{
                        var a = document.createElement("a")
                        a.href = window.URL.createObjectURL(data)
                        a.download = "TIKET"
                        a.click()
                        carritoVaciar()
                    })
                })                
            }
        })
    })
}