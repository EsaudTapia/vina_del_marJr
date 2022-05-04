var menu = [];//borramos el contenido del arreglo de menu que estab en formato json

function alerta() {
    Swal.fire
            ({
                icon: 'success',
                title: 'Hecho',
                text: 'Guardado Exitosamente!'
            });
}

function mostrarTablaMenu() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    $("#btnAdd").prop("disabled", false); //agregar empleado
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/menu/getAll",
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
                   
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no hay platillos registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyMenu").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + menu[i].nombre + '</td>' + //variables del modelo en java                              
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + (menu[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMenu(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + menu[i].nombre + '</td>' + //variables del modelo en java                              
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + (menu[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMenu(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyMenu").html(contenido);
        }
    });
}

function mostrarActivosEmpleados() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/empleado/getAll",
                data: data
            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++)
            {
                if (menu[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + menu[i].id + '</td>' + //variables del modelo en java                            
                            '<td id="nombre' + i + '">' + menu[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + menu[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + menu[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + menu[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + menu[i].correo + '">' + menu[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + menu[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + menu[i].persona.calle + " #" + menu[i].persona.numero + ", " + menu[i].persona.colonia + ". " + menu[i].persona.cp + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteEmpleado(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyEmpleados").html(contenido);
        }
    });
}

function mostrarInactivosEmpleados()
{
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/empleado/getAll",
                data: data
            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++)
            {
                if (menu[i].persona.estatus === 0) {
                    contenido +=
                            '<tr id="empleado' + i + '">' +
                            '<td id="idEmpleado' + i + '">' + menu[i].id + '</td>' + //variables del modelo en java                            
                            '<td id="nombre' + i + '">' + menu[i].persona.nombre + '</td>' +
                            '<td id="aPaterno' + i + '">' + menu[i].persona.apellidoPaterno + '</td>' +
                            '<td id="aMaterno' + i + '">' + menu[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + menu[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' +
                            '<a href="mailto:' + menu[i].correo + '">' + menu[i].correo + '</a>' +
                            '</td>' +
                            '<td id="telefono' + i + '">' + menu[i].persona.tel1 + '</td>' +
                            '<td id="direccion' + i + '">' + menu[i].persona.calle + " #" + menu[i].persona.numero + ", " + menu[i].persona.colonia + ". " + menu[i].persona.cp + '</td>' +
                            '<td>' + (menu[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editEmpleado(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarEmpleado(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyEmpleados").html(contenido);
        }
    });
}

function filtrarEmp() {
    var optFiltro = parseInt($("#selectFiltro").val());
    switch (optFiltro) {
        case 0:
            mostrarTablaMenu();
            break;
        case 1:
            mostrarInactivosEmpleados();
            break;
        case 2:
            mostrarActivosEmpleados();

            break;
    }

}

function deleteMenu(i)
{
    var token = localStorage.getItem("token");
    var id = menu[i].idMenu;
    var data = {idMenu: id, token: token};
    $.ajax
            ({
                type: "POST",
                url: "rest/menu/delete",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null)
        {
            Swal.fire("Error en la eliminación",
                    data.exception,
                    "error");
        } else {
            {
                Swal.fire("Eliminación exitosa",
                        "Registro eliminado correctamente",
                        "success");
                mostrarTablaMenu();
            }
        }


    });
}

function activarMenu(i) {
    var token = localStorage.getItem("token");
    var id = menu[i].idMenu;
    var data = {idMenu: id, token: token};
    $.ajax
            ({
                type: "POST",
                url: "rest/menu/activar",
                async: true,
                data: data
            }).done(function (data)
    {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null)
        {
            Swal.fire("Error en la Activacion",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Actualización exitosa",
                    "Registro activado correctamente",
                    "success");
            mostrarTablaMenu();
        }

    });
}


$("#btnAdd").click(function ()
{
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Platillo");
    $("#btnEditMenu").hide();
    $("#btnAddMenu").show();

    $("#txtNombre").val(null);
    $("#selectCategoria").val(2);
    $("#txtDescripcion").val(null);
    $("#txtPrecio").val(null);
    $("#fileImage").val(null);
    $("#txtBase64").val(null);
    $("#espacioimg").removeAttr("src");
    $("#descImg").show();
    $("#chkMenuActivo").prop("checked", true);
    $("#chkMenuActivo").prop("disabled", true);


});

function confirmarNuevoMenu() {

    var nombre = $("#txtNombre").val();
    nombre = normalizar(nombre);
    nombre = limpiar(nombre);

    var idCategoria = $("#selectCategoria").val();
   

    var descripcion = $("#txtDescripcion").val();
    descripcion = normalizar(descripcion);
    descripcion = limpiar(descripcion);

    var precio = $("#txtPrecio").val();
    precio = normalizar(precio);
    precio = limpiar(precio);

    var foto = $("#txtBase64").val();

    $.ajax
            ({
                type: "POST",
                url: "rest/menu/save",
                async: true,
                data:
                        {
                            nombre: nombre,
                            idCategoria: idCategoria,
                            descripcion: descripcion,
                            precio: precio,
                            foto: foto,
                            token: localStorage.getItem("token")
                        }

            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            })

        } else if (data.exception != null)
        {
            Swal.fire("Error en el registro",
                    data.exception,
                    "error");
        } else
        {
            mostrarTablaMenu();
        }
    });
    mostrarTablaMenu();
    mostrarTablaMenu();
    alerta();
    mostrarTablaMenu();
    mostrarTablaMenu();

}

function editMenu(i)
{
    localStorage.setItem("editId", menu[i].idMenu);
    $("#exampleModalLabel").removeClass("text-success");
    $("#exampleModalLabel").html("Editar Platillo");
    $("#exampleModalLabel").addClass("text-warning");
    $("#chkEmpleadoActivo").prop("disabled", true);
    $("#btnEditMenu").show();
    $("#btnAddMenu").hide();
    
    $("#txtIdMenu").val(menu[i].idMenu);
    $("#txtIdCategoria").val(menu[i].categoria.idCategoria);
    $("#txtNombre").val(menu[i].nombre);
    $("#selectCategoria").val(menu[i].categoria.idCategoria);
    $("#txtDescripcion").val(menu[i].descripcion);
    $("#txtPrecio").val(menu[i].precio);
    if (menu[i].foto !== "") {
        $("#descImg").hide();
        $("#espacioimg").attr('src', "data:image/png;base64," + menu[i].foto);
    } 
    else
    {
        $("#descImg").show();
    }
    $("#fileImage").val(null);
    $("#txtBase64").val(menu[i].foto);

    var estatus = menu[i].estatus;
    if (estatus === 1) {
        chkMenuActivo.checked = true;
    } else {
        chkMenuActivo.checked = false;
    }
}

function guardarEditMenu()
{
    var idMenu = localStorage.getItem("editId");
    var nombre = $("#txtNombre").val();
    nombre = normalizar(nombre);
    nombre = limpiar(nombre);

    var nombreCategoria = $("#selectCategoria").val();
    

    var descripcion = $("#txtDescripcion").val();
    descripcion = normalizar(descripcion);
    descripcion = limpiar(descripcion);

    var precio = $("#txtPrecio").val();
    precio = normalizar(precio);
    precio = limpiar(precio);

    var foto = $("#txtBase64").val();

    $.ajax
            ({
                type: "POST",
                url: "rest/menu/save",
                async: true,
                data:
                        {
                            idMenu: idMenu,            
                            nombre: nombre,
                            idCategoria: nombreCategoria,
                            descripcion: descripcion,
                            precio: precio,
                            foto: foto,
                            token: localStorage.getItem("token")
                        }
            }).done(function (data)
    {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null)
        {
            Swal.fire("Error en la modificación",
                    data.exception,
                    "error");
        } else
        {
            Swal.fire("Modificación exitosa",
                    "Empleado actualizado correctamente",
                    "success");
            mostrarTablaMenu();
        }
    });
}

function cargarFotografia(objetoInput) {
    if (objetoInput.files && objetoInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e)
        {
            var fotoB64 = e.target.result;
            $("#espacioimg").attr('src', fotoB64);
            $("#txtBase64").val(fotoB64.substring(22, fotoB64.length));
            $("#descImg").hide();
        };

        reader.readAsDataURL(objetoInput.files[0]);
    }
}



function imprimir(tblMenu) {
//   window.print ();
    var contenido = document.getElementById(tblMenu).innerHTML;

    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}

function searchMenu() {

    var contenido = "";

    var busqueda = $("#txtbuscar").val();
    busqueda = normalizar(busqueda);
    busqueda = limpiar(busqueda);

    var data = {palabra: busqueda, token: localStorage.getItem('token')};
    $.ajax({
        type: "GET",
        url: "rest/menu/search",
        data: data,
        async: true
    }).done(function (data)
    {
        if (data == null) {

            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";

                }
            })

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.error == "No hay datos") {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes platillos con ese nombre en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyMenu").html(contenido);
            return;
        } else
        {
            menu = data;
            for (var i = 0; i < menu.length; i++) {
                if (menu[i].estatus === 1) {
                    contenido +=
                            '<tr>' +
                            '<td>' + menu[i].nombre + '</td>' + //variables del modelo en java                              
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + (menu[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMenu(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr>' +
                            '<td>' + menu[i].nombre + '</td>' + //variables del modelo en java                              
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + (menu[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMenu(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyMenu").html(contenido);
        }
    });
    $("#txtbuscar").val(null);

}

function mostrarActivosMenu() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/menu/getAll",
                data: data
            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++)
            {
                if (menu[i].estatus === 1) {
                    contenido +=
                            '<tr id="menu' + i + '">' +
                            '<td id="nombre' + i + '">' + menu[i].nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteMenu(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyMenu").html(contenido);
        }
    });
}

function mostrarInactivosMenu() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/menu/getAll",
                data: data
            }).done(function (data) {
        if (data == null) {
            Swal.fire({
                title: 'sesion caducada',
                text: "se ha cerrado la sesion!",
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'ir,a iniciar sesion !'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });

        } else if (data.exception != null) {
            Swal.fire("La operacion no pudo ser completada",
                    data.exception,
                    "error");
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyEmpleados").html(contenido);
            return;
        } else {
            menu = data;
            for (var i = 0; i < menu.length; i++)
            {
                if (menu[i].estatus === 0) {
                    contenido +=
                            '<tr id="menu' + i + '">' +
                            '<td id="nombre' + i + '">' + menu[i].nombre + '</td>' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + menu[i].foto + "' /></td>" +
                            '<td>' + menu[i].categoria.nombre + '</td>' +
                            '<td>' + menu[i].descripcion + '</td>' +
                            '<td> $' + menu[i].precio + '</td>' +
                            '<td>' + '<i class="fal fa-check-square"></i>' + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-warning" onclick="editMenu(' + i + ');" data-toggle="modal" data-target="#exampleModal"><i class="fal fa-edit"></i> Editar</button>' +
                            '<button class="btn btn-sm btn-success" onclick="activarMenu(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</tr>';
                }
            }
            $("#tbodyMenu").html(contenido);
        }
    });
}

function filtrarMenu() {
    var optFiltro = parseInt($("#selectFiltro").val());
    switch (optFiltro) {
        case 0:
            mostrarTablaMenu();
            break;
        case 1:
            mostrarInactivosMenu();
            break;
        case 2:
            mostrarActivosMenu();

            break;
    }

}