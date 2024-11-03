import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import {BetService} from "../bet.service";

@Component({
  selector: 'app-ladder-table',
  templateUrl: './ladder-table.component.html',
  styleUrl: './ladder-table.component.css'
})


export class LadderTableComponent implements OnInit, OnDestroy {


  constructor(private betModalService: BetService, private betService: BetService) {}

  private timerSubscription: Subscription | undefined;
  ngOnInit() {
    this.updateCountdown();
    this.timerSubscription = interval(1000).subscribe(() => {
      this.updateCountdown();
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private updateCountdown() {
    const now = new Date();
    const estOffset = now.getTimezoneOffset() + 300; // EST is UTC-5, which is 300 minutes behind UTC
    const estNow = new Date(now.getTime() + estOffset * 60000);

    const midnight = new Date(estNow);
    midnight.setHours(24, 0, 0, 0);

    const timeDiff = midnight.getTime() - estNow.getTime();

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    this.setCountdownValue('hours', hours);
    this.setCountdownValue('minutes', minutes);
    this.setCountdownValue('seconds', seconds);
  }

  private setCountdownValue(id: string, value: number) {
    const element = document.getElementById(id);
    if (element) {
      element.style.setProperty('--value', value.toString());
    }
  }

  openBetDetails(d : string) {
    this.betModalService.fetch_and_openBetDetails(d)
  }




  openWalletDialog() {

  }

  openProfile(userID: string) {
    this.betService.fetch_and_ProfileDetails(userID)
  }
}
