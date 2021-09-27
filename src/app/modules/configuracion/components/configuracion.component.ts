import { Component, OnInit, ElementRef } from '@angular/core';
import { ConfiguracionService } from '../services/configuracionService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { configuracion } from '../interfaces/configuracion.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: '../views/configuracion.component.html',
  styleUrls: ['../styles/configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  configuracion : configuracion;
  registerForm: FormGroup;
  submitted = false;

  constructor(private configuracionService: ConfiguracionService, 
    private _el: ElementRef, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      idu_configuracion: new FormControl(''),
      num_tasa: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      num_enganche: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      num_plazo: new FormControl('', [Validators.required, Validators.maxLength(5)])
    });
    this.cargarConfiguracion();
}

/**
* Regresa todos los valores y controles del formulario de registro.
*
* @author Gerardo Ortiz
* @return object
*/
get formValues() { return this.registerForm.value; }
get form() { return this.registerForm.controls; }

/**
* Registra a los la nueva configuración de la empresa.
*
* @author Gerardo Ortiz
* @return void
*/
public onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    this.configuracion = this.trimObject(this.formValues);
    this.configuracionService.guardarConfiguracion(this.configuracion).subscribe(respuesta => {
      if (respuesta.response) {
        this.cargarConfiguracion();
        swal('Registro exitoso', "La configuración fue registrada con éxito.", 'success');
      }
    },
    (err: HttpErrorResponse) => {
        swal('Error', "Sucedio un error al momento de registrar la configuración.", 'error');
    });
}

  /**
  * Consulta la configuracion de la tasa de financiamiento que esta en el catalogo de la empresa.
  *
  * @author Gerardo Ortiz
  * @return void
  */
  public cargarConfiguracion(): void {
    this.configuracionService.cargarConfiguracion().subscribe(respuesta => {
      if (respuesta.response != null) {
        this.configuracion = respuesta.response;
            this.registerForm.setValue({
              idu_configuracion: this.configuracion.idu_configuracion, 
              num_tasa: this.configuracion.num_tasa,
              num_enganche: this.configuracion.num_enganche,
              num_plazo: this.configuracion.num_plazo
            });
      }
    },
    (err: HttpErrorResponse) => {
        swal('Error', "Sucedio un error al momento de cargar la configuracion.", 'error');
    });
  }

      /**
    * Le aplica un trim a todas las propiedades del objeto del formulario
    * para que la informacion se vaya limpia al backend.
    *
    * @author Gerardo Ortiz
    * @return object
    * @param object formValues
    */
   public trimObject(formValues): any {
    return Object.keys(formValues).reduce((key, value) => {
        key[value] = formValues[value].toString().trim()
        return key;
    }, {});
    }

}
