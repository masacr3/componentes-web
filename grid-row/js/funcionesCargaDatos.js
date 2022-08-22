function cargardatos(){
    var cods = ["123","234","123","1425","512","2323","123456"]
    var marca = ["Luchetti","Sony","Luchetti","190","Ala","Toddy","Coca cola"]
    var descripcion = ["Fideo moñito 500g","Jostick playstation 4 original guerra","Fideo moñito 500g","Fiambre mortadela","Arroz 500g","Chocolate 500g","2.25l"]
    var cants = ["1","1","1","1","1","1","1"]
    var precios = ["190","23000","190","190","150","200","350"]
    
    for(let i=0; i<6; i++){
        agregarli(cods[i],marca[i], descripcion[i], cants[i], precios[i])
    }
}