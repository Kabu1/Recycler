import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupPage } from './pickup.page';

describe('PickupPage', () => {
  let component: PickupPage;
  let fixture: ComponentFixture<PickupPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickupPage], // Declare the component under test
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PickupPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
