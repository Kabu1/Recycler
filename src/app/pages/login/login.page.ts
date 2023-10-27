import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { login, recoverPassword } from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/app/store/login/LoginState';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  form!: FormGroup;
  loginStateSubscription!: Subscription

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {}
  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formbuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(async (loginState) => {
      this.onIsRecoveredPassword(loginState)
      this.onError(loginState)
      this.onIsLoggedIn(loginState)

      
      this.toggleLoading(loginState);
    });
  }
  private toggleLoading(loginState: LoginState){
    if(loginState.isLoggingIn || loginState.isRecoveringPassword){
      this.store.dispatch(show())
    } else {
      this.store.dispatch(hide())
    }
  }

  private async onIsRecoveredPassword(loginState: LoginState){
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary"
      });
      console.log('toaster', toaster); // Add this line to check the value of the toaster object.

      toaster.present();
    }
  }
  private async onError(loginState: LoginState){
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger"
      });
      console.log('toaster', toaster); // Add this line to check the value of the toaster object.

      toaster.present();
    }
  } 
    private onIsLoggedIn(loginState: LoginState){
      if(loginState.isLoggedIn){
        this.router.navigate(['home'])
      }

    }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.form.get('email')?.value}));
  }

  login() {
    this.store.dispatch(login({email: this.form.get('email')?.value, password: this.form.get('password')?.value}));
  }
  register() {
    this.router.navigate(['register']);
  }
}
