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
                    let ulpedido = document.querySelector(".pedido-verduleria")
                    verduras.forEach((verdura,i) =>{
                        var li = document.createElement("li")
                        li.classList.add("v-li")

                        var dproducto = document.createElement("div")
                        var dprecio = document.createElement("div")

                        dproducto.classList.add("centralizar")
                        dproducto.classList.add("v-producto")
                        dprecio.classList.add("centralizar")
                        dprecio.classList.add("v-precio")

                        dproducto.innerHTML = verdura.producto
                        dprecio.innerHTML = "$ " + verdura.preciop + "/ kg"
                        
                        var dcontenedor = document.createElement("div")
                        dcontenedor.classList.add("no-show")

                        var kg = document.createElement("input")
                        kg.setAttribute("placeholder","kg")
                        kg.classList.add("kg")
                        
                        var pesos= document.createElement("input")
                        pesos.setAttribute("placeholder","monto")
                        pesos.classList.add("pesos")

                        dcontenedor.appendChild(kg)
                        dcontenedor.appendChild(pesos)

                        li.appendChild(dproducto)
                        li.appendChild(dprecio)

                        dcontenedor.appendChild(kg)
                        dcontenedor.appendChild(pesos)
                        
                        li.appendChild(dcontenedor)

                        ul.appendChild(li)

                        pesos.addEventListener("keypress",e=>{
                            if(e.key === "Enter"){
                                var lipedido = document.createElement("li")
                                lipedido.classList.add("v-li")
                                var dproductopedido = document.createElement("div") 
                                var dvaluepedido = document.createElement("div")
                                var bton = document.createElement("button")


                                dproductopedido.classList.add("centralizar")
                                dproductopedido.classList.add("v-producto")
                                dvaluepedido.classList.add("centralizar")
                                dvaluepedido.classList.add("v-precio")

                                var dcontenedor = document.createElement("div")
                                dcontenedor.classList.add("no-show")

                                dproductopedido.innerHTML = verdura.producto
                                dvaluepedido.innerHTML = pesos.value

                                bton.innerHTML = "Eliminar"
                                bton.addEventListener("click",e=>{
                                    ulpedido.removeChild(lipedido)
                                })

                                lipedido.addEventListener("mouseenter",e=>{
                                    lipedido.classList.add("v-expandir")
                                    dvaluepedido.classList.remove("v-precio")
                                    dvaluepedido.classList.add("v-precio-mute")
                                    dcontenedor.classList.remove("no-show")
                                })
        
                                lipedido.addEventListener("mouseleave",e=>{
                                    lipedido.classList.remove("v-expandir")
                                    dvaluepedido.classList.remove("v-precio-mute")
                                    dvaluepedido.classList.add("v-precio")
                                    dcontenedor.classList.add("no-show")
                                    kg.value = ""
                                    pesos.value = ""
                                })
                                
                                dcontenedor.appendChild(bton)
                                lipedido.appendChild(dproductopedido)
                                lipedido.appendChild(dvaluepedido)
                                lipedido.appendChild(dcontenedor)
                                ulpedido.appendChild(lipedido) 
                                pesos.value = ""
                            }   
                        })

                        kg.addEventListener("keypress", e=>{
                            if(e.key === "Enter"){
                                var precioKG = parseInt(verdura.preciop)
                                var subtotal = Math.trunc( parseFloat(kg.value) * precioKG )
                               
                                var lipedido = document.createElement("li")
                                lipedido.classList.add("v-li")
                                var dproductopedido = document.createElement("div") 
                                var dvaluepedido = document.createElement("div")
                                var bton = document.createElement("button")

                                dproductopedido.classList.add("centralizar")
                                dproductopedido.classList.add("v-producto")
                                dvaluepedido.classList.add("centralizar")
                                dvaluepedido.classList.add("v-precio")

                                var dcontenedor = document.createElement("div")
                                dcontenedor.classList.add("no-show")

                                bton.innerHTML = "Eliminar"
                                bton.addEventListener("click",e=>{
                                    ulpedido.removeChild(lipedido)
                                })

                                lipedido.addEventListener("mouseenter",e=>{
                                    lipedido.classList.add("v-expandir")
                                    dvaluepedido.classList.remove("v-precio")
                                    dvaluepedido.classList.add("v-precio-mute")
                                    dcontenedor.classList.remove("no-show")
                                })
        
                                lipedido.addEventListener("mouseleave",e=>{
                                    lipedido.classList.remove("v-expandir")
                                    dvaluepedido.classList.remove("v-precio-mute")
                                    dvaluepedido.classList.add("v-precio")
                                    dcontenedor.classList.add("no-show")
                                    kg.value = ""
                                    pesos.value = ""
                                })
                                
                                dproductopedido.innerHTML = verdura.producto
                                dvaluepedido.innerHTML = subtotal


                                dcontenedor.appendChild(bton)
                                lipedido.appendChild(dproductopedido)
                                lipedido.appendChild(dvaluepedido)
                                lipedido.appendChild(dcontenedor)
                                ulpedido.appendChild(lipedido) 
                                kg.value = ""
                            }
                        })

                        li.addEventListener("mouseenter",e=>{
                            li.classList.add("v-expandir")
                            dprecio.classList.remove("v-precio")
                            dprecio.classList.add("v-precio-mute")
                            dcontenedor.classList.remove("no-show")
                        })

                        li.addEventListener("mouseleave",e=>{
                            li.classList.remove("v-expandir")
                            dprecio.classList.remove("v-precio-mute")
                            dprecio.classList.add("v-precio")
                            dcontenedor.classList.add("no-show")
                            kg.value = ""
                            pesos.value = ""
                        })

                    })
                })
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
            if(item.getAttribute("data-menu") === "salirVerduleria"){
                document.querySelector(".verduleria").innerHTML = ""
                document.querySelector(".pedido-verduleria").innerHTML = ""
                console.log("clickeo frutas")
                let col1 = document.querySelector(".col1")
                let col2 = document.querySelector(".col2")
                let col3 = document.querySelector(".col3")
                col1.classList.remove("no-show")
                col2.classList.remove("no-show")
                col3.classList.add("no-show")
            }
            if(item.getAttribute("data-menu") === "agregarAVentas"){
                var lis = document.querySelectorAll(".pedido-verduleria li")
                let noShow = () =>{
                    let col1 = document.querySelector(".col1")
                    let col2 = document.querySelector(".col2")
                    let col3 = document.querySelector(".col3")
                    col1.classList.remove("no-show")
                    col2.classList.remove("no-show")
                    col3.classList.add("no-show")
                }
                if( lis.length === 0 ){
                    document.querySelector(".verduleria").innerHTML = ""
                    document.querySelector(".pedido-verduleria").innerHTML = ""
                    noShow()
                    return
                }

                lis.forEach(item =>{
                    var producto = armarProductoPorLi(item)
                    carritoAgregarNoIndexado(producto)
                })

                document.querySelector(".verduleria").innerHTML = ""
                document.querySelector(".pedido-verduleria").innerHTML = ""
                noShow()
            }
        })
    })
}