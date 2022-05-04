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
import org.univcod.vinadelmarjr.model.Empleado;
import org.univcod.vinadelmarjr.model.Persona;

/**
 *
 * @author chris
 */
public class ControllerEmpleado {

    public int insert(Empleado em) throws Exception {
        // Definimos la instruccion SQL dentro de un String Java:

        String sql = "{call insertEmpleado(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + //Datos de Persona
                "?, ?, "
                + //Datos del empleado
                "?, ?)}"; //Valores de retorno

        // Nos conectamos a la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        // Utilizando la conexion con MySQL, creamos un objeto que nos permita
        // invocar el Stored Procedure que hara la insercion en las tablas
        // producto y mercancia:
        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos de Persona de acuerdo con los parámetros que pide
        //el Stored Procedure:
        cstmt.setString(1, em.getPersona().getNombre());

        cstmt.setString(2, em.getPersona().getApellidoPaterno());

        cstmt.setString(3, em.getPersona().getApellidoMaterno());

        cstmt.setString(4, em.getPersona().getFechaNacimiento());

        cstmt.setString(5, em.getPersona().getCalle());

        cstmt.setString(6, em.getPersona().getNumero());

        cstmt.setString(7, em.getPersona().getColonia());

        cstmt.setInt(8, em.getPersona().getCp());

        cstmt.setString(9, em.getPersona().getCiudad());

        cstmt.setString(10, em.getPersona().getEstado());

        cstmt.setString(11, em.getPersona().getTel1());

        cstmt.setString(12, em.getCorreo());

        cstmt.setString(13, em.getContrasenia());

        //Registramos los parámetros de salida:
        cstmt.registerOutParameter(14, Types.INTEGER);

        cstmt.registerOutParameter(15, Types.INTEGER);

        //Ejecutamos la consulta:
        cstmt.execute();

        //Recuperamos los ID's generados:
        em.getPersona().setId(cstmt.getInt(14));

        em.setId(cstmt.getInt(15));

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

        //Devolvemos el ID del emeplado generado:
        return em.getId();

    }

    public void update(Empleado em) throws Exception {
        String sql = "{call updateEmpleado(?, "
                + //ID de persona y empleado
                "?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + //Datos de Persona
                "?, "
                + //Datos Empleado
                "?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();

        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //Llenamos los datos del Producto de acuerdo con los parámetros que pide
        //el Stored Procedure:       
        cstmt.setInt(1, em.getId());

        cstmt.setString(2, em.getPersona().getNombre());

        cstmt.setString(3, em.getPersona().getApellidoPaterno());

        cstmt.setString(4, em.getPersona().getApellidoMaterno());

        cstmt.setString(5, em.getPersona().getFechaNacimiento());

        cstmt.setString(6, em.getPersona().getCalle());

        cstmt.setString(7, em.getPersona().getNumero());

        cstmt.setString(8, em.getPersona().getColonia());

        cstmt.setInt(9, em.getPersona().getCp());

        cstmt.setString(10, em.getPersona().getCiudad());

        cstmt.setString(11, em.getPersona().getEstado());

        cstmt.setString(12, em.getPersona().getTel1());

        cstmt.setString(13, em.getCorreo());

        cstmt.setString(14, em.getContrasenia());

        //Ejecutamos la consulta:
        cstmt.execute();

        //Cerramos los objetos de BD:
        cstmt.close();

        connMySQL.close();

    }

    public void delete(int id) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE persona SET estatus = 0 WHERE idPersona = " + id;

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

        String sql = "UPDATE persona SET estatus =1 WHERE idpersona = " + id;

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

    public List<Empleado> getall(String filtro) throws Exception {
// Definimos la consulta SQL:

        String sql = "SELECT * FROM v_empleados VC";

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
        List<Empleado> empleados = new ArrayList<>();

        Empleado em = null;

        //Recorremos el conjunto de registros devuelto por la BD:
        while (rs.next()) {

            //Obtenemos un objeto de tipo Mercancia con los datos que se
            //encuentran en el registro actual, devuelto por la BD:
            em = fill(rs);

            //Agregamos el objeto a la lista:
            empleados.add(em);
        }

        //Devolvemos la lista de objetos consultados:
        return empleados;
    }

    public Empleado fill(ResultSet rs) throws Exception {
        Empleado em = new Empleado();

        Persona p = new Persona();

        //Llenamos los datos de la persona:
        p.setId(rs.getInt("idPersona"));

        p.setNombre(rs.getString("nombre"));

        p.setApellidoPaterno(rs.getString("apellidoPaterno"));

        p.setApellidoMaterno(rs.getString("apellidoMaterno"));

        p.setCalle(rs.getString("calle"));

        p.setNumero(rs.getString("numero"));

        p.setColonia(rs.getString("colonia"));

        p.setCiudad(rs.getString("ciudad"));

        p.setCp(rs.getInt("cp"));

        p.setEstado(rs.getString("estado"));

        p.setFechaNacimiento(rs.getString("fechaNacimiento"));

        p.setTel1(rs.getString("tel"));

        p.setEstatus(rs.getInt("estatus"));

        em.setId(rs.getInt("idEmpleado"));

        em.setCorreo(rs.getString("correo"));

        em.setContrasenia(rs.getString("contrasenia"));

        em.setPersona(p);

        return em;
    }

    public List<Empleado> search(String s) throws Exception {

        String query = "SELECT * FROM v_empleados WHERE nombre like'%" + s + "%'";

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        PreparedStatement pstmt = conn.prepareStatement(query);

        ResultSet rs = pstmt.executeQuery();

        List<Empleado> Empleados = new ArrayList<>();
        while (rs.next() != false) {
            Persona p = new Persona();
            p.setId(rs.getInt("idPersona"));

            p.setNombre(rs.getString("nombre"));

            p.setApellidoPaterno(rs.getString("apellidoPaterno"));

            p.setApellidoMaterno(rs.getString("apellidoMaterno"));

            p.setCalle(rs.getString("calle"));

            p.setNumero(rs.getString("numero"));

            p.setColonia(rs.getString("colonia"));

            p.setCiudad(rs.getString("ciudad"));

            p.setCp(rs.getInt("cp"));

            p.setEstado(rs.getString("estado"));

            p.setFechaNacimiento(rs.getString("fechaNacimiento"));

            p.setTel1(rs.getString("tel"));

            p.setEstatus(rs.getInt("estatus"));

            Empleado e = new Empleado();
            e.setId(rs.getInt("idEmpleado"));

            e.setCorreo(rs.getString("correo"));

            e.setContrasenia(rs.getString("contrasenia"));

            e.setPersona(p);

            Empleados.add(e);

        }
        rs.close();
        pstmt.close();
        connMySQL.close();
        return Empleados;
    }

}
