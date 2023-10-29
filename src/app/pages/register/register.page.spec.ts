import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RegisterPageModule } from './register.module';
import { AppState } from '@capacitor/app';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/app/store/loading/loading.reducers';
import { registerReducer } from 'src/app/store/register/register.reducer';
import { UserRegister } from 'src/app/model/user/userRegister';
import { register, registerFail, registerSuccess } from 'src/app/store/register/register.actions';
import { loginReducer } from 'src/app/store/login/login.reducer';

describe('RegisterPage', () => {

  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let page: any;
  let router : Router
  let store: Store<AppState>
  let toastController: ToastController
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage], // Declare the component under test
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature('loading', loadingReducer),
        StoreModule.forFeature('register', registerReducer),
        StoreModule.forFeature('login', loginReducer),


      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RegisterPage);
      store = TestBed.get(Store);
      router = TestBed.get(Router)
      page = fixture.debugElement.nativeElement;
      toastController = TestBed.get(ToastController)
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create register form on page list', () => {
    fixture.detectChanges();
    expect(component.registerForm).not.toBeUndefined();
  });
  it('should not be allowed to register with form invalid', ()=>{
    fixture.detectChanges();

    clickOnRegisterButton(page);
    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
  })
})
  it('given form is valid, when user clicks on register, then register', ()=>{
    fixture.detectChanges();
    fillForm(component);
    clickOnRegisterButton(page);
    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
  })
})
it('given form is valid, when user clicks on register, then show loading', ()=>{
  fixture.detectChanges();
  fillForm(component);
  clickOnRegisterButton(page);
  store.select("loading").subscribe(state => {
    expect(state.show).toBeTruthy();
  })
})
it('should hide loading component when registration successful', ()=>{
  fixture.detectChanges();
  store.dispatch(register({userRegister: new UserRegister()}));
  store.dispatch(registerSuccess());
  store.select("loading").subscribe(state => {
    expect(state.show).toBeFalsy();
  })
})
it('should login when registration successful', ()=>{
  fixture.detectChanges();
  spyOn(router, 'navigate');
  store.dispatch(register({userRegister: new UserRegister()}));
  store.dispatch(registerSuccess());
  store.select('login').subscribe(state => {
    expect(state.isLoggingIn).toBeTruthy();
  })
  
    expect(router.navigate).toHaveBeenCalledWith(['home']);
})
it('should hide loading component when registration fails', ()=>{
  fixture.detectChanges();
  spyOn(router, 'navigate');
  store.dispatch(register({userRegister: new UserRegister()}));
  store.dispatch(registerFail({error: {message: 'any message'}}));
  
    expect(router.navigate).toHaveBeenCalledWith(['home']);
})
it('should show error when registration fails', ()=>{
  fixture.detectChanges();
  spyOn(router, 'navigate');
  spyOn(toastController, 'create').and.returnValue(<any>Promise.resolve({present: () =>{}}))
  store.dispatch(register({userRegister: new UserRegister()}));
  store.dispatch(registerFail({error: {message: 'any message'}}));
  
    expect(toastController.create).toHaveBeenCalledWith();
})

function clickOnRegisterButton(page: any){
  page.querySelector('ion-button').click()
}
function fillForm(component: any){
  component.registerForm.getForm().get('name')?.setValue('anyName');
    component.registerForm.getForm().get('email')?.setValue('any@email.com');
    component.registerForm.getForm().get('password')?.setValue('anyPassword');
    component.registerForm.getForm().get('repeatPassword')?.setValue('anyName');
    component.registerForm.getForm().get('phone')?.setValue('anyPhone');
    component.registerForm.getForm().get('address')?.get('street')?.setValue('any street');
    component.registerForm.getForm().get('address')?.get('number')?.setValue('any number');
    component.registerForm.getForm().get('address')?.get('zipCode')?.setValue('any zipCode');
    component.registerForm.getForm().get('address')?.get('city')?.setValue('any city');
    component.registerForm.getForm().get('address')?.get('state')?.setValue('any state');
}
})
