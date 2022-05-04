package org.univcod.vinadelmarjr.model;

import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author PC
 */
public class Empleado {
    int id;
    Persona persona; //contencion
    String correo;
    String contrasenia;
    String token;
    String tokenBD;

    

//    public Empledo(String correo, String contrasenia) {
//        this.correo = correo;
//        this.contrasenia = contrasenia;
//    }

   
            
    public Empleado() {
       
    }
    
      
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getToken() {
        return token;
    }

   

  public void setToken() {
        String c=this.getCorreo();
        String p=this.getContrasenia();
        String k=new Date().toString();
        String x=(DigestUtils.sha256Hex(c+";"+p+";"+k));
        this.token=x;                
    }
    
     public String getTokenBD() {
        return tokenBD;
    }

    public void setTokenBD(String tokenBD) {
        this.tokenBD = tokenBD;
    }  
}
