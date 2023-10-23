import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { ToastController } from '@ionic/angular';
import { LoginState } from 'src/app/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
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
    private toastController: ToastController,
    private authService : AuthService
  ) {}
  ngOnDestroy(): void {
    if(this.loginStateSubscription){
      this.loginStateSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.form = new LoginPageForm(this.formbuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(async (loginState) => {
      this.onIsRecoveringPassword(loginState)
      this.onIsRecoveredPassword(loginState)
      this.onError(loginState)
      this.onIsLoggingIn(loginState)
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
  private onIsRecoveringPassword(loginState: LoginState){
    if (loginState.isRecoveringPassword) {
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
   private onIsLoggingIn(loginState: LoginState){
    if(loginState.isLoggingIn){
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login(email, password).subscribe(user => {
          this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}));
      })
    }
  }
    
    private onIsLoggedIn(loginState: LoginState){
      if(loginState.isLoggedIn){
        this.router.navigate(['home'])
      }

    }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.store.dispatch(login())
  }
  register() {
    this.router.navigate(['register']);
  }
}
