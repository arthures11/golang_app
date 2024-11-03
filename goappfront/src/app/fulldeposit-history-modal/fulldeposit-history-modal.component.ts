import {Component, OnInit} from '@angular/core';
import {BetService} from "../bet.service";
interface DepositDetails {
  id: string;
  username: string;
}
@Component({
  selector: 'app-fulldeposit-history-modal',
  templateUrl: './fulldeposit-history-modal.component.html',
  styleUrl: './fulldeposit-history-modal.component.css'
})



export class FulldepositHistoryModalComponent  implements  OnInit{

  constructor(private betService: BetService) {}

  depos: DepositDetails = {
    id: '',
    username: '',
  };

  isLoading = true;



  ngOnInit() {
    this.betService.currentdepositDetails.subscribe((depos) => {
      if(depos==null) return
      this.depos = depos;
      this.isLoading = false;
      // console.log(betd)
    });


    this.betService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }


}
