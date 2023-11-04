import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartidorDetallePageRoutingModule } from './repartidor-detalle-routing.module';

import { RepartidorDetallePage } from './repartidor-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartidorDetallePageRoutingModule
  ],
  declarations: [RepartidorDetallePage]
})
export class RepartidorDetallePageModule {}
