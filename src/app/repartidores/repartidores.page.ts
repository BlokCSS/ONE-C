import { Component, OnInit } from '@angular/core';
import { Repartidor } from '../models/repartidor.models';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-repartidores',
  templateUrl: './repartidores.page.html',
  styleUrls: ['./repartidores.page.scss'],
})
export class RepartidoresPage implements OnInit {
  repartidores = [] as Array<Repartidor>;
  constructor(private router:Router, public generalService:GeneralService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.repartidores = JSON.parse(localStorage.getItem("one_c_Repartidores")!);
    var paquetes = JSON.parse(localStorage.getItem("one_c_Paquetes")!);
    if(paquetes && paquetes.length > 0) {
      this.repartidores.forEach(element => {
        var cantidad = paquetes.filter((p:any) => p.repartidorID == element.id);
        element.porRepartir = cantidad.length;
      });
    }
  }

  verRepartidor(id:number) {
    this.router.navigate(["/repartidor-detalle", id]);
  }

}
