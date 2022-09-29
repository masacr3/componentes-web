function listaEventos(){
    /************************ verduleria     ********************************** */
    function mostrarSolamenteVerduleria(){
        document.querySelector(".col1").classList.add("no-show")
        document.querySelector(".col2").classList.add("no-show")
        document.querySelector(".col3").classList.remove("no-show")
        document.querySelector(".v-col-menu.sticky").classList.remove("no-show")
    }

    function mostrarSolamenteVentas(){
        document.querySelector(".col1").classList.remove("no-show")
        document.querySelector(".col2").classList.remove("no-show")
        document.querySelector(".col3").classList.add("no-show")
        document.querySelector(".v-col-menu.sticky").classList.add("no-show")
    }

    function mostrarModalActualizar(li){
        var modal = document.querySelector(".modal.actualizar")                    
        modal.setAttribute("data-codbarras",li.getAttribute("data-cod"))
        modal.classList.remove("no-show")
    }

    function cargarModalInputs(li, dproducto){
        var inputs = document.querySelectorAll(".actualizar .v-cargar")
        inputs[1].value = li.getAttribute("data-precio")
        inputs[0].value = dproducto.innerHTML
        inputs[0].focus()
        inputs[0].select() 
    }

    function verduleriaLi(verdura, ul){
        var li = document.createElement("li")
        li.classList.add("v-li")
        li.setAttribute("data-cod",verdura.cod)
        li.setAttribute("data-precio",verdura.preciop)
        var dproducto = document.createElement("div")
        var dprecio = document.createElement("div")            
        var dproducto = document.createElement("div")
        var dprecio = document.createElement("div")                
        dproducto.classList.add("centralizar")
        dproducto.classList.add("v-producto")
        dprecio.classList.add("centralizar")
        dprecio.classList.add("v-precio")
        dproducto.innerHTML = verdura.producto
        dprecio.innerHTML = "$ " + verdura.preciop + " / kg"
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

        return { li , dproducto , dprecio, kg, pesos, dcontenedor }
    }

    function verduleriaPedidoLi(ulpedido, dproducto, pesos, kg){
        var lis = document.querySelectorAll(".pedido-verduleria li")
        if( lis.length === 1 && lis[0].getAttribute("data-cod") === "0000" ){    
            lis[0].remove()
        }
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

        dproductopedido.innerHTML = dproducto.innerHTML
        dvaluepedido.innerHTML = kg ? pesos : pesos.value

        bton.innerHTML = "Eliminar"

        dcontenedor.appendChild(bton)
        lipedido.appendChild(dproductopedido)
        lipedido.appendChild(dvaluepedido)
        lipedido.appendChild(dcontenedor)
        ulpedido.appendChild(lipedido)

        return { lipedido, bton, dcontenedor, dvaluepedido}
    }

    function verduleriaLiVacio(ul){
        let li = document.createElement("li")
        // <li class="no-productos" data-cod-barras="0000">
        //             No hay verduras ni frutas en su pedido
        //         </li>
        li.innerHTML = "No hay verduras ni frutas en su pedido"
        li.classList.add("no-productos")
        li.setAttribute("data-cod","0000")
        ul.appendChild(li)
    }

    function contenedoresUl(){
        var ullista = document.querySelector(".verduleria")
        var ulpedido = document.querySelector(".pedido-verduleria")

        return { ullista, ulpedido }
    }

    /************************   ventas    **************************************/
    
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

    /*********************** verduleria app ************************************ */
    document.querySelector(".col1 .menu .route-verduleria").addEventListener("click",e=>{
        console.log("ir a verduleria")
        mostrarSolamenteVerduleria()
        var ip = localStorage.getItem("coneccionservidor")
        var url = "http://"+ ip +":3000/verduleria";
        fetch(url).then(res=>res.json())
            .then(res=>{
                console.log(res)
                let verduras = res.verduras
                var { ullista, ulpedido} = contenedoresUl()
                verduras.forEach((verdura,i) =>{
                    // obtiene todos los elementos
                    var { li , dproducto , dprecio, kg, pesos, dcontenedor } = verduleriaLi(verdura, ullista)
                        
                    // eliminar
                    dproducto.addEventListener("click",e=>{
                        var cod = li.getAttribute("data-cod")
                        let serverDelete = "http://"+ip+":3000/producto/"+cod
                        fetch(serverDelete,{method:"DELETE"})
                            .then(res=>res.json())
                            .then(res=>{
                                if (res.ok){
                                    console.log("ELIMINADO")
                                    ullista.removeChild(li)
                                }
                            })
                        })
                        
                    // actualizar
                    dprecio.addEventListener("click",e=>{
                        mostrarModalActualizar(li)
                        cargarModalInputs(li, dproducto)
                    })

                    // comportamiento para mostrar inputs
                    li.addEventListener("mouseenter",e=>{
                        li.classList.add("v-expandir")
                        dprecio.classList.remove("v-precio")
                        dprecio.classList.add("v-precio-mute")
                        dcontenedor.classList.remove("no-show")
                    })

                    // comportamiento para mostrar inputs
                    li.addEventListener("mouseleave",e=>{
                        li.classList.remove("v-expandir")
                        dprecio.classList.remove("v-precio-mute")
                        dprecio.classList.add("v-precio")
                        dcontenedor.classList.add("no-show")
                        kg.value = ""
                        pesos.value = ""
                    })

                    pesos.addEventListener("keypress",e=>{
                        if(e.key === "Enter" || e.key === "NumpadEnter"){
                            var { lipedido , bton, dcontenedor, dvaluepedido } = verduleriaPedidoLi(ulpedido, dproducto, pesos, false)
                            bton.addEventListener("click",e=>{
                                ulpedido.removeChild(lipedido)
                                var lis = document.querySelectorAll(".pedido-verduleria li")
                                if( lis.length === 0 ){
                                    verduleriaLiVacio(ulpedido)
                                }
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
                            
                            pesos.value = ""
                        }   
                    })

                    kg.addEventListener("keypress", e=>{
                        if(e.key === "Enter"){
                            var precioKG = parseInt(li.getAttribute("data-precio"))
                            var subtotal = Math.trunc( parseFloat(kg.value) * precioKG )
                            var { lipedido , bton, dcontenedor, dvaluepedido } = verduleriaPedidoLi(ulpedido, dproducto, subtotal, true)
                            bton.addEventListener("click",e=>{
                                ulpedido.removeChild(lipedido)
                                var lis = document.querySelectorAll(".pedido-verduleria li")
                                if( lis.length === 0 ){
                                    verduleriaLiVacio(ulpedido)
                                }
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
                            kg.value = ""
                        }
                    })

                })
        })
    })

    document.querySelector(".col3 .salirVerduleria").addEventListener("click",e=>{
        var {ullista,ulpedido} = contenedoresUl()
        ullista.innerHTML = ""
        ulpedido.innerHTML = ""
        verduleriaLiVacio(ulpedido)
        mostrarSolamenteVentas()
    })

    document.querySelector(".v-btn-formulario").addEventListener("click",e=>{
        let modal = document.querySelector(".modal.cargar")
        modal.classList.remove("no-show")
        document.querySelectorAll(".modal.cargar .v-cargar")[0].focus()
    })

    /**************************************************************************/

    document.querySelectorAll(".v-cargar").forEach((item,i)=>{
        item.addEventListener("keypress", e=>{
            if(e.key == "Enter" || e.key === "NumpadEnter"){
                if(i===0){
                    document.querySelectorAll(".v-cargar")[1].focus()
                }
                else if (i==1){
                    document.querySelector(".v-btn-cargar").focus()
                }
            }
        })
    })

    document.querySelectorAll(".actualizar .v-cargar").forEach((item,i)=>{
        item.addEventListener("keypress", e=>{
            if(e.key == "Enter" || e.key === "NumpadEnter"){
                if(i===0){
                    document.querySelectorAll(".actualizar .v-cargar")[1].focus()
                    document.querySelectorAll(".actualizar .v-cargar")[1].select()
                }
                else if (i==1){
                    document.querySelector(".v-btn-actualizar").focus()
                }
            }
        })
    })

    document.querySelectorAll("img").forEach(item=>{
        item.addEventListener("click",e=>{
            // if(item.getAttribute("data-menu") === "frutason"){
            //     mostrarSolamenteVerduleria()
            //     var ip = localStorage.getItem("coneccionservidor")
            //     var url = "http://"+ ip +":3000/verduleria";
            //     fetch(url).then(res=>res.json())
            //     .then(res=>{
            //         console.log(res)
            //         let verduras = res.verduras
            //         var { ullista, ulpedido} = contenedoresUl()
            //         verduras.forEach((verdura,i) =>{
            //             // obtiene todos los elementos
            //             var { li , dproducto , dprecio, kg, pesos, dcontenedor } = verduleriaLi(verdura, ullista)

            //             // eliminar
            //             dproducto.addEventListener("click",e=>{
            //                 var cod = li.getAttribute("data-cod")
            //                 let serverDelete = "http://"+ip+":3000/producto/"+cod
            //                 fetch(serverDelete,{method:"DELETE"})
            //                 .then(res=>res.json())
            //                 .then(res=>{
            //                     if (res.ok){
            //                         console.log("ELIMINADO")
            //                         ullista.removeChild(li)
            //                     }
            //                 })
            //             })
                        
            //             // actualizar
            //             dprecio.addEventListener("click",e=>{
            //                 mostrarModalActualizar()
            //                 cargarModalInputs(li)
            //             })

            //             // pesos.addEventListener("keypress",e=>{
            //             //     if(e.key === "Enter"){
            //             //         var lis = document.querySelectorAll(".pedido-verduleria li")
            //             //         if( lis.length === 1 && lis[0].getAttribute("data-cod-barras") === "0000" ){
            //             //             lis[0].remove()
            //             //         }
            //             //         var lipedido = document.createElement("li")
            //             //         lipedido.classList.add("v-li")
            //             //         var dproductopedido = document.createElement("div") 
            //             //         var dvaluepedido = document.createElement("div")
            //             //         var bton = document.createElement("button")


            //             //         dproductopedido.classList.add("centralizar")
            //             //         dproductopedido.classList.add("v-producto")
            //             //         dvaluepedido.classList.add("centralizar")
            //             //         dvaluepedido.classList.add("v-precio")

            //             //         var dcontenedor = document.createElement("div")
            //             //         dcontenedor.classList.add("no-show")

            //             //         dproductopedido.innerHTML = dproducto.innerHTML
            //             //         dvaluepedido.innerHTML = pesos.value

            //             //         bton.innerHTML = "Eliminar"
            //             //         bton.addEventListener("click",e=>{
            //             //             ulpedido.removeChild(lipedido)
            //             //             var lis = document.querySelectorAll(".pedido-verduleria li")
            //             //             if( lis.length === 0 ){
            //             //                 var li = document.createElement("li")

            //             //                 li.setAttribute("data-cod-barras", "0000")
            //             //                 li.classList.add("no-productos")
            //             //                 li.innerHTML = "No hay articulos en su carrito"

            //             //                 ulpedido.appendChild(li)
            //             //             }
            //             //         })

            //             //         lipedido.addEventListener("mouseenter",e=>{
            //             //             lipedido.classList.add("v-expandir")
            //             //             dvaluepedido.classList.remove("v-precio")
            //             //             dvaluepedido.classList.add("v-precio-mute")
            //             //             dcontenedor.classList.remove("no-show")
            //             //         })
        
            //             //         lipedido.addEventListener("mouseleave",e=>{
            //             //             lipedido.classList.remove("v-expandir")
            //             //             dvaluepedido.classList.remove("v-precio-mute")
            //             //             dvaluepedido.classList.add("v-precio")
            //             //             dcontenedor.classList.add("no-show")
            //             //             kg.value = ""
            //             //             pesos.value = ""
            //             //         })
                                
            //             //         dcontenedor.appendChild(bton)
            //             //         lipedido.appendChild(dproductopedido)
            //             //         lipedido.appendChild(dvaluepedido)
            //             //         lipedido.appendChild(dcontenedor)
            //             //         ulpedido.appendChild(lipedido) 
            //             //         pesos.value = ""
            //             //     }   
            //             // })

            //             // kg.addEventListener("keypress", e=>{
            //             //     if(e.key === "Enter"){
            //             //         var precioKG = parseInt(li.getAttribute("data-precio"))
            //             //         var subtotal = Math.trunc( parseFloat(kg.value) * precioKG )
                               
            //             //         var lis = document.querySelectorAll(".pedido-verduleria li")
            //             //         if( lis.length === 1 && lis[0].getAttribute("data-cod-barras") === "0000" ){
            //             //             lis[0].remove()
            //             //         }

            //             //         var lipedido = document.createElement("li")
            //             //         lipedido.classList.add("v-li")
            //             //         var dproductopedido = document.createElement("div") 
            //             //         var dvaluepedido = document.createElement("div")
            //             //         var bton = document.createElement("button")

            //             //         dproductopedido.classList.add("centralizar")
            //             //         dproductopedido.classList.add("v-producto")
            //             //         dvaluepedido.classList.add("centralizar")
            //             //         dvaluepedido.classList.add("v-precio")

            //             //         var dcontenedor = document.createElement("div")
            //             //         dcontenedor.classList.add("no-show")

            //             //         bton.innerHTML = "Eliminar"
            //             //         bton.addEventListener("click",e=>{
            //             //             ulpedido.removeChild(lipedido)
            //             //             var lis = document.querySelectorAll(".pedido-verduleria li")
            //             //             if( lis.length === 0 ){
            //             //                 var li = document.createElement("li")

            //             //                 li.setAttribute("data-cod-barras", "0000")
            //             //                 li.classList.add("no-productos")
            //             //                 li.innerHTML = "No hay articulos en su carrito"

            //             //                 ulpedido.appendChild(li)
            //             //             }
            //             //         })

            //             //         lipedido.addEventListener("mouseenter",e=>{
            //             //             lipedido.classList.add("v-expandir")
            //             //             dvaluepedido.classList.remove("v-precio")
            //             //             dvaluepedido.classList.add("v-precio-mute")
            //             //             dcontenedor.classList.remove("no-show")
            //             //         })
        
            //             //         lipedido.addEventListener("mouseleave",e=>{
            //             //             lipedido.classList.remove("v-expandir")
            //             //             dvaluepedido.classList.remove("v-precio-mute")
            //             //             dvaluepedido.classList.add("v-precio")
            //             //             dcontenedor.classList.add("no-show")
            //             //             kg.value = ""
            //             //             pesos.value = ""
            //             //         })
                                
            //             //         dproductopedido.innerHTML = dproducto.innerHTML
            //             //         dvaluepedido.innerHTML = subtotal


            //             //         dcontenedor.appendChild(bton)
            //             //         lipedido.appendChild(dproductopedido)
            //             //         lipedido.appendChild(dvaluepedido)
            //             //         lipedido.appendChild(dcontenedor)
            //             //         ulpedido.appendChild(lipedido) 
            //             //         kg.value = ""
            //             //     }
            //             // })

            //             // li.addEventListener("mouseenter",e=>{
            //             //     li.classList.add("v-expandir")
            //             //     dprecio.classList.remove("v-precio")
            //             //     dprecio.classList.add("v-precio-mute")
            //             //     dcontenedor.classList.remove("no-show")
            //             // })

            //             // li.addEventListener("mouseleave",e=>{
            //             //     li.classList.remove("v-expandir")
            //             //     dprecio.classList.remove("v-precio-mute")
            //             //     dprecio.classList.add("v-precio")
            //             //     dcontenedor.classList.add("no-show")
            //             //     kg.value = ""
            //             //     pesos.value = ""
            //             // })

            //         })
            //     })
            // }
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
            // if(item.getAttribute("data-menu") === "salirVerduleria"){
            //     document.querySelector(".verduleria").innerHTML = ""
            //     let ulpedido = document.querySelector(".pedido-verduleria")
            //     ulpedido.innerHTML = ""
            //     let li = document.createElement("li")
            //     // <li class="no-productos" data-cod-barras="0000">
            //     //             No hay verduras ni frutas en su pedido
            //     //         </li>
            //     li.innerHTML = "No hay verduras ni frutas en su pedido"
            //     li.classList.add("no-productos")
            //     li.setAttribute("data-cod-barras","0000")
            //     ulpedido.appendChild(li)

            //     console.log("clickeo frutas")
            //     let col1 = document.querySelector(".col1")
            //     let col2 = document.querySelector(".col2")
            //     let col3 = document.querySelector(".col3")
            //     col1.classList.remove("no-show")
            //     col2.classList.remove("no-show")
            //     col3.classList.add("no-show")
            // }
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
                    let ulpedido = document.querySelector(".pedido-verduleria")
                    ulpedido.innerHTML = ""
                    let li = document.createElement("li")
                    // <li class="no-productos" data-cod-barras="0000">
                    //             No hay verduras ni frutas en su pedido
                    //         </li>
                    li.innerHTML = "No hay verduras ni frutas en su pedido"
                    li.classList.add("no-productos")
                    li.setAttribute("data-cod-barras","0000")
                    ulpedido.appendChild(li)
                    noShow()
                    return
                }

                lis.forEach(item =>{
                    var producto = armarProductoPorLi(item)
                    carritoAgregarNoIndexado(producto)
                })

                document.querySelector(".verduleria").innerHTML = ""
                document.querySelector(".pedido-verduleria").innerHTML = ""
                let ulpedido = document.querySelector(".pedido-verduleria")
                ulpedido.innerHTML = ""
                let li = document.createElement("li")
                // <li class="no-productos" data-cod-barras="0000">
                //             No hay verduras ni frutas en su pedido
                //         </li>
                li.innerHTML = "No hay verduras ni frutas en su pedido"
                li.classList.add("no-productos")
                li.setAttribute("data-cod-barras","0000")
                ulpedido.appendChild(li)
                noShow()
            }
        })
    })

    document.querySelector(".v-btn-actualizar").addEventListener("click",e=>{
        let verduleriaInputs = document.querySelectorAll(".actualizar .v-cargar")
        var ok = true
        verduleriaInputs.forEach(items=>{
            if(items.value === ""){
                ok = false                
            }
        })
        if (!ok){
            return
        }
        let verdura = {}
        verdura.cod = document.querySelector(".modal.actualizar").getAttribute("data-codbarras")
        console.log(verdura.cod)
        verdura.marca = "verduleria"
        verdura.producto = verduleriaInputs[0].value
        verdura.descripcion = verduleriaInputs[0].value
        verdura.precio = verduleriaInputs[1].value
        verdura.preciop = verduleriaInputs[1].value

        var ip = localStorage.getItem("coneccionservidor")
        let server = "http://"+ip+":3000/producto"
        fetch(server, {
            method : "PUT",
                    body : JSON.stringify(verdura),
                    headers : {'Content-Type': 'application/json' }
            }).then(res=> res.json())
            .then(res=>{
                    if(res.ok === "ok"){
                        console.log(res.ok)
                        let lisVerduleria = document.querySelectorAll(".verduleria li")
                        lisVerduleria.forEach(item =>{
                            if(item.getAttribute("data-cod") === verdura.cod){
                                console.log("actualizo")
                                item.children[0].innerHTML = verdura.producto
                                item.children[1].innerHTML = "$ " + verdura.preciop + " / kg" //producto 
                                item.setAttribute("data-precio",verdura.preciop)
                            }
                        })
                        verduleriaInputs.forEach(item=>{
                            item.value = ""
                        })
                        document.querySelector(".modal.actualizar").classList.add("no-show")
                    }
            })
    })

    document.querySelector(".v-btn-cargar").addEventListener("click",e=>{
        let verduleriaInputs = document.querySelectorAll(".cargar .v-cargar")
        var ok = true
        verduleriaInputs.forEach(items=>{
            if(items.value === ""){
                ok = false                
            }
        })
        if (!ok){
            return
        }
        var verdura = {}
        verdura.cod = "esteCamponoseUsa"
        verdura.marca = "verduleria"
        verdura.producto = verduleriaInputs[0].value
        verdura.descripcion = verduleriaInputs[0].value
        verdura.precio = verduleriaInputs[1].value
        verdura.preciop = verduleriaInputs[1].value

        var ip = localStorage.getItem("coneccionservidor")
        let server = "http://"+ip+":3000/verduleria"
        fetch(server, {
            method : "POST",
                    body : JSON.stringify(verdura),
                    headers : {'Content-Type': 'application/json' }
            }).then(res=> res.json())
            .then(res=>{
                    if(res.ok === "ok"){
                        verdura.cod = res.codbarras
                        var modal = document.querySelector(".modal")
                        var vinputs = document.querySelectorAll(".cargar .v-cargar")

                        vinputs.forEach(item => item.value = "")
                        modal.classList.add("no-show")

                        var { ullista, ulpedido } = contenedoresUl()
                        var { li , dproducto , dprecio, kg, pesos, dcontenedor } = verduleriaLi(verdura, ullista)
                        
                    // eliminar
                    dproducto.addEventListener("click",e=>{
                        var cod = li.getAttribute("data-cod")
                        let serverDelete = "http://"+ip+":3000/producto/"+cod
                        fetch(serverDelete,{method:"DELETE"})
                            .then(res=>res.json())
                            .then(res=>{
                                if (res.ok){
                                    console.log("ELIMINADO")
                                    ullista.removeChild(li)
                                }
                            })
                        })
                        
                    // actualizar
                    dprecio.addEventListener("click",e=>{
                        mostrarModalActualizar(li)
                        cargarModalInputs(li, dproducto)
                    })

                    // comportamiento para mostrar inputs
                    li.addEventListener("mouseenter",e=>{
                        li.classList.add("v-expandir")
                        dprecio.classList.remove("v-precio")
                        dprecio.classList.add("v-precio-mute")
                        dcontenedor.classList.remove("no-show")
                    })

                    // comportamiento para mostrar inputs
                    li.addEventListener("mouseleave",e=>{
                        li.classList.remove("v-expandir")
                        dprecio.classList.remove("v-precio-mute")
                        dprecio.classList.add("v-precio")
                        dcontenedor.classList.add("no-show")
                        kg.value = ""
                        pesos.value = ""
                    })

                    pesos.addEventListener("keypress",e=>{
                        if(e.key === "Enter" || e.key === "NumpadEnter"){
                            var { lipedido , bton, dcontenedor, dvaluepedido } = verduleriaPedidoLi(ulpedido, dproducto, pesos, false)
                            bton.addEventListener("click",e=>{
                                ulpedido.removeChild(lipedido)
                                var lis = document.querySelectorAll(".pedido-verduleria li")
                                if( lis.length === 0 ){
                                    verduleriaLiVacio(ulpedido)
                                }
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
                            
                            pesos.value = ""
                        }   
                    })

                    kg.addEventListener("keypress", e=>{
                        if(e.key === "Enter"){
                            var precioKG = parseInt(li.getAttribute("data-precio"))
                            var subtotal = Math.trunc( parseFloat(kg.value) * precioKG )
                            var { lipedido , bton, dcontenedor, dvaluepedido } = verduleriaPedidoLi(ulpedido, dproducto, subtotal, true)
                            bton.addEventListener("click",e=>{
                                ulpedido.removeChild(lipedido)
                                var lis = document.querySelectorAll(".pedido-verduleria li")
                                if( lis.length === 0 ){
                                    verduleriaLiVacio(ulpedido)
                                }
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
                            kg.value = ""
                        }
                    })
                    }

                    //    
                    
            })
            .catch(error=>{
                console.error(error)
            })
    })

    /*++++++++++++++++++++++++++++++++++*/

    document.querySelector(".v-salir").addEventListener("click",e=>{
        let modal = document.querySelector(".modal")
        modal.classList.add("no-show")
    })

    document.querySelector(".actualizar .v-salir").addEventListener("click",e=>{
        let modal = document.querySelector(".modal.actualizar")
        modal.classList.add("no-show")
    })

}