package org.univcod.vinadelmarjr.rest;

import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.univcod.vinadelmarjr.controller.ControllerLogin;
import org.univcod.vinadelmarjr.controller.ControllerMenu;
import org.univcod.vinadelmarjr.model.Categoria;
import org.univcod.vinadelmarjr.model.Empleado;
import org.univcod.vinadelmarjr.model.Menu;

/**
 *
 * @author chris
 */
@Path("menu")
public class RestMenu {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("idMenu") @DefaultValue("0") int idMenu,
            @FormParam("idCategoria") @DefaultValue("0") int idCategoria,
            @FormParam("nombre") @DefaultValue("") String nombre,
            @FormParam("descripcion") @DefaultValue("") String descripcion,
            @FormParam("precio") @DefaultValue("0") double precio,
            @FormParam("estatus") @DefaultValue("0") int estatus,
            @FormParam("foto") @DefaultValue("") String foto,
            @FormParam("token") @DefaultValue("") String token) {
        String out = "";
        try {
            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                Categoria c = new Categoria();
                Menu m = new Menu();
                ControllerMenu ctrlMenu = new ControllerMenu();

                // Llenamos los datos del objeto de tipo Categoria:
             
                c.setIdCategoria(idCategoria);

                // Llenamos los datos del objeto de tipo Empleado:
                m.setIdMenu(idMenu);
                m.setNombre(nombre);
                m.setDescripcion(descripcion);
                m.setPrecio(precio);
                m.setEstatus(estatus);
                m.setFoto(foto);
                
                m.setCategoria(c);

                try {
                    if(m.getIdMenu()==0){
                        ctrlMenu.insert(m);
                    }else{
                    }
                    ctrlMenu.update(m);
                    out = new Gson().toJson(m);
                   
                } catch (Exception exception) {
                    exception.printStackTrace();
                    out = "{\"exception\":\"" + m.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();

            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();

            }
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString() + "\"}";

        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("delete")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@FormParam("idMenu") @DefaultValue("0") int idMenu,
            @FormParam("token") @DefaultValue("") String token) {
        String out = "";
        try {
            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerMenu ctrlMenu = new ControllerMenu();
                try {
                    ctrlMenu.delete(idMenu);

                    out = "{\"result\":\"OK\"}";
                } catch (Exception e) {
                    e.printStackTrace();

                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("activar")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response activar(@FormParam("idMenu") @DefaultValue("0") int idMenu,
            @FormParam("token") @DefaultValue("") String token) {
        String out = "";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                ControllerMenu ctrlMenu = new ControllerMenu();
                try {
                    ctrlMenu.activar(idMenu);

                    out = "{\"result\":\"OK\"}";
                } catch (Exception e) {
                    e.printStackTrace();

                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro,
            @QueryParam("token") @DefaultValue("") String token) {
        String out = "";
        ControllerMenu cm = new ControllerMenu();
        List<Menu> menus = new ArrayList<>();
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {
                try {
                    menus = cm.getall(filtro);

                    out = new Gson().toJson(menus);
                } catch (Exception e) {
                    e.printStackTrace();

                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

   @Path("search")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response search(@QueryParam("palabra") @DefaultValue("") String p,
            @QueryParam("token") @DefaultValue("") String token) {
        ControllerMenu cm = new ControllerMenu();
        List<Menu> Menu = new ArrayList<>();
        String out = "";
        try {

            Empleado tokenvalidadoE = new Empleado();
            ControllerLogin cLI = new ControllerLogin();
            tokenvalidadoE = cLI.validartokenE(token);
            String tokencorrecto = "";
            if (tokenvalidadoE.getId() != 0) {

                try {
                    Menu =cm.search(p);
                    if (!Menu.isEmpty()) {
                        out = new Gson().toJson(Menu);
                    } else {
                        out = "{\"error\":\"No hay datos\"}";
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    out = "{\"exception\":\"" + e.toString() + "\"}";
                }

                return Response.status(Response.Status.OK).entity(out).build();
            } else {
                tokencorrecto = new Gson().toJson(tokenvalidadoE.getTokenBD());
                return Response.status(Response.Status.OK).entity(tokencorrecto).build();
            }
        } catch (Exception e) {
            e.printStackTrace();

            out = "{\"exception\":\"" + e.toString() + "\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
}