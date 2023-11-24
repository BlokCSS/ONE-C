import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repartidor } from '../models/repartidor.models';
import { Paquete } from '../models/paquete.models';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-repartidor-detalle',
  templateUrl: './repartidor-detalle.page.html',
  styleUrls: ['./repartidor-detalle.page.scss'],
})
export class RepartidorDetallePage implements OnInit {

  id="";
  cantidad:number=0;
  repartidor= {} as Repartidor;
  porRepartir = [] as Array<Paquete>;
  constructor(private activatedRoute:ActivatedRoute,private router:Router, public generalService:GeneralService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    
    this.repartidor = JSON.parse(localStorage.getItem("one_c_Repartidores")!).find((r:any) => r.id.toString() == this.id);
    var paquetes = JSON.parse(localStorage.getItem("one_c_Paquetes")!).filter((p:any) => p.repartidorID == this.repartidor.id);
    this.cantidad = paquetes.length;
    this.porRepartir = JSON.parse(localStorage.getItem("one_c_Paquetes")!).filter((p:any) => p.repartidorID == this.repartidor.id && p.estado == "A REPARTIR");
  }

  verPaquete(id:string) {
    console.log(id)
    this.router.navigate(["/paquete-detalle", id]);
  }

}
