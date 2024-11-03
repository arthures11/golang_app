import {Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrl: './user-settings-modal.component.css'
})
export class UserSettingsModalComponent implements OnInit{


  showNotificationsSettings = false;

  showSecuritySettings = false;

  showAccDetailsSettings = true



  openNotificationsSettings() {
    this.showAccDetailsSettings =false
    this.showNotificationsSettings = true;
    this.showSecuritySettings = false;
  }

  goBackToSettings() {
    this.showAccDetailsSettings =true
    this.showNotificationsSettings = false;
    this.showSecuritySettings = false;
  }
  openSecurity() {
    this.showAccDetailsSettings =false
    this.showNotificationsSettings = false;
    this.showSecuritySettings = true;
  }

  secretCode = 'ABCD-1234-EFGH-5678';
  password = '';

  @Output() codeComplete = new EventEmitter<string>();
  @Output() codeSubmitted = new EventEmitter<string>();
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;

  twoFactorForm: FormGroup;
  hasError = false;
  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.twoFactorForm = this.fb.group({
      digit0: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }

  ngOnInit() {
    this.twoFactorForm.valueChanges.subscribe(value => {
      const code = this.getFullCode();
      if (code.length === 6 && this.twoFactorForm.valid) {
        this.hasError = false;
        this.codeComplete.emit(code);
      }
    });
  }

  private getFullCode(): string {
    return Object.values(this.twoFactorForm.value).join('');
  }

  getControls() {
    return Array(6).fill(0);
  }

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (!/^\d*$/.test(value)) {
      input.value = '';
      return;
    }

    if (value && index < 5) {
      setTimeout(() => {
        this.inputFields.get(index + 1)?.nativeElement.focus();
      }, 0);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (index > 0 && !input.value) {
        setTimeout(() => {
          this.inputFields.get(index - 1)?.nativeElement.focus();
        }, 0);
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.inputFields.get(index - 1)?.nativeElement.focus();
    } else if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.inputFields.get(index + 1)?.nativeElement.focus();
    } else if (!/^[0-9]$/.test(event.key) && !['Tab'].includes(event.key)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent, index: number) {
    event.preventDefault();
    const pastedContent = event.clipboardData?.getData('text/plain');

    console.log('lol')
    if (!pastedContent) return;

    // Extract only numbers from pasted content and limit to 6 digits
    const numbers = pastedContent.replace(/[^0-9]/g, '').slice(0, 6);

    if (numbers.length > 0) {
      // Distribute numbers across inputs
      numbers.split('').forEach((num, i) => {
        if (i < 6) { // Ensure we don't exceed our inputs
          const control = this.twoFactorForm.get(`digit${i}`);
          if (control) {
            control.setValue(num);
          }
        }
      });

      // Focus the next empty input if paste was partial
      if (numbers.length < 6) {
        setTimeout(() => {
          this.inputFields.get(numbers.length)?.nativeElement.focus();
        }, 0);
      }
    }
  }
  submit2FA() {
    this.notificationService.show('2FA code confirmed successfully!', 'success');
    console.log('ok ' + this.getFullCode())

  }


//     // Success (default)
//     notificationService.show('Operation successful!');
//
// // Error
//     notificationService.show('Something went wrong!', 'error');
//
// // Info
//     notificationService.show('Please note this change', 'info');
//
// // Warning
//     notificationService.show('Proceed with caution', 'warning');
//
// // Without auto-close
//     notificationService.show('Important message', 'info', false);

}
