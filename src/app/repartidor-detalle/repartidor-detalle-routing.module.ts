import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartidorDetallePage } from './repartidor-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: RepartidorDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartidorDetallePageRoutingModule {}
