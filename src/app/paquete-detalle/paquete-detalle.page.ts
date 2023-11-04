import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paquete } from '../models/paquete.models';
import { Repartidor } from '../models/repartidor.models';
import { ToastController } from '@ionic/angular';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-paquete-detalle',
  templateUrl: './paquete-detalle.page.html',
  styleUrls: ['./paquete-detalle.page.scss'],
})
export class PaqueteDetallePage implements OnInit {
  id="";
  paquete = {} as Paquete;
  repartidor = {} as Repartidor;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastController:ToastController,
    private firestore:Firestore,
    public generalService:GeneralService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    docData(doc(this.firestore, 'items/'+this.id), {
      idField: 'id'
    }).subscribe((i) => {
      this.paquete = <Paquete>i;
    });
    this.paquete = JSON.parse(localStorage.getItem("one_c_Paquetes")!).find((p:any) => p.id.toString() == this.id);
    this.repartidor = JSON.parse(localStorage.getItem("one_c_Repartidores")!).find((r:any) => r.id == this.paquete.repartidorID);
  }

  async showToast(color:any,msg:any,duracion=3000) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion,
      color:color
    });

    await toast.present();
  }

}
