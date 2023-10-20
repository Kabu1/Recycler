import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupPage } from './pickup.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('PickupPage', () => {
  let component: PickupPage;
  let fixture: ComponentFixture<PickupPage>;
  let router: Router
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickupPage], // Declare the component under test
      imports: [AppRoutingModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PickupPage);
      router = TestBed.get(Router)
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should go to home on create new pickup call', ()=>{
    spyOn(router, 'navigate')
    component.newPickUpCall()
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })
});
