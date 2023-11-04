import { Component, OnInit } from '@angular/core';
import { authState, getAuth, signInWithEmailAndPassword,Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo="";
  contra="";
  constructor(private router:Router,private generalService:GeneralService,private auth:Auth) { }

  ngOnInit() {
  }

  validar() {
    if(this.correo == "") {
      this.generalService.showToast("danger","Debe ingresar un correo electronico");
      return false;
    } else {
      if(!this.isValidCorreo(this.correo)){
        this.generalService.showToast("danger","Debe ingresar un correo electronico valido");
        return false;
      }
    }

    if(this.contra == "") {
      this.generalService.showToast("danger","Debe ingresar una contraseña");
      return false;
    } else {
      if(this.contra.length < 6){
        this.generalService.showToast("danger","La contraseña debe tener al menos 6 caracteres");
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

  login() {
    if(!this.validar()) return false;

    signInWithEmailAndPassword(this.auth,this.correo,this.contra)
      .then(async (result) => {
        authState(this.auth).subscribe((user:any) => {
          if (user) {
            this.router.navigate(['home'],{replaceUrl:true});
          }
        });
      })
      .catch((error) => {
        console.log(error.message);
        if(error.message.toString().includes("auth/invalid-email")) 
          this.generalService.showToast("danger","Debe ingresar un correo electronico valido");
        else if(error.message.toString().includes("invalid-login-credentials"))
          this.generalService.showToast("danger","Usuario/Contraseña no coinciden en nuestra base de datos");
        else
          this.generalService.showToast("danger","Ocurrio un error");
      });

      return true;
  }

  isLogged() {
    const user = JSON.parse(localStorage.getItem('one_c_user')!);
    return user !== null;
  }


}
