import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { productos } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient){
  }

  public cargarProductos(pagination : any): any {
    return this.http.get(this.apiUrl + 'productos', {params: pagination});
  }

  public cargarProducto(id: number): any {
    return this.http.get(this.apiUrl + 'productos' + '/' + id);
  }

  public guardarProducto(producto: productos): any {
    return this.http.post(this.apiUrl + 'productos', producto);
  }

  public actualizarProducto(id: number, producto: productos): any {
    return this.http.put(this.apiUrl + 'productos' + '/' + id, producto);
  }

  public eliminarProducto(id: number): any {
    return this.http.delete(this.apiUrl + 'productos' + '/' + id);
  }
}
