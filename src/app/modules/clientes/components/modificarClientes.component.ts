import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientesService } from '../services/clientesService.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { clientes } from '../interfaces/clientes.interface';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modificarClientes',
  templateUrl: '../views/modificarClientes.component.html',
  styleUrls: ['../styles/clientes.component.css']
})
export class modificarClientesComponent implements OnInit {
    numerocliente: number;
    public onClose: Subject<boolean>;
    updateForm: FormGroup;
    submitted = false;
    clienteActualizado: any;
    cliente: clientes;
   
    constructor(public bsModalRef: BsModalRef, 
    private clientesService: ClientesService, private formBuilder: FormBuilder) {}
   
    ngOnInit() {
        this.onClose = new Subject();

        this.updateForm = this.formBuilder.group({
            idu_cliente: new FormControl({value: '', disabled: true}),
            nom_cliente: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_apellidopaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_apellidomaterno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_rfc: new FormControl('', [Validators.required, Validators.maxLength(50)])
        });
        this.clientesService.cargarCliente(this.numerocliente).subscribe(respuesta => {
            this.cliente = respuesta.response;
            this.updateForm.setValue({
                idu_cliente: this.cliente.idu_cliente, 
                nom_cliente: this.cliente.nom_cliente,
                des_apellidopaterno: this.cliente.des_apellidopaterno,
                des_apellidomaterno: this.cliente.des_apellidomaterno,
                des_rfc: this.cliente.des_rfc
            });
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de cargar el cliente.", 'error');
        });
    }

    /**
    * Regresa todos los valores y controles del formulario de actualizacion.
    *
    * @author Gerardo Ortiz
    * @return object
    */
    get formValues() { return this.updateForm.value; }
    get form() { return this.updateForm.controls; }

    /**
    * Actualiza los clientes de la empresa.
    *
    * @author Gerardo Ortiz
    * @return void
    */
    public onSubmit(): void {
        this.submitted = true;
        if (this.updateForm.invalid) {
            return;
        }
        this.clienteActualizado = this.trimObject(this.formValues);
        this.clientesService.actualizarCliente(this.numerocliente, this.clienteActualizado).subscribe(respuesta => {
            this.onClose.next(true);
            this.bsModalRef.hide();
            swal('Actualizacion exitosa', "El cliente fue actualizado con éxito.", 'success');
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de actualizar el cliente.", 'error');
        });
    }

    /**
    * Cierra la actualizacion de los clientes.
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
