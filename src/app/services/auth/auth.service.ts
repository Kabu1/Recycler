import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private auth : AngularFireAuth
    ) { }
  recoverEmailPassword(email: string) : Observable<void> {
    return new Observable<void> (observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        console.log('are we here')
        observer.next();
        observer.complete();
      }).catch((error) => {
        console.log('error', error)
        observer.next(error);
        observer.complete();
      })
    })
  }
  login(email: string, password: string): Observable<User> {
    return new Observable<User>((observer) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          if (firebaseUser.user) {
            // User is authenticated, access the user properties
            const user: User = {
              id: firebaseUser.user.uid,
              email: ''
            };
            observer.next(user);
            observer.complete();
          } else {
            // User is not authenticated
            observer.error('User not authenticated');
          }
        })
        .catch((error) => {
          console.error('Authentication error', error);
          observer.error(error);
        });
    });
  }
  
}
