import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PickupCallsPage } from './pickup-calls.page';

describe('PickupCallsPage', () => {
  let component: PickupCallsPage;
  let fixture: ComponentFixture<PickupCallsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PickupCallsPage], // Declare the component under test
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(PickupCallsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
