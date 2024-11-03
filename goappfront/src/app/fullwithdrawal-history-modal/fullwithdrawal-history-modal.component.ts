import {Component, OnInit} from '@angular/core';
import {BetService} from "../bet.service";
interface WithdrawalHistoryDetails {
  id: string;
  username: string;
}
@Component({
  selector: 'app-fullwithdrawal-history-modal',
  templateUrl: './fullwithdrawal-history-modal.component.html',
  styleUrl: './fullwithdrawal-history-modal.component.css'
})
export class FullwithdrawalHistoryModalComponent implements  OnInit{

  constructor(private betService: BetService) {}

  withdrawalHistoryDetails: WithdrawalHistoryDetails = {
    id: '',
    username: '',
  };

  isLoading = true;

  ngOnInit() {
    this.betService.currentwithdrawalHistoryDetails.subscribe((withdrawalsHistoryDetails) => {
      if(withdrawalsHistoryDetails==null) return
      this.withdrawalHistoryDetails = withdrawalsHistoryDetails;
      this.isLoading = false;
      // console.log(betd)
    });


    this.betService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

}
