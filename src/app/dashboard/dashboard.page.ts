import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Paquete } from '../models/paquete.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  a_repartir = 0;
  por_repartir = 0;
  entregados = 0;
  loading = true;

  constructor(private firestore:Firestore) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.getPaquetes();
  }

  async getPaquetes() {
    collectionData(collection(this.firestore, 'items'), {
      idField: 'id'
    }).subscribe(async (i) => { 
      this.a_repartir = i.filter((i:any) => i.estado == 'A REPARTIR').length;
      this.por_repartir = i.filter((i:any) => i.estado == 'POR REPARTIR').length;
      this.entregados = i.filter((i:any) => i.estado == 'ENTREGADO').length;
      this.loading = false; 
    } );
  }

}
