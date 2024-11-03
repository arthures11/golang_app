
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BetService} from "../bet.service";




@Component({
  selector: 'app-wallet-menu',
  templateUrl: './wallet-menu.component.html', // We'll move the template to a separate file
  styleUrls: ['./wallet-menu.component.css'] // We'll move the styles to a separate file
})

export class WalletMenuComponent {
  @Output() close = new EventEmitter<void>(); // Event emitter to signal closing

  constructor(private betService: BetService) {}

  activeTab: 'deposit' | 'withdraw' = 'deposit';
  depositAddress: string = 'Your XRP Address';
  destinationId: string = 'Your Destination ID';
  withdrawAddress: string = '';
  withdrawDestinationId: string = '';

  deposits = [
    { date: '2024-10-01', amount: '100 XRP', status: 'Completed' },
    { date: '2024-10-02', amount: '150 XRP', status: 'Completed' },
    { date: '2024-10-03', amount: '200 XRP', status: 'Pending' },
    { date: '2024-10-04', amount: '250 XRP', status: 'Completed' },
    { date: '2024-10-05', amount: '300 XRP', status: 'Failed' },
    { date: '2024-10-06', amount: '350 XRP', status: 'Completed' },
  ];

  currentPage: number = 1;
  totalPages: number = Math.ceil(this.deposits.length / 5);
  qrCodeUrl: string = 'https://api.qrserver.com/v1/create-qr-code/?data=YourXRPAddress'; // Replace with dynamic QR code URL

  selectTab(tab: 'deposit' | 'withdraw') {
    this.activeTab = tab;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  confirmWithdrawal() {
    // Logic to handle withdrawal confirmation
    console.log(`Withdrawing to ${this.withdrawAddress} with ID ${this.withdrawDestinationId}`);
    // Reset fields after withdrawal
    this.withdrawAddress = '';
    this.withdrawDestinationId = '';
  }

  closeDialog() {
    this.close.emit(); // Emit close event
  }

  showFullDepositHistory(user912398123912: string) {
    this.betService.showFullDepositHistory(user912398123912)

  }

  showFullWithdrawalHistory(user912398123912: string) {

    this.betService.showFullWithdrawalHistory(user912398123912)

  }
}
