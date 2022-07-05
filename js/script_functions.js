///////// Functions /////////

function clean() {              // Limpia toda la información en caso de ser necesario;
    localStorage.clear();
    sessionStorage.clear();
    carrito = "";
    precio = 0;
    total_DOM.innerText = "Total: $";
    ul_carrito.innerText = null;
    carrito2.innerHTML = null;
    array_counter["", "", "", ""];
}

function cash_machine() {       //Máquina registradora;
    let total2 = document.getElementById("total");
    if (precio == 0) {
        Swal.fire({
            icon: "warning",
            title: 'Usted tiene nada que pagar aún',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    } else {
        //importe = +prompt("Ingrese monto con el que paga el usuario: \n" + pedido + "\nTotal a pagar: $" + precio);
        Swal.fire({
            title: "Ingrese monto con el que paga el usuario: \n",
            text: "\nTotal a pagar: $" + precio,
            input: 'number',
            inputLabel: 'Monto:',
            showCancelButton: true,
            inputValidator: (value) => {
                if (value) {
                    importe = parseInt(value);
                } else {
                    return 'Debe ingresar un monto!'
                }
            }
        }).then((respuesta) => {
            importe = respuesta.value;
            if (importe > precio) {
                let vuelto = importe - precio;
                //alert("Gracias por su compra" + "\nDar $" + vuelto + " de vuelto");
                Swal.fire(
                    '¡Gracias por su compra!',
                    'Dar ' + vuelto + ' de vuelto',
                    'success'
                );
                console.log("Vuelto: $" + vuelto);
                precio = 0; ul_carrito.innerHTML = ""; total2.innerText = "Total: $"; pedido = "Pedido:\n"; carrito = "";
                localStorage.clear();
                array_JSON = [];
            } else if (importe == precio) {
                //alert("Gracias por su compra.");
                Swal.fire(
                    '¡Gracias por su compra!',
                    "",
                    'success'
                );
                precio = 0; ul_carrito.innerHTML = ""; total2.innerText = "Total: $"; pedido = "Pedido:\n"; carrito = "";
                localStorage.clear();
                array_JSON = [];
            } else {
                //alert("Le faltan $" + (precio - importe));
                Swal.fire(
                    'Le faltan $' + (precio - importe),
                    '',
                    'warning'
                );
                console.log("Le faltan $" + (precio - importe));
            }
        })
        console.log("Total: $" + precio);
        console.log("Importa con: $" + importe);
    }
    return precio;
}

function build_JSON() {         //Sube la info de los productos al div con fetch, a partir del JSON local;
    fetch('js/JSONobjects.json')
        .then((res) => {
            console.log(res);
            return res.json();
        })
        .then((data) => {
            let html = "";
            data.forEach((data) => {
                html += `
                <li>${data._name}<br><b>Precio: $</b>${data._price}<br><b>Descripción:</b> ${data._description}</li>
                <br>
                `
            });
            carrito2.innerHTML = html;
        });
}

function menu() {               //Generadora del menu;
    let menu = "Pulse cualquier letra para terminar------------------Total: $" + precio + "\n";
    for (let i = 1; i < array_prod.length; i++) {
        menu += i + "- " + array_prod[i].show_product() + "\n \n";
    }
    return menu;
}

function discount() {           //Generadora de descuentos;
    if (precio == 0) {
        //alert("Usted tiene nada que pagar aún");
        Swal.fire({
            icon: "warning",
            title: 'Usted tiene nada que pagar aún',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    } else {
        //let disc = +prompt("Ingrese el porcentaje del descuento: ");
        let disc = 0;
        Swal.fire({
            title: "Ingrese el porcentaje del descuento: \n",
            //text: "\nTotal a pagar: $" + precio,
            input: 'number',
            showCancelButton: true,
            inputValidator: (value) => {
                if (value) {
                    disc = parseInt(value);
                } else {
                    return 'Debe ingresar un porcentaje numérico mayor a 0'
                }
            }
        }).then((respuesta) => {
            disc = respuesta.value;
            if ((!isNaN(disc)) && (disc > 0)) {
                precio = precio - (precio * (disc / 100));
                total_DOM.innerText = "Total: $" + precio + " - Descuento del " + disc + "% aplicado";
                localStorage.setItem("total_price", precio);
                console.log("El nuevo precio con el descuento del " + disc + "% es: $" + precio);
            } /*else {
            alert("Ingrese un valor numérico o mayor a 0 por favor");
        }*/
        })
    }
    return precio;
}

function select_item() {        //Seleccionar y armar el pedido;
    let user_option = +prompt(menu());
    while (!isNaN(user_option)) {
        precio += array_prod[user_option]._price; // El += suma la variable + lo nuevo
        pedido = pedido + "- " + array_prod[user_option]._name + " = $" + array_prod[user_option]._price + "\n"
        user_option = +prompt(menu());
    }
    console.log(pedido);
    return precio;
}

function make_list(_id) {       // Arma la lista del carrito y guarda la información en localStorage;
    precio = parseInt(precio) + array_prod[_id]._price;
    total_DOM.innerText = "Total: $" + precio; // Armo el precio total en el DOM;
    localStorage.setItem("total_price", precio);    // Guardo el precio en el Storage;

    ++array_counter[_id];   //Contador por producto;

    ul_carrito.innerHTML += `<li>${array_prod[_id]._name + " - Precio: $" + array_prod[_id]._price}</li>`;
    carrito += array_prod[_id]._name + " - Precio: $" + array_prod[_id]._price + "\n";
    localStorage.setItem("carrito", carrito);

    objets_JSON(_id);   //Lo guardo en JSON para un uso futuro;
    localStorage.setItem("lista_JSON", array_JSON);
    copy_carrito = ul_carrito;

    return ul_carrito;
}

function objets_JSON(_id) {     // Convierto cada item en string para almacenar el objeto en JSON;
    let prod = JSON.stringify(array_prod[_id]);
    array_JSON.push(prod);
}

function add_prod() {           //Añadir nuevo producto;
    let new_name = prompt("Ingrese el nombre del nuevo producto:");
    let new_price = +prompt("Ingrese el precio del nuevo producto:");
    let new_description = prompt("Ingrese la descripción del nuevo producto:");
    array_prod.push(new productos(new_name, new_price, new_description, array_prod.length));
}

function delete_prod() {        //Eliminar un producto existente;
    let seach_var = +prompt("Ingrese el ID del producto a eliminar: \n" + menu());
    if (seach_var > array_prod.length) {
        alert("Usted ingreso un ID que no existe");
    } else {
        let new_array = array_prod.filter(array_prod => array_prod._id != seach_var);
        array_prod = new_array;
        alert("Producto eliminado correctamente.");
    }
}

function make_order() {         // FUERA DE SERVICIO
    if (pedido == "Pedido:\n") {
        alert("Usted no armó un pedido aún.");
    } else {
        let list = document.getElementById("order");
        list.innerText = pedido;
        document.list.appendChild(list);
    }
}

function total_import(rav, sorr, las) {     // FUERA DE SERVICIO
    precio = (rav.value * array_prod[1]._price) + (sorr.value * array_prod[2]._price) +
        (las.value * array_prod[3]._price);
    return precio;
}