import { Component, OnInit, ElementRef } from '@angular/core';
import { VentasService } from '../services/ventasService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ventas } from '../interfaces/ventas.interface';
import { ventasCliente } from '../interfaces/ventasCliente.interface';
import { clientes } from '../../clientes/interfaces/clientes.interface';
import { productos } from '../../productos/interfaces/productos.interface';
import swal from 'sweetalert2';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-ventas',
  templateUrl: '../views/ventas.component.html',
  styleUrls: ['../styles/ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventasCliente : ventasCliente[];
  venta : ventas;
  clientes : clientes[];
  productos : productos[];
  cliente : string;
  producto : string;
  clienteSeleccionado: clientes;
  productoSeleccionado: productos;
  noResultProducto = false;
  noResultCliente = false;
  enganche : string;
  bonificacion : string;
  total : string;
  cantidad : number;
  pagination: any;
  configPagination = {
    currentPage : 1,
    itemsPerPage : 10,
    totalItems: 0
  };

  constructor(private ventasService: VentasService, 
    private _el: ElementRef) {}

  ngOnInit() {
    this.ventasCliente = [];
    this.cargarClientes();
    this.cargarProductos();
  }

  /**
  * Establece el cliente elegido para guardar la venta.
  *
  * @author Gerardo Ortiz
  * @return void
  */

 public onSelectCliente(event: TypeaheadMatch): void {
    this.clienteSeleccionado = event.item;
    this.cargarVentas(this.clienteSeleccionado.idu_cliente);
  }

  /**
  * Establece el producto elegido para guardar la venta.
  *
  * @author Gerardo Ortiz
  * @return void
  */

 public onSelectProducto(event: TypeaheadMatch): void {
    this.productoSeleccionado = event.item;
  }

  /**
  * Consulta los clientes que estan en el catalogo de la empresa.
  *
  * @author Gerardo Ortiz
  * @return void
  */
 public cargarClientes(): void {
  this.ventasService.cargarClientes().subscribe(respuesta => {
    this.clientes = respuesta.response;
  },
  (err: HttpErrorResponse) => {
      swal('Error', "Sucedio un error al momento de cargar los clientes.", 'error');
  });
}

  /**
  * Consulta los productos que estan en el catalogo de la empresa.
  *
  * @author Gerardo Ortiz
  * @return void
  */
 public cargarProductos(): void {
  this.ventasService.cargarProductos().subscribe(respuesta => {
    this.productos = respuesta.response;
    if(this.productoSeleccionado) {
      this.productoSeleccionado = this.productos.find(obj => {
        return obj.idu_producto == this.productoSeleccionado.idu_producto;
      });
    }
  },
  (err: HttpErrorResponse) => {
      swal('Error', "Sucedio un error al momento de cargar los productos.", 'error');
  });
}

/**
* Registra a los la nueva configuración de la empresa.
*
* @author Gerardo Ortiz
* @return void
*/
public onSubmit(): void {
    if (!this.clienteSeleccionado){
      swal('Aviso', "Favor de seleccionar un cliente.", 'info');
      return;
    }
    if (!this.productoSeleccionado) {
      swal('Aviso', "Favor de seleccionar un producto.", 'info');
      return;
    }
    if (this.cantidad > this.productoSeleccionado.num_existencia){
      swal('Aviso', "Favor de ingresar una cantidad menor o igual que la existencia del producto.", 'info');
      return;
    }

    this.venta = {
      idu_venta:0,
      idu_cliente: this.clienteSeleccionado.idu_cliente,
      idu_producto: this.productoSeleccionado.idu_producto,
      num_cantidad: this.cantidad,
      fec_registro: ""
    };

    this.ventasService.guardarVenta(this.venta).subscribe(respuesta => {
      if (respuesta.response) {
        this.cargarProductos();
        this.cargarVentas(this.clienteSeleccionado.idu_cliente);
        swal('Registro exitoso', "El producto fue registrado con éxito.", 'success');
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
  public cargarVentas(numerocliente: number): void {
    this.pagination = {currentPage:this.configPagination.currentPage, itemsPerPage:this.configPagination.itemsPerPage};
    this.ventasService.cargarVentas(numerocliente, this.pagination).subscribe(respuesta => {
      this.ventasCliente = respuesta.response.data;
      this.enganche = respuesta.ventasGenerales.enganche;
      this.bonificacion = respuesta.ventasGenerales.bonificacion;
      this.total = respuesta.ventasGenerales.total;
      this.configPagination = {
        currentPage : respuesta.response.current_page,
        itemsPerPage : respuesta.response.per_page,
        totalItems: respuesta.response.total
      };
    },
    (err: HttpErrorResponse) => {
        swal('Error', "Sucedio un error al momento de consultar las ventas del cliente.", 'error');
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

     /**
  * cambia la variable a verdadero si no se encontraron resultados de nombre.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param boolean event
  */
  public typeaheadNoResultsCliente(event: boolean): void {
    this.noResultCliente = event;
  }

  /**
  * cambia la variable a verdadero si no se encontraron resultados de nombre.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param boolean event
  */
  public typeaheadNoResultsProducto(event: boolean): void {
    this.noResultProducto = event;
  }

  /**
  * evento que cambia la pagina en el paginador de la tabla.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param event key
  */
  public pageChanged(event):void {
    this.configPagination.currentPage = event;
    if (this.clienteSeleccionado) {
      this.cargarProductos();
      this.cargarVentas(this.clienteSeleccionado.idu_cliente);
    }
    
  }

  /**
  * elimina la venta por su id.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param number idventa
  */
 public eliminarVenta(idventa : number): void {
  swal({
    title: '¿Esta seguro que desea eliminar esta venta?',
    text: "No se podrá revertir",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.value) {
      this.ventasService.eliminarVenta(idventa).subscribe(respuesta => {
        if (respuesta.response) {
          this.cargarProductos();
          this.cargarVentas(this.clienteSeleccionado.idu_cliente);
          swal('Eliminacion exitosa', "La venta fue eliminada con éxito.", 'success');
        }
      },
      (err: HttpErrorResponse) => {
          swal('Error', "Sucedio un error al momento de eliminar la venta.", 'error');
      });
    }
  })
}

}
