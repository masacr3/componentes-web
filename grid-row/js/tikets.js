function recoletar_datos(){
    let lis = document.querySelectorAll(".ventas li")

    let articulos = []

    lis.forEach(item =>{
        let producto = item.children[0].getAttribute("data-producto")
        let cantidad = item.children[0].children[0].firstChild.innerHTML
        let marca = item.children[0].children[1].children[0].innerHTML
        let descripcion = item.children[0].children[1].children[1].innerHTML
        let subtotal = item.children[0].children[2].firstChild.innerHTML
        console.log( cantidad, marca, producto ,descripcion, subtotal)
        
        let articulo = {}
        articulo.producto = producto
        articulo.cantidad = cantidad
        articulo.marca = marca
        articulo.descripcion = descripcion
        articulo.subtotal = subtotal

        articulos.push(articulo)
    })

    console.log(articulos)

    return articulos
}