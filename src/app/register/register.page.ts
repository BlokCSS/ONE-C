import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Firestore, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  nombre="";
  telefono="";
  correo="";
  contra="";
  edad="";

  pais="Chile";
  paises: Array<{pais:string,codigo:string}> = [
    {pais:"Chile",codigo:"+56"},
    {pais:"Monaco",codigo:"+377"},
  ];
  constructor(private generalService:GeneralService, private firestore:Firestore,private router:Router) { }

  ngOnInit() {
  }

  async crear() {
    if(this.validar()) {
      createUserWithEmailAndPassword(getAuth(), this.correo,this.contra)
      .then((result) => {

        const document = doc(this.firestore, 'users',result.user.uid);
        var SetDoc = setDoc(document, {
          nombre:this.nombre,
          telefono:this.paises.find(p => p.pais == this.pais)?.codigo+this.telefono,
          email:this.correo,
          password:this.contra,
          id_auth:result.user.uid,
          edad:this.edad
        });
        this.generalService.showToast("success","Usuario registrado con exito");
        this.router.navigate(['dashboard'],{replaceUrl:true});
      })
      .catch((error) => {
        console.log(error.message);
        if(error.message.toString().includes("auth/invalid-email")) 
          this.generalService.showToast("danger","Debe ingresar un correo electronico valido");
        else if(error.message.toString().includes("auth/email-already-in-use")) 
          this.generalService.showToast("danger","El correo electronico ya se encuentra registrado");
        else
          this.generalService.showToast("danger","Ocurrio un error");
        
      });
    }
  }

  validar() {
    if(this.nombre == "") {
      this.generalService.showToast("danger","Debe completar el campo nombre");
      return false;
    }

    if(this.correo == "") {
      this.generalService.showToast("danger","Debe completar el campo correo electronico");
      return false;
    } else {
      if(!this.isValidCorreo(this.correo)) {
        this.generalService.showToast("danger","Debe ingresar un correo electronico valido");
        return false;
      }
    }

    if(this.edad == "") {
      this.generalService.showToast("danger","Debe completar el campo edad");
      return false;
    } else {
      if(Number(this.edad) < 18) {
        this.generalService.showToast("danger","La edad minima para registrarse es de 18 años");
        return false;
      }
    }

    if(this.telefono == "") {
      this.generalService.showToast("danger","Debe completar el campo telefono");
      return false;
    } else {
      if(this.telefono.length != 9) {
        this.generalService.showToast("danger","El telefono debe tener 9 caracteres");
        return false;
      }
    }

    if(this.contra == "") {
      this.generalService.showToast("danger","Debe completar el campo contraseña");
      return false;
    } else {
      if(this.contra.length < 6) {
        this.generalService.showToast("danger","La contraseña debe tener almenos 6 caracteres");
        return false;
      }
    }

    return true;
  }

  isValidCorreo(correo:string) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (correo.match(validRegex)) return true;
    return false;
  }

}
