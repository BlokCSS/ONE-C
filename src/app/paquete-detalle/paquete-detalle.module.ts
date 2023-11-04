import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaqueteDetallePageRoutingModule } from './paquete-detalle-routing.module';

import { PaqueteDetallePage } from './paquete-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaqueteDetallePageRoutingModule
  ],
  declarations: [PaqueteDetallePage]
})
export class PaqueteDetallePageModule {}
