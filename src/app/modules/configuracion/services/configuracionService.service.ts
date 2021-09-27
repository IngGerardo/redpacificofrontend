import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { configuracion } from '../interfaces/configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient){
  }

  public cargarConfiguracion(): any {
    return this.http.get(this.apiUrl + 'configuraciones');
  }

  public guardarConfiguracion(configuracion: configuracion): any {
    return this.http.post(this.apiUrl + 'configuraciones', configuracion);
  }
}
