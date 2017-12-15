import * as firebase from 'firebase';
import { Router } from '@angular/router/';
import { Injector } from '@angular/core/';

@Injector()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signupUser( email: string, password: string ) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
              token => this.token = token
            )
            .catch(
              error => console.log(error)
            );
        }
      )
      .catch(
        error => alert(error.message)
      );
  }

  signinUser( email: string, password: string ) {

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              token => this.token = token
            )
            .catch(
              error => console.log(error)
            );
        }
      )
      .catch(
        error => alert(error.message)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      token => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
