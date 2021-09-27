import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ventas } from '../interfaces/ventas.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient){
  }

  public cargarClientes(): any {
    return this.http.get(this.apiUrl + 'ventas/clientes');
  }

  public cargarProductos(): any {
    return this.http.get(this.apiUrl + 'ventas/productos');
  }

  public cargarVentas(id: number, pagination : any): any {
    return this.http.get(this.apiUrl + 'ventas/clientes/' + id, {params: pagination});
  }

  public guardarVenta(venta: ventas): any {
    return this.http.post(this.apiUrl + 'ventas', venta);
  }

  public eliminarVenta(id: number): any {
    return this.http.delete(this.apiUrl + 'ventas/' + id);
  }
}
