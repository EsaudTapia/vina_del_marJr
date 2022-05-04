package org.univcod.vinadelmarjr.model;

import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;

/**
 *
 * @author alexesp
 */
public class Cliente {
    int idc;
    Persona persona; //contencion
    String correo;
    String contrasenia;
    String token;    
    String tokenBD; 

  

        
    public int getIdc() {
        return idc;
    }

    public void setIdc(int idc) {
        this.idc = idc;
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
