import { Component, OnInit, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { modificarClientesComponent } from './modificarClientes.component';
import { agregarClientesComponent } from './agregarClientes.component';
import { ClientesService } from '../services/clientesService.service';
import { HttpErrorResponse } from '@angular/common/http';
import { clientes } from '../interfaces/clientes.interface';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: '../views/clientes.component.html',
  styleUrls: ['../styles/clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes : clientes[];
  bsModalRef: BsModalRef;
  numeroSeleccionado: string;
  nombreSeleccionado: string;
  noResultNumero = false;
  noResultNombre = false;
  key: string = 'idu_cliente';
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
  private clientesService: ClientesService, private _el: ElementRef) {}

  ngOnInit() {
    this.cargarClientes();
  }

  /**
  * Consulta todos los clientes que esten en el catalogo de la empresa.
  *
  * @author Gerardo Ortiz
  * @return void
  */
  public cargarClientes(): void {
    this.pagination = {currentPage:this.configPagination.currentPage, itemsPerPage:this.configPagination.itemsPerPage};
    this.clientesService.cargarClientes(this.pagination).subscribe(respuesta => {
      this.clientes = respuesta.response.data;
      this.configPagination = {
        currentPage : respuesta.response.current_page,
        itemsPerPage : respuesta.response.per_page,
        totalItems: respuesta.response.total
      };
    },
    (err: HttpErrorResponse) => {
        swal('Error', "Sucedio un error al momento de cargar los clientes.", 'error');
    });
  }

  /**
  * levanta el modal para actualizar el cliente.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param number numerocliente
  */
  public actualizarCliente(numerocliente : number): void {
    const initialState = {
      numerocliente: numerocliente
    };
    
    this.bsModalRef = this.modalService.show(modificarClientesComponent, {initialState, class: 'modal-lg', ignoreBackdropClick: true});
    this.bsModalRef.content.onClose.subscribe(resultado => {
      if (resultado) {
        this.cargarClientes();
      }
    });
  }

  /**
  * elimina el cliente por su id.
  *
  * @author Gerardo Ortiz
  * @return void
  * @param number numerocliente
  */
  public eliminarCliente(numerocliente : number): void {
    swal({
      title: '¿Esta seguro que desea eliminar este cliente?',
      text: "No se podrá revertir",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clientesService.eliminarCliente(numerocliente).subscribe(respuesta => {
          swal('Eliminacion exitosa', "El cliente fue eliminado con éxito.", 'success');
          this.cargarClientes();
        },
        (err: HttpErrorResponse) => {
            swal('Error', "Sucedio un error al momento de eliminar el cliente.", 'error');
        });
      }
    })
  }

  /**
  * levanta el modal para agregar un nuevo cliente.
  *
  * @author Gerardo Ortiz
  * @return void
  */
  public agregarCliente(): void {
    this.bsModalRef = this.modalService.show(agregarClientesComponent, {class: 'modal-lg', ignoreBackdropClick: true});
    this.bsModalRef.content.onClose.subscribe(resultado => {
      if (resultado) {
        this.cargarClientes();
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
    this.cargarClientes();
  }
}
