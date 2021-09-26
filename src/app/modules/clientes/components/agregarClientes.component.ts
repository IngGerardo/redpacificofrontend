import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClientesService } from '../services/clientesService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregarClientes',
  templateUrl: '../views/agregarClientes.component.html',
  styleUrls: ['../styles/clientes.component.css']
})
export class agregarClientesComponent implements OnInit {
    public onClose: Subject<boolean>;
    registerForm: FormGroup;
    submitted = false;
    cliente: any;
   
    constructor(public bsModalRef: BsModalRef, private clientesService: ClientesService,
    private formBuilder: FormBuilder) {}
   
    ngOnInit() {
        this.onClose = new Subject();

        this.registerForm = this.formBuilder.group({
            nom_cliente: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_apellidopaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_apellidomaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_rfc: new FormControl('', [Validators.required, Validators.maxLength(13)])
        });
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
    * Registra a los nuevos clientes de la empresa.
    *
    * @author Gerardo Ortiz
    * @return void
    */
    public onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.cliente = this.trimObject(this.formValues);
        this.clientesService.guardarCliente(this.cliente).subscribe(respuesta => {
            this.onClose.next(true);
            this.bsModalRef.hide();
            swal('Registro exitoso', "El cliente fue registrado con éxito.", 'success');
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de registrar el cliente.", 'error');
        });
    }

    /**
    * Cierra el registro de clientes.
    *
    * @author Gerardo Ortiz
    * @return void
    */
    public onCancel(): void {
        this.onClose.next(false);
        this.bsModalRef.hide();
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
