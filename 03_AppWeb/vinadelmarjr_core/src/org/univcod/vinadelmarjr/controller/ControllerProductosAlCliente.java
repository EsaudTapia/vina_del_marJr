/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.vinadelmarjr.controller;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import org.univcod.vinadelmarjr.db.ConexionMySQL;
import org.univcod.vinadelmarjr.model.Categoria;
import org.univcod.vinadelmarjr.model.Menu;

/**
 *
 * @author franc
 */
public class ControllerProductosAlCliente {
    public List<Menu> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_menu";

        //Abrimos una conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Generamos un objeto que nos permita ejecutar la consulta
        // de manera segura, a diferencia de un Statement:
        PreparedStatement pstmt = conn.prepareStatement(sql);

        // Ejecutamos la consulta y obtenemos sus resultados:
        ResultSet rs = pstmt.executeQuery();

        // Declaramos una lista dinamica para guardar los objetos que
        // generaremos al recorrer los resultados devueltos por la BD:
        List<Menu> menus = new ArrayList<>();

        Menu m = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()) {

            //Obtenemos un objeto de tipo Mercancia con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            m = fill(rs);

            //Agregamos el objeto a la lista:
            menus.add(m);
        }

        //Devolvemos la lista de objetos consultados:
        return menus;
    }
     public Menu fill(ResultSet rs) throws Exception {
        Menu m = new Menu();

        Categoria c = new Categoria();
        
        //Llenamos los datos del menu:
        m.setIdMenu(rs.getInt("idMenu"));

        m.setNombre(rs.getString("nombre"));

        m.setDescripcion(rs.getString("descripcion"));
        
        m.setPrecio(rs.getDouble("precio"));
        
        m.setFoto(rs.getString("foto"));
        
        m.setEstatus(rs.getInt("estatus"));

        //Llenamos los datos de la categoria:
        c.setIdCategoria(rs.getInt("idcategoria"));

        c.setNombre(rs.getString("nombrecategoria"));

        m.setCategoria(c);

        return m;
    }

}
