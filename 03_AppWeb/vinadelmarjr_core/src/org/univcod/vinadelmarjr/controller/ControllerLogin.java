package org.univcod.vinadelmarjr.controller;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.univcod.vinadelmarjr.db.ConexionMySQL;
import org.univcod.vinadelmarjr.model.Cliente;
import org.univcod.vinadelmarjr.model.Empleado;
import org.univcod.vinadelmarjr.model.Persona;

/**
 *
 * @author alexesp
 */
public class ControllerLogin {

    public Empleado login(String correo, String contrasenia) throws Exception {
        Empleado e = new Empleado();

        String query = "SELECT empleado.idEmpleado, persona.nombre, persona.apellidoPaterno, persona.apellidoMaterno"
                + " FROM persona INNER JOIN empleado ON persona.idPersona=empleado.idPersona"
                + " WHERE empleado.correo='" + correo + "' && empleado.contrasenia='" + contrasenia + "';";

        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            Persona persona = new Persona();
            persona.setNombre(rs.getString("nombre"));
            persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
            persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
            e.setPersona(persona);
            e.setId(rs.getInt("idEmpleado"));
            e.setCorreo(correo);
            e.setContrasenia(contrasenia);
            e.setToken();

        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return e;
    }

    public Cliente loginc(String correo, String contrasenia) throws Exception {
        Cliente c = new Cliente();
        String query = "SELECT cliente.*, persona.*"
                + " FROM persona INNER JOIN cliente ON persona.idPersona=cliente.idPersona"
                + " WHERE cliente.correo='" + correo + "' && cliente.contrasenia='" + contrasenia + "';";

        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        while (rs.next()) {
            Persona persona = new Persona();
      
            persona.setId(rs.getInt("idPersona"));
            persona.setNombre(rs.getString("nombre"));
            persona.setApellidoPaterno(rs.getString("apellidoPaterno"));
            persona.setApellidoMaterno(rs.getString("apellidoMaterno"));
            persona.setSexo(rs.getString("sexo"));
            persona.setCalle(rs.getString("calle"));
            persona.setNumero(rs.getString("numero"));
            persona.setColonia(rs.getString("colonia"));
            persona.setCiudad(rs.getString("ciudad"));
            persona.setCp(rs.getInt("cp"));
            persona.setEstado(rs.getString("estado"));
            persona.setFechaNacimiento(rs.getString("fechaNacimiento"));
            persona.setTel1(rs.getString("tel"));
            persona.setEstatus(rs.getInt("estatus"));
            
            
            c.setIdc(rs.getInt("idCliente"));
            c.setCorreo(correo);
            c.setContrasenia(contrasenia);
            c.setPersona(persona);
            c.setToken();

        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return c;
    }

    public void tokenCliente(Cliente c) throws Exception {
        String sql = "{call tokencliente(?," + "?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, c.getIdc());
        cstmt.setString(2, c.getToken());
        cstmt.execute();
        //Cerramos los objetos de BD:
        cstmt.close();
        connMySQL.close();
    }

    public void tokenEmpleado(Empleado e) throws Exception {
        String sql = "{call tokenempleado(?," + "?)}";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setInt(1, e.getId());
        cstmt.setString(2, e.getToken());
        cstmt.execute();
        //Cerramos los objetos de BD:
        cstmt.close();
        connMySQL.close();
    }

    public void deletetokenEm(int idEmpleado) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE empleado SET token =null WHERE idempleado = " + idEmpleado;

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

    public void deletetokencl(int idCliente) throws Exception {
        // Definimos la consulta SQL:

        String sql = "UPDATE cliente SET token =null WHERE idCliente = " + idCliente;

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

    public Cliente validartokenC(String token) throws Exception {
        // Definimos la consulta SQL:
        String sql = "select*from cliente where token = '" + token + "'";
        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        Cliente c = new Cliente();

        while (rs.next()) {
            c.setIdc(rs.getInt("idCliente"));
        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return c;

    }

    public Empleado validartokenE(String token) throws Exception {
        // Definimos la consulta SQL:
        String sql = "SELECT*FROM empleado where token = '" + token + "'";
        ConexionMySQL objC = new ConexionMySQL();
        Connection con = objC.open();

        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(sql);
        Empleado e = new Empleado();
        while (rs.next()) {
            e.setId(rs.getInt("idEmpleado"));
        }

        rs.close();
        stmt.close();
        con.close();
        objC.close();

        return e;

    }

}
