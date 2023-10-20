import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomePage } from './home.page';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports:[AppRoutingModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to pickupcalls on click see all', ()=>{
    spyOn(router, 'navigate')
    component.gotoPickupCalls()
    expect(router.navigate).toHaveBeenCalledWith(['pickup-calls'])
  })
  it('should go to new pickupcalls page on clicking floating button ', ()=>{
    spyOn(router, 'navigate')
    component.newPickUpCall()
    expect(router.navigate).toHaveBeenCalledWith(['pickup'])
  })
});
