import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/app/store/login/login.reducer';
import { AppState } from '@capacitor/app';
import { loginFail, loginSuccess } from 'src/app/store/login/login.actions';
import { User } from 'src/app/model/user/user';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let  router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router)
  });

  it('should be allow logged in user to access page', () => {
    store.dispatch(loginSuccess({user: new User()}))
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });
  it('should be allow logged in user to access page', () => {
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    })
  });
  it('should not allow user to be sent to the login page', () => {
    spyOn(router, 'navigateByUrl')
    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  })
});
