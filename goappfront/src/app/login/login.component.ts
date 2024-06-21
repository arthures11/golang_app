import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.userService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Login failed';
      }
    );
  }
}