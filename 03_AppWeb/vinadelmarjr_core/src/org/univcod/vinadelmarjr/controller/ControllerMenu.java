/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.vinadelmarjr.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import org.univcod.vinadelmarjr.db.ConexionMySQL;
import org.univcod.vinadelmarjr.model.Categoria;
import org.univcod.vinadelmarjr.model.Menu;

/**
 *
 * @author chris
 */
public class ControllerMenu {

    public int insert(Menu m) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertMenu(?,?, ?,"
                + //Datos de Menu
                "?, "
                + //Datos de categoria
                "?)}"; //Valores de retorno

        //nos conectamos a mysql
        ConexionMySQL connMysql = new ConexionMySQL();
        Connection conn = connMysql.open();
        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // producto y mercancia:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos de Persona de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, m.getNombre());

        cstmt.setString(2, m.getDescripcion());

        cstmt.setDouble(3, m.getPrecio());

        cstmt.setString(4, m.getFoto());

        cstmt.setInt(5, m.getCategoria().getIdCategoria());

    
        //Ejecutamos la consulta:
        cstmt.execute();

       
        //Cerramos los objetos de BD:
        cstmt.close();

        connMysql.close();
        
        return 1;
    }

    public void update(Menu m) throws Exception {
        String sql = "{call updateMenu(?, ?, ?,"
                + //Datos de Menu
                "?, "
                + //Datos de categoria
                "?, ?)}"; //Dato de la foto que nos faltaba

        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setInt(1, m.getIdMenu());

        cstmt.setString(2, m.getNombre());

        cstmt.setInt(3, m.getCategoria().getIdCategoria());

        cstmt.setString(4, m.getDescripcion());

        cstmt.setDouble(5, m.getPrecio());

        cstmt.setString(6, m.getFoto());

        //Ejecutamos la consulta:
        cstmt.execute();

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

    }

    public void delete(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE menu SET estatus = 0 WHERE idMenu = " + id;

        // Generamos un objeto de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        // Abrimos la conexion con MySQL:
        Connection conn = connMySQL.open();

        // Generamos el objeto que nos permitira ejecutar la sentencia SQL:
        Statement stmt = conn.createStatement();

        // Ejecutamos la instruccion SQL:
        stmt.executeUpdate(sql);

        // Cerramos los objetos de conexion con la BD:
        stmt.close();

        connMySQL.close();

    }

    public void activar(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE menu SET estatus = 1 WHERE idMenu = " + id;

        // Generamos un objeto de conexion con MySQL:
        ConexionMySQL connMySQL = new ConexionMySQL();

        // Abrimos la conexion con MySQL:
        Connection conn = connMySQL.open();

        // Generamos el objeto que nos permitira ejecutar la sentencia SQL:
        Statement stmt = conn.createStatement();

        // Ejecutamos la instruccion SQL:
        stmt.executeUpdate(sql);

        // Cerramos los objetos de conexion con la BD:
        stmt.close();

        connMySQL.close();
    }

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

    public List<Menu> search(String s) throws Exception {

        String query = "SELECT * FROM v_menu WHERE nombre like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Menu> Menu = new ArrayList<>();
        while (rs.next() != false) {
            Categoria c = new Categoria();
            c.setIdCategoria(rs.getInt("idCategoria"));

            c.setNombre(rs.getString("nombrecategoria"));

            Menu m = new Menu();
            m.setIdMenu(rs.getInt("idMenu"));

            m.setNombre(rs.getString("nombre"));

            m.setPrecio(rs.getDouble("precio"));

            m.setDescripcion(rs.getString("descripcion"));

            m.setFoto(rs.getString("foto"));

            m.setEstatus(rs.getInt("estatus"));

            m.setCategoria(c);

            Menu.add(m);

        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return Menu;
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

//    public List<Empleado> search(String s) throws Exception {
//
//        String query = "SELECT * FROM v_empleados WHERE nombre like'%" + s + "%'";
//
//        ConexionMySQL connMySQL = new ConexionMySQL();
//        Connection conn = connMySQL.open();
//
//        PreparedStatement pstmt = conn.prepareStatement(query);
//
//        ResultSet rs = pstmt.executeQuery();
//
//        List<Empleado> Empleados = new ArrayList<>();
//        while (rs.next() != false) {
//            Persona p = new Persona();
//            p.setId(rs.getInt("idPersona"));
//
//            p.setNombre(rs.getString("nombre"));
//
//            p.setApellidoPaterno(rs.getString("apellidoPaterno"));
//
//            p.setApellidoMaterno(rs.getString("apellidoMaterno"));
//
//            p.setCalle(rs.getString("calle"));
//
//            p.setNumero(rs.getString("numero"));
//
//            p.setColonia(rs.getString("colonia"));
//
//            p.setCiudad(rs.getString("ciudad"));
//
//            p.setCp(rs.getInt("cp"));
//
//            p.setEstado(rs.getString("estado"));
//
//            p.setFechaNacimiento(rs.getString("fechaNacimiento"));
//
//            p.setTel1(rs.getString("tel"));
//
//            p.setEstatus(rs.getInt("estatus"));
//
//            Empleado e = new Empleado();
//            e.setId(rs.getInt("idEmpleado"));
//
//            e.setCorreo(rs.getString("correo"));
//
//            e.setContrasenia(rs.getString("contrasenia"));
//
//            e.setPersona(p);
//
//            Empleados.add(e);
//
//        }
//        rs.close();
//        pstmt.close();
//        connMySQL.close();
//        return Empleados;
//    }
}
