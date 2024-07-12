import { Component } from '@angular/core';

@Component({
  selector: 'app-recaptcha',
  template: '<re-captcha (resolved)="resolved($event)" siteKey="6Lci2gMqAAAAAPuAqQbRU2lqO97K4rAsj3yuWr55"></re-captcha>'
})
export class RecaptchaComponent {
  resolved(captchaResponse: string | null) {
    if (captchaResponse) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    } else {
      console.log('Captcha resolution failed or was dismissed');
    }
  }
}