import { Injectable } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  userLogged:any;
  constructor(
    public toastController:ToastController,
    private auth:Auth,
    private router:Router,
    private actionSheetController:ActionSheetController
    ) {

    authState(this.auth).subscribe((user) => {
      if (user) {
        this.userLogged = user;
        localStorage.setItem('one_c_user', JSON.stringify(this.userLogged));
        JSON.parse(localStorage.getItem('one_c_user')!);
      } else {
        this.userLogged = null;
        signOut(this.auth);
        localStorage.removeItem('one_c_user');
        this.router.navigate(['login'],{replaceUrl:true});
      }
    });
    
   }

   desconectarse() {
    signOut(this.auth);
   }

   formatPrecio(monto:string="0") {
    var valor = "$";
    if(monto.length > 0 && monto.length <= 3) {
      valor += monto;
    } else if(monto.length == 4) {
      valor += monto[0]+"."+monto.substr(1,3);
    } else if(monto.length == 5) {
      valor += monto.substr(0,2)+"."+monto.substr(2,5);
    } else if(monto.length == 6) {
      valor += monto.substr(0,3)+"."+monto.substr(3,5);
    } else if(monto.length == 7) {
      valor += monto[0]+"."+monto.substr(1,3)+"."+monto.substr(4,6);
    } else if(monto.length == 8) {
      valor += monto.substr(0,2)+"."+monto.substr(2,3)+"."+monto.substr(5,7);
    } else if(monto.length == 9) {
      valor += monto.substr(0,3)+"."+monto.substr(3,3)+"."+monto.substr(6,8);
    }
    return valor;
  }

   async menuUser() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Perfil',
      buttons: [
        {
          text: 'Desconectarse',
          data: {
            action: 'desconectarse',
          },
        }
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result);
    if(result['data']['action'] == "desconectarse") {
      this.desconectarse();
    }
  }

  async showToast(color:any,msg:any,duracion=3000) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion,
      color:color
    });

    await toast.present();
  }
}
