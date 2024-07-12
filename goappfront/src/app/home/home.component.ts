import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe(
      response => {
        this.username = response.username;
      },
      error => {
        if (error.status === 401) {
          // Unauthorized, redirect to login
         // localStorage.removeItem('token');
         // this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/login']);
          this.error = 'Could not fetch user info';
        }
      }
    );
  }
}