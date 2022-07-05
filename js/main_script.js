/* Programa Almacen de Pastas --- Funciones: armar pedido, cobrarlo por caja
y aplicar descuentos, entre otras */

///////// Variables /////////
let precio = 0;     // Precio total del pedido;
let importe = 0;    // Valor con el que paga el cliente;
let pedido = "Pedido:\n";
let carrito = "";   // Destinada a guardar el pedido en el Storage;
let total_DOM = document.getElementById("total");
let ul_carrito = document.getElementById("carrito");
let carrito2 = document.getElementById("carrito2");

///////// Arrays /////////
let array_JSON = [];    // Guardará los productos en formato JSON;

let array_prod = [];    // Guarda los productos como Objetos;
array_prod.push("");
array_prod.push(new productos("Ravioles de calabaza", "280", "Exquisitos ravioles de calabaza horneada y albahaca", array_prod.length));
array_prod.push(new productos("Sorrentinos de 4 quesos", "520", "Sorrentinos de parmesano, roquefort, queso mar del plata y cheddar", array_prod.length));
array_prod.push(new productos("Lasagna rellena", "720", "Lasagna rellena de jamón, queso, espinaca y salsa bolognesa", array_prod.length));

let array_counter = ["","","",""]; // Sirve para contar
///////// Main code /////////

if ((localStorage.getItem("carrito") != null) || (localStorage.getItem("total_price") != null)) {
    carrito = localStorage.getItem("carrito");
    precio = localStorage.getItem("total_price");

    let total1 = document.getElementById("total");
    total1.innerText = total1.innerText + localStorage.getItem("total_price");

    ul_carrito.innerText = localStorage.getItem("carrito");
}




                                 ///// Programa anterior a eventos y DOM /////
/*let main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
while (!isNaN(main_option)) {
    switch (main_option) {
        case 1:
            select_item();
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        case 2:
            if (precio == 0) {
                alert("Usted tiene nada que pagar aún");
            } else {
                importe = +prompt("Ingrese monto con el que paga el usuario: \n" + pedido + "\nTotal a pagar: $" + precio);
                if (isNaN(importe)) {
                    alert("Por favor ingrese un valor en pesos");
                } else {
                    cash_machine();
                }
            }
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        case 3:
            if (precio == 0) {
                alert("Usted tiene nada que pagar aún");
            } else {
                discount();
            }
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        case 4:
            add_prod();
            alert(menu());
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        case 5:
            delete_prod();
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        case 6:
            make_order();
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
        default:
            alert("Ingrese una opción correcta por favor");
            main_option = +prompt("¿Qué desea realizar?\n1- Elegir productos \n2- Pagar \n3- Aplicar descuento \n4- Añadir un nuevo producto \n5- Eliminar un producto existente \n6-Mostrar pedido por DOM \nPulse cualquier letra para salir");
            break;
    }
}*/