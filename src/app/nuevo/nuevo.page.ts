import { Component, OnInit } from '@angular/core';
import { Repartidor } from '../models/repartidor.models';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GeneralService } from '../general.service';
import { Firestore, collection, doc, docData, setDoc } from '@angular/fire/firestore';
import { Paquete } from '../models/paquete.models';

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

  id="Nuevo";
  botonText="Crear";

  constructor(
    private camera:Camera,
    private router:Router,
    private toastController:ToastController,
    public generalService:GeneralService,
    private firestore:Firestore,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id != "Nuevo") {
      this.botonText= "Actualizar";
      docData(doc(this.firestore, 'items/'+this.id), {
        idField: 'id'
      }).subscribe((i:any) => {
        this.titulo = i.nombre;
        this.autor = i.autor;
        this.imagen = i.imagen;
        this.descripcion = i.descripcion;
        this.repartidorID = i.repartidorID ? i.repartidorID : 0;
        this.precio = i.precio;
      });
      
    }
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
    } else if(/^[0-9]+$/.test(this.precio) == false) {
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

    var document = doc(collection(this.firestore, 'items'));
    if(this.botonText == "Actualizar") {
      document = doc(this.firestore, 'items',this.id);
    }
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
    this.generalService.showToast("success",this.id != "Nuevo" ? "Paquete actualizado con exito!" :  "Paquete creado con exito!");
    return true;
  }

}
