import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-tip-modal',
  templateUrl: './tip-modal.component.html',
  styleUrl: './tip-modal.component.css'
})
export class TipModalComponent {
  @Input() profile: any;

  tipAmount: number = 0;
  availableBalance: number = 434;
  showPassword: boolean = false;

  setMaxAmount() {
    this.tipAmount = this.availableBalance;
  }

  sendTip() {
    // Implement tip sending logic
    console.log('Sending tip:', {
      recipient: this.profile.username,
      amount: this.tipAmount
    });
  }
}
