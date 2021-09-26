import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ClientesComponent } from './components/clientes.component';
import { modificarClientesComponent } from './components/modificarClientes.component';
import { agregarClientesComponent } from './components/agregarClientes.component';
import { OnlyNumbers } from './directives/onlynumber.directive';
import { OnlyLetters } from './directives/onlyletter.directive';
import { OnlyAlphanumeric } from './directives/onlyalphanumeric.directive';
import { OnlyUppercase } from './directives/onlyuppercase.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [ClientesComponent, modificarClientesComponent, OnlyUppercase,
    agregarClientesComponent, OnlyNumbers, OnlyLetters, OnlyAlphanumeric],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    OrderModule
  ],
  entryComponents: [
    modificarClientesComponent,
    agregarClientesComponent
  ]
})
export class ClientesModule { }
