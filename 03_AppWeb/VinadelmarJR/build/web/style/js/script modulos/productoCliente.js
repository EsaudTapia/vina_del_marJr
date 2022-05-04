function mostrarMercanciaAlCliente() {
   mostrarListaPlatillos(pedido.menu);
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Tostadas') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card ">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divTostadas").html(contenido);

                    }
                    mostrarEnsalada();
                    mostrarCocteles();
                    mostrarCaldoySopas();
                    mostrarAguachiles();
                   mostrarPescadoFrito();
                   mostrarPescadoCamarones();
                   mostrarPescadoBebidas();
                   
                    
                }
            }
        }
    });
 
}

function mostrarCocteles(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Cocteles') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card ">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divCocteles").html(contenido);

                    }
                   
            
                    
                }
            }
        }
    });
    
}

function mostrarEnsalada(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Ensaladas') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divEnsalada").html(contenido);

                    }
                   
            
                    
                }
            }
        }
    });
    
}


function mostrarCaldoySopas(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Caldo y Sopas') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card ">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divCaldoySopas").html(contenido);

                    }
                   
            
                    
                }
            }
        }
    });
    
}


function mostrarAguachiles(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Aguachiles') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card ">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divAguachiles").html(contenido);

                    }
                   
            
                    
                }
            }
        }
    });
    
}

function mostrarPescadoFrito(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Pescado Frito') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divPescadoFrito").html(contenido);

                    }
                   
            
                    
                }
            }
        }
    });
    
}



function mostrarPescadoCamarones(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Camarones') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card ">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divCamarones").html(contenido);

                    }
                }
            }
        }
    });
    
}

function mostrarPescadoBebidas(){
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/productoAlcliente/getAll",
                data: data

            }).done(function (data) {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,A iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#divmenucard").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    if (menu[i].categoria.nombre === 'Bebidas') {
                        contenido +=
                                '<div  class=" col-sm-4 p-md-1" id="productoMercancia' + i + '">' +
                                '<div class="card">' +
                                '<div class="card-header " > ' +
                                '  <h5 id="nomproductoM" class="text-center" >' + menu[i].nombre + '</h5>' +
                                ' </div>' +
                                ' <div id="dtscliente" class="card-body text-center">' +
                                " <img id='imgFoto' width='100' height='100' alt='' " +
                                " src='data:image/png;base64," + menu[i].foto + "' />" +
                                ' <div class="modal-footer">' +
                                ' <span id="contDinamico">' + '</span>' +
                                '  </div>' +
                                '<h5 id="precioM" class="text-center" > Precio: ' + menu[i].precio + '</h5>' +
                                "<td> <button onclick='seleccionarPlatillo(" + i + ")' class='btn btn-success mx-4''><i class='fas fa-shopping-basket'></i>Añadir</button></td>"+
                                ' </div>' +
                                ' </div>' +
                                '</div> ';
                        $("#divBebidas").html(contenido);

                    }
                }
            }
        }
    });
    
}