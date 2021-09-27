import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { VentasComponent } from './components/ventas.component';
import { OnlyNumbers } from './directives/onlynumber.directive';
import { OnlyNumbersDecimal } from './directives/onlynumberdecimal.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [VentasComponent,OnlyNumbers, OnlyNumbersDecimal],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FilterPipeModule,
    NgxPaginationModule,
    OrderModule
  ],
  entryComponents: [
  ]
})
export class VentasModule { }
