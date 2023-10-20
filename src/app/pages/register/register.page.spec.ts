import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage], // Declare the component under test
      imports: [AppRoutingModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(RegisterPage);
      router = TestBed.get(Router)

      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to home on register', ()=>{
    spyOn(router, 'navigate')
    component.register()
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })
});
