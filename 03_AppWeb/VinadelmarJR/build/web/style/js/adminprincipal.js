//carga modulos

function cargarModuloEmpleados()
{
    
    $("#tituloScreen").html("Empleados");
    $.ajax
            ({
                url: "modulos/empleados.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaEmpleados();
            });

}

function cargarModuloCliente()
{
    $("#tituloScreen").html("Clientes");
   
    $.ajax
            ({
                url: "modulos/clientes.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
               mostrarTablaCliente();
            });
}

function cargarModuloMenu()
{
    $("#tituloScreen").html("Menú");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").addClass("seleccion");
    $("#ventas").removeClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/menu.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                mostrarTablaMenu();
            });
}


function cargarModuloVenta()
{
    $("#tituloScreen").html("Ventas");
    $("#empleados").removeClass("seleccion");
    $("#proveedores").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#clientes").removeClass("seleccion");
    $("#productos").removeClass("seleccion");
    $("#animales").removeClass("seleccion");
    $("#ventas").addClass("seleccion");
    $("#divContenido").removeClass("divAlto");
    $.ajax
            ({
                url: "modulos/ventas.html",
                context: document.body
            })
            .done(function (data)
            {
                $("#divContenido").html(data);
                buscarClientes();
                buscarEmpleados();
                buscarMercancias();
            });
}