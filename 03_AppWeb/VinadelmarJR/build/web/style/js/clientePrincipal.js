
function cargarModuloLogin()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "loginC.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC").html(data);
            });

}

function cargarModuloLoginOrden()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").removeAttr('hidden');
    $.ajax
            ({
                url: "loginC.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC").html(data);
            });

}

function cargarModuloOrden()
{
    $("#mapaInicio").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/orden.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC2").html(data);
            });

}

function cargarModuloConocenos1()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/conocenos.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC").html(data);
            });

}

function cargarModuloConocenos()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/conocenos.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC2").html(data);
            });

}

function cargarModuloConfiguracion()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/editarCliente.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC2").html(data);
                editCliente();
            });


}


function cargarModuloMenuC()
{
    $("#mapaInicio").attr("hidden", "");
    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/menuCliente.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC2").html(data);
                mostrarMercanciaAlCliente();

            });

}

function cargarModuloOrdenC()
{
    var total;
    pedido.menu.cantidad;
    for (i = 0; i < pedido.menu.length; i++) {
        pedido.menu[i].cantidad = $("#cantidadPlat" + i + "").val();
    }

    var nombre = pedido.cliente.nombre + " " + pedido.cliente.apellidoPaterno + " " + pedido.cliente.apellidoMaterno;

    $("#alertaInfo").attr("hidden", "");
    $.ajax
            ({
                url: "modulos/pedido.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenidoC2").html(data);
                $("#txtclientePed").val(nombre);
                $("#txtcorreoPed").val(pedido.cliente.correo);
                var contenido = "";

                mostrartablapedidoC();



            });

}