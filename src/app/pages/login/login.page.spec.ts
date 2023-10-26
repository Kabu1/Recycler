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
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/store/login/login.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of, throwError } from 'rxjs';
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
  let authService: AuthService;

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
        authService = TestBed.get(AuthService)
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
    spyOn(authService, 'recoverEmailPassword').and.returnValue(new Observable(() => {
      
    }))

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
  it('Should hide loading and show success message when has recovered password', () => {
    // spyOn(toastController, 'create')
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    fixture.detectChanges();
    store.dispatch(recoverPassword());
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
  it('Should hide loading and show error message when there is an error on recover password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    fixture.detectChanges();
    store.dispatch(recoverPassword());
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
    spyOn(authService, 'login').and.returnValue(new Observable(() => {

    })),
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
  it('should hide loading and send user to home page when user has logged in', () => {
    spyOn(router,'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User()));
    //start page
    fixture.detectChanges()
    //set valid email
    component.form.get('email')?.setValue('valid@email.com');
    //set valid password
    component.form.get('password')?.setValue('anyPassword');
    //click on login button
    page.querySelector('#loginButton').click();
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
  it('should hide loading and show error when user couldnot login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}));
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () =>{}}))
    //start page
    fixture.detectChanges()
    //set valid email
    component.form.get('email')?.setValue('error@email.com');
    //set valid password
    component.form.get('password')?.setValue('anyPassword');
    //click on login button
    page.querySelector('#loginButton').click();
    //expect loading hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    expect(toastController.create).toHaveBeenCalledTimes(1)
  })

});
