import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductosComponent } from './components/productos.component';
import { modificarProductosComponent } from './components/modificarProductos.component';
import { agregarProductosComponent } from './components/agregarProductos.component';
import { OnlyNumbers } from './directives/onlynumber.directive';
import { OnlyLetters } from './directives/onlyletter.directive';
import { OnlyAlphanumeric } from './directives/onlyalphanumeric.directive';
import { OnlyUppercase } from './directives/onlyuppercase.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [ProductosComponent, modificarProductosComponent, OnlyUppercase,
    agregarProductosComponent, OnlyNumbers, OnlyLetters, OnlyAlphanumeric],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    OrderModule
  ],
  entryComponents: [
    modificarProductosComponent,
    agregarProductosComponent
  ]
})
export class ProductosModule { }
