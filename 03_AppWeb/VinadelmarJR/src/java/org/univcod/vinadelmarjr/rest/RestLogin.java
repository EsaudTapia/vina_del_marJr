package org.univcod.vinadelmarjr.rest;

import com.google.gson.Gson;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.vinadelmarjr.controller.ControllerLogin;
import org.univcod.vinadelmarjr.model.Cliente;
import org.univcod.vinadelmarjr.model.Empleado;

@Path("login")
public class RestLogin {

    @POST
    @Path("in")
    @Produces(MediaType.APPLICATION_JSON)
    public Response in(@FormParam("nombre") @DefaultValue("0") String u,
            @FormParam("contrasenia") @DefaultValue("0") String p) {
        Cliente cliente = new Cliente();
        Empleado empleado = new Empleado();
        ControllerLogin cLI = new ControllerLogin();
        String out = "";

        try {
            cliente = cLI.loginc(u, p);
            empleado = cLI.login(u, p);

            if (!(cliente.getIdc() == 0)) {
                cLI.tokenCliente(cliente);
                out = new Gson().toJson(cliente);
            } else if (empleado.getId() != 0) {
                cLI.tokenEmpleado(empleado);
                out = new Gson().toJson(empleado);
            } else {
               out = "{\"result\":\"Datos invalidos\"}";
            }
        } catch (Exception e) {
            out = "{​​\"exception\":\"" + e.toString() + "\"}​​";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("salirEm")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response salirEm(@FormParam("idEmpleado") @DefaultValue("0") int idEmpleado)
    {
        String out = "";
        ControllerLogin ct = new ControllerLogin();
        try
        {
             ct.deletetokenEm(idEmpleado);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {
            e.printStackTrace();
            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    @Path("salirCl")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response salirCl(@FormParam("idCliente") @DefaultValue("0") int idCliente)
    {
        String out = "";
        ControllerLogin ct = new ControllerLogin();
        try
        {
             ct.deletetokencl(idCliente);
            
            out = "{\"result\":\"OK\"}";
        } 
        catch (Exception e)
        {
            e.printStackTrace();
            
            out = "{\"exception\":\"" + e.toString() + "\"}";
        }
                
        return Response.status(Response.Status.OK).entity(out).build();
    }
           
    
}
