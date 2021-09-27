import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionComponent,
    data: {
      title: 'Configuración'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TooltipModule.forRoot(), TypeaheadModule.forRoot()],
  exports: [RouterModule, TooltipModule, TypeaheadModule]
})
export class ConfiguracionRoutingModule { }
