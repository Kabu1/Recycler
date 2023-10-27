import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/app/store/loading/loading.reducers';
import { loginReducer } from 'src/app/store/login/login.reducer';
import { AppState } from 'src/app/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { User } from 'src/app/model/user/user';
import { AngularFireModule } from '@angular/fire/compat/';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        IonicModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginPage);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        page = fixture.debugElement.nativeElement;
        store = TestBed.get(Store);
        toastController = TestBed.get(ToastController)
        fixture.detectChanges();
      });
  }));
  it('should create form on init', () => {
    component.ngOnInit();
    expect(component.form).not.toBeUndefined();
  });
  it('should go to register page on register', () => {
    spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });
  it('Should recover email/password when user clicks forgot email/password', () => {
    //start page
    fixture.detectChanges();
    //user set valid email
    component.form.get('email')?.setValue('valid@email.com')
    //user clicked on forgot email/password button
    page.querySelector("#recoverPasswordButton").click();
        //expect loginstate.isrecoveringpassword is true
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  })
  it('Given the user is recovering the password, when success, then hide loading and show success message', () => {
    // spyOn(toastController, 'create')
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
    //start page
    //set login state as recovering password
    //set login state as recovered password
    //verify loadingState
  })
  it('Given the user is recovering the password, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordFail({error : 'message'}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1);
    //start page
    //set login state as recovering password
    //set login state as recovered password
    //verify loadingState
  }),

  it('should show loading and start loggin when loggin in', () => {
    //start page
    fixture.detectChanges()
    //set valid email
    component.form.get('email')?.setValue('valid@email.com');
    //set any password
    component.form.get('password')?.setValue('anyPassword');
    //click on login button
    page.querySelector('#loginButton').click();
    //expect loading is showing
    store.select('loading').subscribe(loadingState =>{
      expect(loadingState.show).toBeTruthy();
    })
    //expect loggin in
    store.select('login').subscribe(loginState =>{
      expect(loginState.isLoggingIn).toBeTruthy()
    })
  })
  it('given user is logging in, when loginSuccess, then hide loading and send user to home page', () => {
    spyOn(router,'navigate');
    //start page
    fixture.detectChanges();
    store.dispatch(login());
    store.dispatch(loginSuccess({user: new User()}))
    //expect loading hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    //expect loggin in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    //expect home page showing
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  }),
  it('given when the user is logging in, when login fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    //start page
    fixture.detectChanges()
    store.dispatch(login());
    store.dispatch(loginFail({error: {messsage: 'error message'}}))
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1)
  })

});
