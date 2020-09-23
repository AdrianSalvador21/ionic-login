import { Component } from '@angular/core';
import {SecurityService} from '../_providers/security.service';
import {LoadingController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public securityService: SecurityService,
              public loadingController: LoadingController,
              public storage: Storage,
              public nav: NavController) {}

  async logout() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.storage.remove('uid').then(() => {
      this.securityService.logout().then(() => {
        this.nav.navigateRoot('/login');
        loading.dismiss();
      });
    });
  }

}
