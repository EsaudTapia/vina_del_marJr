/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.vinadelmarjr.rest;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.vinadelmarjr.controller.ControllerLogin;
import org.univcod.vinadelmarjr.controller.ControllerProductosAlCliente;
import org.univcod.vinadelmarjr.model.Cliente;
import org.univcod.vinadelmarjr.model.Empleado;
import org.univcod.vinadelmarjr.model.Menu;

/**
 *
 * @author franc
 */
  @Path("productoAlcliente")
public class RestProductosCliente {
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro,
            @QueryParam("token") @DefaultValue("") String token) {
        String out = "";
        ControllerProductosAlCliente cm = new ControllerProductosAlCliente();
        List<Menu> menus = new ArrayList<>();
        try {

            Cliente tokenvalidadoC = new Cliente();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoC = cLI.validartokenC(token);
            String tokencorrecto = "";
            if (tokenvalidadoC.getIdc()!= 0) {
                try {
                    menus = cm.getall(filtro);

                    out = new Gson().toJson(menus);
                } catch (Exception e) {
                    e.printStackTrace();

                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoC.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
    

  
}

