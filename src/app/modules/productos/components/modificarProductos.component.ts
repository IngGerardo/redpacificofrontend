import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductosService } from '../services/productosService.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { productos } from '../interfaces/productos.interface';
import swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modificarProductos',
  templateUrl: '../views/modificarProductos.component.html',
  styleUrls: ['../styles/productos.component.css']
})
export class modificarProductosComponent implements OnInit {
    numeroproducto: number;
    public onClose: Subject<boolean>;
    updateForm: FormGroup;
    submitted = false;
    productoActualizado: any;
    producto: productos;
   
    constructor(public bsModalRef: BsModalRef, 
    private productosService: ProductosService, private formBuilder: FormBuilder) {}
   
    ngOnInit() {
        this.onClose = new Subject();

        this.updateForm = this.formBuilder.group({
            idu_producto: new FormControl({value: '', disabled: true}),
            des_producto: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            des_modelo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            num_precio: new FormControl('', [Validators.required, Validators.maxLength(8)]),
            num_existencia: new FormControl('', [Validators.required, Validators.maxLength(5)])
        });
        this.productosService.cargarProducto(this.numeroproducto).subscribe(respuesta => {
            this.producto = respuesta.response;
            this.updateForm.setValue({
                idu_producto: this.producto.idu_producto, 
                des_producto: this.producto.des_producto,
                des_modelo: this.producto.des_modelo,
                num_precio: this.producto.num_precio,
                num_existencia: this.producto.num_existencia
            });
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de cargar el producto.", 'error');
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
    * Actualiza los productos de la empresa.
    *
    * @author Gerardo Ortiz
    * @return void
    */
    public onSubmit(): void {
        this.submitted = true;
        if (this.updateForm.invalid) {
            return;
        }
        this.productoActualizado = this.trimObject(this.formValues);
        this.productosService.actualizarProducto(this.numeroproducto, this.productoActualizado).subscribe(respuesta => {
            this.onClose.next(true);
            this.bsModalRef.hide();
            swal('Actualizacion exitosa', "El producto fue actualizado con éxito.", 'success');
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de actualizar el producto.", 'error');
        });
    }

    /**
    * Cierra la actualizacion de los productos.
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
