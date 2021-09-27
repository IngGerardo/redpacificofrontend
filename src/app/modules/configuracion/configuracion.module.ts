import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfiguracionComponent } from './components/configuracion.component';
import { OnlyNumbers } from './directives/onlynumber.directive';
import { OnlyNumbersDecimal } from './directives/onlynumberdecimal.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [ConfiguracionComponent,OnlyNumbers, OnlyNumbersDecimal],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
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
export class ConfiguracionModule { }
