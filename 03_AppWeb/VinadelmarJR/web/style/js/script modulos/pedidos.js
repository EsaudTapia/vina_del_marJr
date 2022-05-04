
var menu = [];
var empleados = [];
var contenido = "";

// Variable global que almacena todos los datos necesarios para el pedido
var pedido = new Object();
pedido.menu = [];
    var cliente = [{
            idc: localStorage.getItem("id"),
            nombre: localStorage.getItem("nombre"),
            apellidoPaterno: localStorage.getItem("apellidoPaterno"),
            apellidoMaterno: localStorage.getItem("apellidoMaterno"),
            tel1: localStorage.getItem("tel1"),
            correo:localStorage.getItem("correo")

        }];

    pedido.cliente = cliente[0];



function seleccionarPlatillo(i)
{
    var encontrado;
    for (var k = 0; k < pedido.menu.length; k++) {
        if (pedido.menu[k].idMenu === menu[i].idMenu) {
            encontrado = true;
        }
    }
    if (!encontrado) {
        pedido.menu[pedido.menu.length] = menu[i];
        mostrarListaPlatillos(pedido.menu);
    } else {


        Swal.fire({
            icon:'info',
            title: 'Oops...',
            text: 'Este producto ya esta en la lista!',
            
        })
    }
    obtenerTotal(pedido.menu);
}

function obtenerTotal(menu) {
    var total = 0;
    var can;

    for (i=0 ; i < pedido.menu.length; i++) {
          can=$("#cantidadPlat" + i + "").val();
        total += menu[i].precio *  can;

    }

    $("#txtTotalVenta").html("$" + total);

}



function mostrarListaPlatillos(menu) {

    $("#txtPlatilloElegido").html("");
    var contenido = "";



    for (var i = 0; i < menu.length; i++)
    {
        contenido += "<div class='card mb-3 bg-light my-2 d-flex' style='max-width: 540px;'>";
        contenido += "<div class='card-header' style='height:35px;'>  <button  onclick='quitardelista("+i+")'; class='close sm btn ' aria-label='Close'><i class='float-right fa-xs fas fa-times  ml-auto text-gray'></i></button> </div>";

        contenido += " <div class='row g-0'>";
        contenido += " <div class='col-md-4'>";
        contenido += " <img class='my-3 ml-1' id='imgFoto' width='120' height='120' alt='' ";
        contenido += " src='data:image/png;base64," + menu[i].foto + "' />";
        contenido += " </div>";
        contenido += " <div class='col-md-8'>";
        contenido += " <div class='card-body'>";
        contenido += "<h5 class='card-title'>" + menu[i].nombre + "</h5>";
        contenido += "<p class='card-text'><small class='text-muted'>" + "Precio: " + " $" + menu[i].precio + "</small></p>";
        contenido += "<Label class='card-text'><small class='text-muted'>" + "cantidad: " + "</small></label><input type='number' style='width:50px' id='cantidadPlat" + i + "' onkeypress='valnum(" + i + ")' value='1'>";
        contenido += "</div>";
        contenido += "</div>";
        contenido += "</div>";
        contenido += "</div>";
    }

    $("#txtPlatilloElegido").html(contenido);
}

function valnum(i) {
    $(document).ready(function () {
        $('input#cantidadPlat' + i)
                .keypress(function (event) {
                    if (event.which < 48 || event.which > 57 || this.value.length === 2) {
                        return false;
                    }
                });
    });
    
}

function generarPedido(){
   Swal.fire({
  title: 'Continuará..., porque se fueron de vacaciones',
  width: 500,
  imageUrl: 'style/media/img/vaca.gif',
  padding: '3em'
 
 
})
}

function quitardelista(i){
    //Borrar un objeto concreto del array:

      pedido.menu.splice(i,1);
   
mostrarListaPlatillos(pedido.menu);
}

function quitardelistaped(i){
    //Borrar un objeto concreto del array:

      pedido.menu.splice(i,1);
     mostrartablapedidoC();

}


function mostrartablapedidoC(){
    var contenido="";
           if (pedido.menu.length < 1) {
            contenido = '<tr>' +
                    '<td colspan="12" class="text-center">' +
                    '<img alt="" src="style/media/img/dogsad.png" style="height: 120px;"/><br>' +
                    '<span class="text-danger font-weight-bold">' +
                    'no ha seleccionado ningun platillo' +
                    '</span>' +
                    '</td>' +
                    '</tr>';
            $("#tbodypedido").html(contenido);
            $("#txttotalped").val("");
            return;
        }else{
                for (var i = 0; i < pedido.menu.length; i++) {

                    contenido +=
                            '<tr id="pedido' + i + '">' +
                            "<td><img id='imgFoto' width='50' height='40' alt='' " +
                            "src='data:image/png;base64," + pedido.menu[i].foto + "' /></td>" +
                            '<td id="nombre' + i + '">' + pedido.menu[i].nombre + '</td>' +
                            '<td id="precio' + i + '">' + pedido.menu[i].precio + '</td>' +
                            '<td id="cantidad' + i + '">' + pedido.menu[i].cantidad + '</td>' +
                            '<td id="subTotal' + i + '">' + pedido.menu[i].cantidad * pedido.menu[i].precio + '</td>' +
                            '<td id="eliminar' + i + '">' +'<button class="btn btn-sm btn-warning" onclick="quitardelistaped(' + i + ');"><i class="text-white fas fa-times"></i></button>' + '</td>' +
                            '</tr>';


                }
                $("#tbodypedido").html(contenido);
            }
            
              var total = 0;
                var can;

                for (i = 0; i < pedido.menu.length; i++) {
                  
                    total += (pedido.menu[i].precio * pedido.menu[i].cantidad);

                }

                $("#txttotalped").val(total);
}