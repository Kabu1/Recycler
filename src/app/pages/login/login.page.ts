import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/app/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formbuilder).createForm();

    this.store.select('login').subscribe(async (loginState) => {
      this.onIsRecoveringPassword(loginState)
      this.onIsRecoveredPassword(loginState)
      this.onIsRecoveredPasswordFail(loginState)

      
    });
  }
  private onIsRecoveringPassword(loginState: LoginState){
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.form.get('email')?.value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      }, error => {
        this.store.dispatch(recoverPasswordFail({error}))
      }
      )
    }
  }
  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      console.log('toaster', toaster); // Add this line to check the value of the toaster object.

      toaster.present();
    }
  }
  private async onIsRecoveredPasswordFail(loginState: LoginState){
    if (loginState.error) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      console.log('toaster', toaster); // Add this line to check the value of the toaster object.

      toaster.present();
    }
  }
  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.router.navigate(['home']);
  }
  register() {
    this.router.navigate(['register']);
  }
}
