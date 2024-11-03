import {Component, Input, OnInit} from '@angular/core';
import {BetService} from "../bet.service";


interface BetDetails {
  id: string;
  verified: boolean;
  username: string;
  date: Date;
  result: string;
  payout: number;
  betAmount: number;
  winAmount: number;
  profitAmount: number;
  status: 'WIN' | 'LOSE';
}

@Component({
  selector: 'app-bet-detail-modal',
  templateUrl: './bet-detail-modal.component.html',
  styleUrl: './bet-detail-modal.component.css'
})


export class BetDetailModalComponent implements OnInit{
  bet: BetDetails | null = {
    id: '111',
    verified: false,
    username: '11',
    date: new Date(),
    result: '111',
    payout: 0,
    betAmount: 0,
    winAmount: 0,
    profitAmount: 0,
    status: 'WIN'
  };

  isLoading = true;

  constructor(private betService: BetService) {}



  ngOnInit() {
    this.betService.currentBetDetails.subscribe((betd) => {
      if(betd==null) return
      this.bet = betd;
      this.isLoading = false;
     // console.log(betd)
    });


    this.betService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

}
