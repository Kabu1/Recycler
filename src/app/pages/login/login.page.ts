import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/AppState';
import { hide, show } from 'src/app/store/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;


  constructor(private router: Router, private formbuilder: FormBuilder, private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.form = new LoginPageForm(this.formbuilder).createForm() ;
  }
  forgotEmailPassword() {
    this.store.dispatch(show())
    setTimeout(() => {
      this.store.dispatch(hide())
    }, 3000);
  }
  
  login(){
    this.router.navigate(['home']);
  }
  register(){
    this.router.navigate(['register']);
  }

}
