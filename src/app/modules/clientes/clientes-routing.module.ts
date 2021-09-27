import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    data: {
      title: 'Clientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TooltipModule.forRoot(), TypeaheadModule.forRoot()],
  exports: [RouterModule, TooltipModule, TypeaheadModule]
})
export class ClientesRoutingModule { }
