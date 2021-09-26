import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './components/productos.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  {
    path: '',
    component: ProductosComponent,
    data: {
      title: 'Productos'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TooltipModule.forRoot(), TypeaheadModule.forRoot()],
  exports: [RouterModule, TooltipModule, TypeaheadModule]
})
export class ProductosRoutingModule { }
