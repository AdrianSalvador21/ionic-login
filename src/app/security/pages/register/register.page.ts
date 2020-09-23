import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../../_providers/security.service';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerInfo: any  = {
    email: '',
    password: '',
    confirm_password: ''
  };
  constructor(public securityService: SecurityService,
              private nav: NavController,
              private alertCtrl: AlertController,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async registerEmail(form) {
    this.formTouched(form);
    if (form.valid) {
      if (this.registerInfo.password === this.registerInfo.confirm_password) {
        const loading = await this.loadingController.create({
          message: 'Cargando...'
        });
        await loading.present();
        this.securityService.registerUser(this.registerInfo).then(res => {
          loading.dismiss();
          this.nav.navigateForward('/login');
        }).catch(e => {
          loading.dismiss();
          this.presentAlert(e.message);
        });
      }
    }
  }

  goToLogin() {
    this.nav.navigateForward('/login');
  }

  passwordsMatch() {
    return this.registerInfo.password === this.registerInfo.confirm_password;
  }

  formTouched(form: NgForm) {
    Object.keys(form.controls).forEach((control) => {
      form.controls[control].markAsTouched();
    });
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
