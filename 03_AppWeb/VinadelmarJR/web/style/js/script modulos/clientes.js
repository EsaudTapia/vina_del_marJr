var clientes = [];

function mostrarTablaCliente()
{
    var contenido = '';
    var token = localStorage.getItem("token");
    var data = {token: token};
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll",
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
                    'Por el momento no tienes Clientes registrados.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else
        {
            clientes = data;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNacimiento' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });
}

function mostraInactivo() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll",
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
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else {

            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 0) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });

}

function mostrarActivos() {
    var token = localStorage.getItem("token");
    var data = {token: token};
    var contenido = '';
    $.ajax
            ({
                type: "GET",
                url: "rest/cliente/getAll",
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
        } else if (data.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'Por el momento no tienes productos en tu catálogo.' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodyclientes").html(contenido);
            return;
        } else {
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }
            $("#tbodyclientes").html(contenido);
        }
    });
}

function filtrarCli() {
    var optFiltro = parseInt($("#selectFiltro").val());

    switch (optFiltro) {
        case 0:
            mostrarTablaCliente();
            break;
        case 1:
            mostraInactivo();
            break;
        case 2:
            mostrarActivos();
            break;
    }
}


function deleteCliente(i)
{
    var token = localStorage.getItem("token");
    var id = clientes[i].persona.id;
    var data = {idPersona: id, token: token};
    $.ajax
            ({
                type: "POST",
                url: "rest/cliente/delete",
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
                mostrarTablaCliente();
            }
        }


    });
}

function activarCliente(i) {
    var token = localStorage.getItem("token");
    var id = clientes[i].persona.id;
    var data = {idPersona: id, token: token};
    $.ajax
            ({
                type: "POST",
                url: "rest/cliente/activar",
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
            mostrarTablaCliente();
        }

    });
}

$("#btnAdd").click(function ()
{
    ocultarContrasenia();
    $("#exampleModalLabel").addClass("text-success");
    $("#exampleModalLabel").removeClass("text-warning");
    $("#exampleModalLabel").html("Agregar Cliente");
    $("#btnEditCliente").hide();
    $("#btnAddCliente").show();
    $("#txtidCliente").val(clientes.length + 1);
    $("#txtnumero_Persona").val(clientes[clientes.length - 1 ].persona.id + 1);
    $("#txtnombre").val(null);
    $("#txtappellido_pat").val(null);
    $("#txt_Calle").val(null);
    $("#txt_numero").val(null);
    $("#txt_Colonia").val(null);
    $("#txt_CP").val(null);
    $("#txt_Ciudad").val(null);
    $("#txt_Estado").val(null);
    $("#txtappellido_mat").val(null);
    $("#txtFecha_nac").val(null);
    $("#txtcorreo").val(null);
    $("#txtContrasenia").val(null);
    $("#txttelefono").val(null);
    $("#chkClienteActivo").prop("checked", true);
    $("#chkClienteActivo").prop("disabled", true);
});

function confirmarNuevoCliente()
{

    var nombre = $("#txtnombre").val();
    var apellidoPaterno = $("#txtappellido_pat").val();
    var apellidoMaterno = $("#txtappellido_mat").val();
    var calle = $("#txt_Calle").val();
    var sexo = $("#selectSexo").val();
    var numero = $("#txt_numero").val();
    var colinia = $("#txt_Colonia").val();
    var cp = $("#txt_CP").val();
    var ciudad = $("#txt_Ciudad").val();
    var estado = $("#txt_Estado").val();
    var fechaNac = $("#txtFecha_nac").val();
    var correo = $("#txtcorreo").val();
    var contrasenia = $("#txtContrasenia").val();
    var tel1 = $("#txttelefono").val();


    $.ajax({
        async: true,
        type: 'POST',
        url: "rest/cliente/save",
        data: {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            calle: calle,
            sexo: sexo,
            numero: numero,
            colonia: colinia,
            cp: cp,
            ciudad: ciudad,
            estado: estado,
            fechaNacimiento: fechaNac,
            correo: correo,
            contrasenia: contrasenia,
            tel1: tel1,
            estatus: 1
        }
    }).done(function (data)
    {
        if (data.exception != null) {
            Swal.fire("la operacion no pudo ser completada",
                    data.exception,
                    "error");

        }
        if (data.result != null) {

            alerta();


        }
    });



}

function editCliente()
{
    ocultarContrasenia();
    var nombre =  localStorage.getItem("nombre");
    
    $("#txtnombre").val(nombre);
    $("#txtappellido_pat").val(localStorage.getItem("apellidoPaterno"));
    $("#txtappellido_mat").val(localStorage.getItem("apellidoMaterno"));
    $("#txt_Calle").val(localStorage.getItem("calle"));
    $("#txt_numero").val(localStorage.getItem("numero"));
    $("#txt_Colonia").val(localStorage.getItem("colonia"));
    $("#selectSexo").val(localStorage.getItem("sexo"));
    $("#txt_CP").val(localStorage.getItem("cp"));
    $("#txt_Ciudad").val(localStorage.getItem("ciudad"));
    $("#txt_Estado").val(localStorage.getItem("estado"));
    $("#txtFecha_nac").val(localStorage.getItem("fechaNacimiento"));
    $("#txttelefono").val(localStorage.getItem("tel1"));

}

