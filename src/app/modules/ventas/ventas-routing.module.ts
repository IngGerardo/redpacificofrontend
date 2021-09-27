import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasComponent } from './components/ventas.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    data: {
      title: 'Ventas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TooltipModule.forRoot(), TypeaheadModule.forRoot()],
  exports: [RouterModule, TooltipModule, TypeaheadModule]
})
export class VentasRoutingModule { }
