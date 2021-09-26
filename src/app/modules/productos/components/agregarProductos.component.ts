import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProductosService } from '../services/productosService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-agregarProductos',
  templateUrl: '../views/agregarProductos.component.html',
  styleUrls: ['../styles/productos.component.css']
})
export class agregarProductosComponent implements OnInit {
    public onClose: Subject<boolean>;
    registerForm: FormGroup;
    submitted = false;
    producto: any;
   
    constructor(public bsModalRef: BsModalRef, private productosService: ProductosService,
    private formBuilder: FormBuilder) {}
   
    ngOnInit() {
        this.onClose = new Subject();

        this.registerForm = this.formBuilder.group({
            des_producto: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_modelo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            num_precio: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            num_existencia: new FormControl('', [Validators.required, Validators.maxLength(5)])
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
    * Registra a los nuevos productos de la empresa.
    *
    * @author Gerardo Ortiz
    * @return void
    */
    public onSubmit(): void {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.producto = this.trimObject(this.formValues);
        this.productosService.guardarProducto(this.producto).subscribe(respuesta => {
            this.onClose.next(true);
            this.bsModalRef.hide();
            swal('Registro exitoso', "El producto fue registrado con éxito.", 'success');
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de registrar el producto.", 'error');
        });
    }

    /**
    * Cierra el registro de productos.
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
