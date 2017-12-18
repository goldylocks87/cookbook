import * as firebase from 'firebase';
import { Router } from '@angular/router/';
import { Injectable } from '@angular/core/';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signupUser( email: string, password: string ) {
    return new Promise((resolve, reject) => {

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          response => {
            firebase.auth().currentUser.getIdToken()
              .then(
                (token) => {
                  this.token = token;
                }
              )
              .catch(
                (error) => {
                  console.log(error);
                  reject(error.message);
                }
              );
              resolve('You have successfully logged in!');
          }
        )
        .catch(
          (error) => {
            console.log(error);
            reject(error.message);
          }
        );

      });
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
    return new Promise((resolve, reject) => {

      firebase.auth().currentUser.getIdToken()
        .then(
          (token) => {
            this.token = token;
            resolve(this.token);
          }
        )
        .catch(
          error => reject(error)
        );

    });
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
