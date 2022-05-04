/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.univcod.vinadelmarjr.model;

import java.util.List;

/**
 *
 * @author franc
 */
public class Pedido {
    private int idPedido ;
    private String fechaVenta;
    private int folio;
    private int estatus;
    private Cliente cliente;
    private List<Menu> Menu;// 

    public Pedido() {
    }

    public Pedido(int idPedido, String fechaVenta, int folio, int estatus, Cliente cliente, List<Menu> Menu) {
        this.idPedido = idPedido;
        this.fechaVenta = fechaVenta;
        this.folio = folio;
        this.estatus = estatus;
        this.cliente = cliente;
        this.Menu = Menu;
    }

    public int getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }

    public String getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(String fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public int getFolio() {
        return folio;
    }

    public void setFolio(int folio) {
        this.folio = folio;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Menu> getMenu() {
        return Menu;
    }

    public void setMenu(List<Menu> Menu) {
        this.Menu = Menu;
    }
    
    
     
}
