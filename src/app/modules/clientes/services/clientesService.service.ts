import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { clientes } from '../interfaces/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient){
  }

  public cargarClientes(pagination : any): any {
    return this.http.get(this.apiUrl + 'clientes', {params: pagination});
  }

  public cargarCliente(id: number): any {
    return this.http.get(this.apiUrl + 'clientes' + '/' + id);
  }

  public guardarCliente(cliente: clientes): any {
    return this.http.post(this.apiUrl + 'clientes', cliente);
  }

  public actualizarCliente(id: number, cliente: clientes): any {
    return this.http.put(this.apiUrl + 'clientes' + '/' + id, cliente);
  }

  public eliminarCliente(id: number): any {
    return this.http.delete(this.apiUrl + 'clientes' + '/' + id);
  }
}
