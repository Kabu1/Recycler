import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';
import { AppState } from 'src/app/store/AppState';
import { Store } from '@ngrx/store';
import { register } from 'src/app/store/register/register.actions';
import { RegisterState } from 'src/app/store/register/RegisterState';
import { hide, show } from 'src/app/store/loading/loading.actions';
import { NavController, ToastController } from '@ionic/angular';
import { login } from 'src/app/store/login/login.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm!: RegisterPageForm;
  registeredStateSubscription!: Subscription;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private navController: NavController

    ) { }
  ngOnDestroy() {
    this.registeredStateSubscription.unsubscribe();
  }

  ngOnInit() {
    this.createForm()
    this.watchRegisterState()
  }
  register(){
    this.registerForm.getForm().markAllAsTouched();
    if(this.registerForm.getForm().valid){
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}))
    }
  }
  createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder)
  }
  watchRegisterState() {
    this.registeredStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);
      this.onRegistered(state);
      this.onError(state);

    })
  }
  onRegistered(state: RegisterState){
    if(state.isRegistered){
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password

      }))
    }
  }
  onError(state: RegisterState) {
    if(state.error){
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration Incomplete'
      }).then(toast => toast.present());

    }
  }
  toggleLoading(state: RegisterState){
    if(state.isRegistering){
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
}
