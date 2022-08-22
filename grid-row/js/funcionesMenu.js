function elegirMenu(){
    var imgs = document.querySelectorAll("img")
    imgs.forEach(item=>{
        item.addEventListener("click",e=>{
            if(item.getAttribute("data-menu") === "carrito"){
                console.log("clickeo carrito")
                item.classList.add("move-left")
                item.parentElement.children.item(1).classList.add("move-left")
            }
        })
    })
}