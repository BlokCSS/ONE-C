import { Component } from '@angular/core';
import { Paquete } from '../models/paquete.models';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { collectionData, collection, addDoc, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  paquetes = [] as Paquete[];
  loading = true;
  constructor(
    private router:Router,
    public generalService:GeneralService,
    private firestore:Firestore
    ) {}

  async ionViewWillEnter() {
    this.getPaquetes();
  }

  async getPaquetes() {
    collectionData(collection(this.firestore, 'items'), {
      idField: 'id'
    }).subscribe(async (i) => { console.log(i); this.paquetes = await <Paquete[]>i; this.loading = false; } );
  }

  verPaquete(id:number) {
    console.log(id)
    this.router.navigate(["/paquete-detalle", id.toString()]);
  }

}
