import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SecurityService} from '../../../_providers/security.service';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginInfo: any  = {
    email: '',
    password: ''
  };

  constructor(
    public securityService: SecurityService,
    private nav: NavController,
    public storage: Storage,
    private alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.storage.get('uid').then(value => {
      if (value) {
        this.nav.navigateRoot('/home');
      }
      loading.dismiss();
    });
  }

  async googleLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.securityService.loginGoogle().then(res => {
      this.storage.set('uid', res.user.uid).then(() => {
        loading.dismiss();
        this.nav.navigateRoot('/home');
      });
    });
  }

  async emailLogin(form: NgForm) {
    this.formTouched(form);
    if (form.valid) {
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
      this.securityService.loginEmail(this.loginInfo).then(res => {
        this.storage.set('uid', res.user.uid).then(() => {
          loading.dismiss();
          this.nav.navigateRoot('/home');
        });
      }).catch((e) => {
        loading.dismiss();
        this.presentAlert(e.message);
      });
    }
  }

  formTouched(form: NgForm) {
    Object.keys(form.controls).forEach((control) => {
      form.controls[control].markAsTouched();
    });
  }

  goToRegister() {
    this.nav.navigateForward('/register');
  }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Sorry',
      message,
      buttons: ['Close']
    });

    await alert.present();
  }
}
