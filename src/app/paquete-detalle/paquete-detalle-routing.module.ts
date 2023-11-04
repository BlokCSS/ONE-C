import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaqueteDetallePage } from './paquete-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PaqueteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaqueteDetallePageRoutingModule {}
