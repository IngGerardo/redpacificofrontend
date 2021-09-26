import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { modificarProductosComponent } from './modificarProductos.component';
import { agregarProductosComponent } from './agregarProductos.component';
import { ProductosService } from '../services/productosService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { productos } from '../interfaces/productos.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: '../views/productos.component.html',
  styleUrls: ['../styles/productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos : productos[];
  bsModalRef: BsModalRef;
  numeroSeleccionado: string;
  nombreSeleccionado: string;
  noResultNumero = false;
  noResultNombre = false;
  key: string = 'idu_producto';
  reverse: boolean = false;
  pagination: any;
  configPagination = {
    currentPage : 1,
    itemsPerPage : 10,
    totalItems: 0
  };
  nombretipo: string;
  nombrerol: string;
  constructor(private modalService: BsModalService, 
  private productosService: ProductosService, private _el: ElementRef) {}

  ngOnInit() {
    this.cargarProductos();
  }

  /**
  * Consulta todos los productos que esten en el catalogo de la empresa.
  *
  * @author Gerardo Ortiz
  * @return void
  */
  public cargarProductos(): void {
    this.pagination = {currentPage:this.configPagination.currentPage, itemsPerPage:this.configPagination.itemsPerPage};
    this.productosService.cargarProductos(this.pagination).subscribe(respuesta => {
      this.productos = respuesta.response.data;
      this.configPagination = {
        currentPage : respuesta.response.current_page,
        itemsPerPage : respuesta.response.per_page,
        totalItems: respuesta.response.total
      };
    },
    (err: HttpErrorResponse) => {
        swal('Error', "Sucedio un error al momento de cargar los productos.", 'error');
    });
  }

  /**
  * levanta el modal para actualizar el producto.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param number numeroproducto
  */
  public actualizarProducto(numeroproducto : number): void {
    const initialState = {
      numeroproducto: numeroproducto
    };
    
    this.bsModalRef = this.modalService.show(modificarProductosComponent, {initialState, class: 'modal-lg', ignoreBackdropClick: true});
    this.bsModalRef.content.onClose.subscribe(resultado => {
      if (resultado) {
        this.cargarProductos();
      }
    });
  }

  /**
  * elimina el producto por su id.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param number numeroproducto
  */
  public eliminarProducto(numeroproducto : number): void {
    swal({
      title: '¿Esta seguro que desea eliminar este producto?',
      text: "No se podrá revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.productosService.eliminarProducto(numeroproducto).subscribe(respuesta => {
          swal('Eliminacion exitosa', "El producto fue eliminado con éxito.", 'success');
          this.cargarProductos();
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de eliminar el producto.", 'error');
        });
      }
    })
  }

  /**
  * levanta el modal para agregar un nuevo producto.
  *
  * @author Gerardo Ortiz
  * @return void
  */
  public agregarProducto(): void {
    this.bsModalRef = this.modalService.show(agregarProductosComponent, {class: 'modal-lg', ignoreBackdropClick: true});
    this.bsModalRef.content.onClose.subscribe(resultado => {
      if (resultado) {
        this.cargarProductos();
      }
    });
  }

  /**
  * cambia la variable a verdadero si no se encontraron resultados de numero.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param boolean event
  */
  public typeaheadNoResultsNumber(event: boolean): void {
    this.noResultNumero = event;
  }

  /**
  * cambia la variable a verdadero si no se encontraron resultados de nombre.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param boolean event
  */
  public typeaheadNoResultsName(event: boolean): void {
    this.noResultNombre = event;
  }

  /**
  * ordena la columna por su respectivo nombre en ascedente o descendente.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param string key
  */
  public sort(key): void {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public pageChanged(event):void {
    this.configPagination.currentPage = event;
    this.cargarProductos();
  }
}
