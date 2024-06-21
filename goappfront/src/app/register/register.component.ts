import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.userService.register(this.email, this.password, this.name).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = 'Registration failed';
      }
    );
  }
}