function guardarEditCliente()
{

    var idCliente = localStorage.getItem("id");

    var nombre = $("#txtnombre").val();
    nombre = normalizar(nombre);
    nombre = limpiar(nombre);

    var apellidoPaterno = $("#txtappellido_pat").val();
    apellidoPaterno = normalizar(apellidoPaterno);
    apellidoPaterno = limpiar(apellidoPaterno);

    var apellidoMaterno = $("#txtappellido_mat").val();
    apellidoMaterno = normalizar(apellidoMaterno);
    apellidoMaterno = limpiar(apellidoMaterno);

    var fechaNac = $("#txtFecha_nac").val();
    fechaNac = normalizar(fechaNac);
    fechaNac = limpiar(fechaNac);

    var tel1 = $("#txttelefono").val();
    tel1 = normalizar(tel1);
    tel1 = limpiar(tel1);

    var calle = $("#txt_Calle").val();
    calle = normalizar(calle);
    calle = limpiar(calle);

    var numero = $("#txt_numero").val();
    numero = normalizar(numero);
    numero = limpiar(numero);

    var colonia = $("#txt_Colonia").val();
    colonia = normalizar(colonia);
    colonia = limpiar(colonia);

    var cp = $("#txt_CP").val();
    cp = normalizar(cp);
    cp = limpiar(cp);

    var ciudad = $("#txt_Ciudad").val();
    ciudad = normalizar(ciudad);
    ciudad = limpiar(ciudad);


    var estado = $("#txt_Estado").val();
    estado = normalizar(estado);
    estado = limpiar(estado);
    $.ajax
            ({
                type: "POST",
                url: "rest/cliente/update",
                async: true,
                data:
                        {
                            idCliente: idCliente,
                            nombre: nombre,
                            apellidoPaterno: apellidoPaterno,
                            apellidoMaterno: apellidoMaterno,
                            calle: calle,
                            numero: numero,
                            colonia: colonia,
                            cp: cp,
                            ciudad: ciudad,
                            estado: estado,
                            fechaNacimiento: fechaNac,
                            tel1: tel1,
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
                    "Cliente actualizado correctamente",
                    "success");
        }
    });
 
}

function alerta()
{
    Swal.fire({
        icon: 'success',
        title: 'Hecho',
        text: 'Guardado Exitosamente!'
    });
}

function searchClie() {

    var contenido = "";
    var busqueda = $("#txtbuscar").val();
    var token = localStorage.getItem("token");
    var data = {palabra: busqueda, token: token};
    $.ajax({
        type: "GET",
        url: "rest/cliente/search",
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
        } else if (data.error == "No hay datos")
        {
            //Para no dejar vacía la tabla se comoca una imagen y un mensaje de que o hay información 
            contenido += "<tr>";
            contenido += "<td colspan='10' class='text-center'>";
            contenido += "<span class='text-danger font-weight-bold'>Por el momento, no tienes clientes con ese nombre en tu catálogo.<span>";
            contenido += "</td>";
            contenido += "<tr>";
            $("#tbodyclientes").html(contenido);
            return;
        } else
        {
            clientes = data;
            for (var i = 0; i < clientes.length; i++) {
                if (clientes[i].persona.estatus === 1) {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-danger"  onclick="deleteCliente(' + i + ');"><i class="fal fa-trash-alt"></i> Eliminar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                } else {
                    contenido +=
                            '<tr id="Cliente' + i + '">' +
                            '<td id="nombre' + i + '">' + clientes[i].persona.nombre + " " + clientes[i].persona.apellidoPaterno + " " + clientes[i].persona.apellidoMaterno + '</td>' +
                            '<td id="fechaNac' + i + '">' + clientes[i].persona.fechaNacimiento + '</td>' +
                            '<td id="correo' + i + '">' + clientes[i].correo + '</td>' +
                            '<td id="tel1' + i + '">' + clientes[i].persona.tel1 + '</td>' +
                            '<td id="estatus' + i + '">' + (clientes[i].estatus = 1 ? '<i class="fal fa-check-square"></i>' : '<i class="fal fa-square"></i>') + '</td>' +
                            '<td>' +
                            '<div class="btn-group">' +
                            '<button class="btn btn-sm btn-success" onclick="activarCliente(' + i + ');"><i class="fal fa-plus"></i> Activar</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>';
                }
            }

            //se agregan los renglones generados a la tabla de mercancia
            $("#tbodyclientes").html(contenido);
        }
    });
    $("#txtbuscar").val(null);

}


function imprimir(tblCliente) {
//   window.print ();
    var contenido = document.getElementById(tblCliente).innerHTML;
    var contenidoOriginal = document.body.innerHTML;

    document.body.innerHTML = contenido;

    window.print();

    document.body.innerHTML = contenidoOriginal;
}

function mostrarContrasenia()
{
    $("#txtContrasenia").prop("type", "text");
    $("#mostrarPassword").hide();
    $("#ocultarPassword").show();
}



function ocultarContrasenia()
{
    $("#txtContrasenia").prop("type", "password");
    $("#mostrarPassword").show();
    $("#ocultarPassword").hide();
}