import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoaderPage } from './loader.page';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('LoaderPage', () => {
  let component: LoaderPage;
  let fixture: ComponentFixture<LoaderPage>;
  let router: Router
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderPage],
      imports: [IonicModule, AppRoutingModule]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LoaderPage);
      router = TestBed.get(Router);
      component = fixture.componentInstance;
    });
  }));

  it('should go to login after load', async () => {
    spyOn(router, 'navigate')
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['login'])
  });
});
