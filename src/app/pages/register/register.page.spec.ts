import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageModule } from './register.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page: any;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage], // Declare the component under test
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        RegisterPageModule
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RegisterPage);
      router = TestBed.get(Router)
      page = fixture.debugElement.nativeElement;
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

  it('should redirect to home on register', ()=>{
    fixture.detectChanges();
    spyOn(router, 'navigate')
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

    page.querySelector('ion-button').click()
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })
  it('should not be allowed to register with form invalid', ()=>{
    fixture.detectChanges();
    spyOn(router, 'navigate')

    page.querySelector('ion-button').click()
    expect(router.navigate).toHaveBeenCalledTimes(0)
  })
});
