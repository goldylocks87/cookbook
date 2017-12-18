import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  response: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password)
      .then(
        response => console.log(response)
      )
      .catch(
        error => this.response = error
      );
  }

}
