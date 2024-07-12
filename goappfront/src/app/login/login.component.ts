import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  email: string = '';
  password: string = '';
  error: string = '';
  twoFACode = '';
  loggedIn = false;
  twoFASetup = false;
  qrCode = '';
  secret = '';


  constructor(private userService: UserService, private router: Router,private http: HttpClient, private route: ActivatedRoute) { 


  }

  loginWithGoogle() {
    window.location.href = './auth/google/login';
  }

  login() {
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      alert('Please complete the reCAPTCHA');
      return;
    }

    this.userService.login(this.email, this.password, captchaResponse, this.twoFACode).subscribe(
      response => {
        //localStorage.setItem('token', response.token);
        this.loggedIn = true;
        this.twoFASetup = response.require2FA;
        //this.router.navigate(['/home']);
      },
      error => {
        this.error = 'Login failed';
        grecaptcha.reset()
      }
    );
    
  }

  setup2FA() {
    this.http.post('/setup-2fa', {  }).subscribe(
      (response: any) => {
        console.log('2FA setup successful', response);
        this.qrCode = response.qr;
        this.secret = response.secret;
        this.twoFASetup = true;
      },
      error => console.error('2FA setup failed', error)
    );
  }
  
}