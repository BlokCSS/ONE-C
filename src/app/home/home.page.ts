import { Component } from '@angular/core';
import { Paquete } from '../models/paquete.models';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { collectionData, collection, addDoc, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  paquetes = [] as Paquete[];
  todos_paquetes = [] as Paquete[];
  loading = true;
  filtrarEstado = "";

  constructor(
    private router:Router,
    public generalService:GeneralService,
    private firestore:Firestore,
    private actionSheetController:ActionSheetController,
    private alertController:AlertController
    ) {}

  async ionViewWillEnter() {
    this.getPaquetes();
  }

  async getPaquetes() {
    collectionData(collection(this.firestore, 'items'), {
      idField: 'id'
    }).subscribe(async (i) => { 
      console.log(i);
      this.todos_paquetes = await <Paquete[]>i;
      this.paquetes = await <Paquete[]>i;
      this.loading = false; 
    } );
  }

  verPaquete(id:string) {
    console.log(id)
    this.router.navigate(["/paquete-detalle", id]);
  }

  filtrar() {
    if(this.filtrarEstado == "") {
      this.paquetes = this.todos_paquetes;
    } else {
      this.paquetes = this.todos_paquetes.filter(p => p.estado == this.filtrarEstado);
    }
  }

  async opciones(item:Paquete) {
    const actionSheet = await this.actionSheetController.create({
      header: item.nombre,
      buttons: [
        {
          text: 'Editar',
          data: {
            action: 'editar',
          },
        },
        {
          text: 'Eliminar',
          data: {
            action: 'Eliminar',
          },
        }
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result);
    if(result['data']['action'] == "editar") {
      this.router.navigate(['nuevo', item.id]);
    } else {
      this.eliminar(item);
    }
  }

  async eliminar(item:Paquete) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'Esta seguro de eliminar el paquete '+item.nombre+ ' ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            const document = doc(this.firestore, 'items',item.id);
            deleteDoc(document);
          },
        },
      ],
    });

    await alert.present();
  }

}
