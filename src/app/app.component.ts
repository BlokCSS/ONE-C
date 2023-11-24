import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public platform:Platform,public generalService:GeneralService) {
    this.platform.ready().then(() => {
      this.init();
    });
  }

  init() {
    var repartidores = [];
    repartidores.push({
      id:1,
      nombre:"Sebastian"
    }, {
      id:2,
      nombre:"Javier"
    },
    {
      id:3,
      nombre:"Jose"
    });

    localStorage.setItem("one_c_Repartidores",JSON.stringify(repartidores));
  }
}
