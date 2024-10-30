
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DepositHistory {
  date: Date;
  amount: number;
  status: 'pending' | 'completed';
  txId: string;
}

@Component({
  selector: 'app-wallet-menu',
  templateUrl: './wallet-menu.component.html',
  styleUrls: ['./wallet-menu.component.scss']
})

export class WalletMenuComponent {

  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  activeTab: 'deposit' | 'withdrawal' = 'deposit';

  // Deposit data
  xrpAddress = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh';
  destinationTag = '12345678';

  // Pagination
  currentPage = 1;
  pageSize = 5;

  // Withdrawal form
  withdrawalAddress = '';
  withdrawalTag = '';
  withdrawalAmount = 0;

  // Sample deposit history
  depositHistory: DepositHistory[] = [
    {
      date: new Date('2024-03-01'),
      amount: 100,
      status: 'completed',
      txId: '0x123...abc'
    },
    // Add more sample data as needed
  ];

  get totalPages(): number {
    return Math.ceil(this.depositHistory.length / this.pageSize);
  }

  ngOnInit() {
    // Initialize component
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // You might want to add a toast notification here
  }

  isWithdrawalValid(): boolean {
    return (
      this.withdrawalAddress.length > 0 &&
      this.withdrawalTag.length > 0 &&
      this.withdrawalAmount > 0
    );
  }

  confirmWithdrawal() {
    if (this.isWithdrawalValid()) {
      // Implement withdrawal logic here
      console.log('Withdrawal confirmed', {
        address: this.withdrawalAddress,
        tag: this.withdrawalTag,
        amount: this.withdrawalAmount
      });
    }
  }

  closeMenu() {
    this.close.emit();
  }
}
