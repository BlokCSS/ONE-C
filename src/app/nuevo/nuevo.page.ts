import { Component, OnInit } from '@angular/core';
import { Repartidor } from '../models/repartidor.models';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../general.service';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.page.html',
  styleUrls: ['./nuevo.page.scss'],
})
export class NuevoPage implements OnInit {
  titulo="";
  autor="";
  imagen = "";
  repartidorID = 0;
  repartidores = [] as Array<Repartidor>;
  descripcion="";
  precio="";

  constructor(
    private camera:Camera,
    private router:Router,
    private toastController:ToastController,
    public generalService:GeneralService,
    private firestore:Firestore
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.repartidores = JSON.parse(localStorage.getItem("one_c_Repartidores")!);
  }

  validar() {
    if(this.titulo == "") {
      this.generalService.showToast("danger","Debe completar el campo titulo");
      return false;
    } else if(this.descripcion == "") {
        this.generalService.showToast("danger","Debe completar el campo descripcion");
        return false;
    } else if(this.precio == "") {
        this.generalService.showToast("danger","Debe completar el campo precio");
        return false;
    } else if(this.precio.match(/^[0-9]+$/) == null) {
      this.generalService.showToast("danger","El precio solo debe contener numeros");
      return false;
    } else if(this.autor == "") {
      this.generalService.showToast("danger","Debe completar el campo autor");
      return false;
    } else if(this.imagen == "") {
      this.generalService.showToast("danger","Debe seleccionar una imagen");
      return false;
    }

    return true;
  }

  crear() {
    if(!this.validar()) return false;

    const document = doc(collection(this.firestore, 'items'));
    var SetDoc = setDoc(document, {
      nombre:this.titulo,
      descripcion:this.descripcion,
      precio:this.precio,
      autor:this.autor,
      imagen:this.imagen,
      repartidorID:this.repartidorID,
      estado:(this.repartidorID > 0 ? "A REPARTIR" : "POR REPARTIR")
    });

    this.router.navigate(["/home"],{replaceUrl:true});
    this.generalService.showToast("success","Paquete creado con exito!");
    return true;
  }

}
