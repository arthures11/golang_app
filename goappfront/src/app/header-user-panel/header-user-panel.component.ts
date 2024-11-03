import {Component, Input, NgZone, OnInit} from '@angular/core';
import {WalletMenuComponent} from "../wallet-menu/wallet-menu.component";
import {BehaviorSubject} from "rxjs";
import {BetService} from "../bet.service";


@Component({
  selector: 'app-header-user-panel',
  templateUrl: './header-user-panel.component.html',
  styleUrl: './header-user-panel.component.css'
})
export class HeaderUserPanelComponent implements OnInit{

  @Input() presentTheme$!: BehaviorSubject<string>;

  isDarkEnable = true
  constructor(private ngZone: NgZone, private betService: BetService) {}

  isLoading = true;

  ngOnInit(){

    this.betService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
  changeTheme() {
    var t = localStorage.getItem('theme')
    t === 'light'
      ? localStorage.setItem('theme', 'dark')
      : localStorage.setItem('theme', 'light');
    this.isDarkEnable = !this.isDarkEnable;
    document.documentElement.classList.toggle('dark', this.isDarkEnable);


   //location.reload()
  }



  openWalletDialog() {
    let s = document.getElementById('wallet_modal') as HTMLDialogElement
    s.showModal()
  }

  showProfileModal(d : string) {
    this.betService.fetch_and_ProfileDetails(d)
  }
  showSettingsModal(d : string) {
    let s = document.getElementById('settings_modal') as HTMLDialogElement
    s.showModal()
  }



}

