import { Component, OnInit } from '@angular/core';
import { Firestore, deleteDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { GeneralService } from '../general.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre="";
  telefono="";
  correo="";
  edad="";
  contra = "";
  pais="Chile";
  paises: Array<{pais:string,codigo:string}> = [
    {pais:"Chile",codigo:"+56"},
    {pais:"Monaco",codigo:"+377"},
  ];

  botonAction="Cerrar sesión";
  uid = "";

  constructor(private firestore:Firestore,private generalService:GeneralService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.uid = JSON.parse(localStorage.getItem('one_c_user')!).uid;

    docData(doc(this.firestore, 'users/'+this.uid)).subscribe((i:any) => {
      this.nombre = i['nombre'];
      if(i['telefono'].includes('+56')) {
        this.pais = "Chile";
        this.telefono = i['telefono'].replace('+56','');
      } else {
        this.pais = "Monaco";
        this.telefono = i['telefono'].replace('+377','');
      }
      this.contra = i['password'];
      this.correo = i['email'];
      this.edad = i['edad'];
    });
  }

  actualizar(){
    const document = doc(this.firestore, 'users',this.uid);
    var SetDoc = setDoc(document, {
      nombre:this.nombre,
      telefono:this.paises.find(p => p.pais == this.pais)?.codigo+this.telefono,
      email:this.correo,
      password:this.contra,
      id_auth:this.uid,
      edad:this.edad
    });

    this.generalService.showToast("success","Información actualizada correctamente");
  }

  cerrarSesion() {
    this.generalService.desconectarse();
  }

}
