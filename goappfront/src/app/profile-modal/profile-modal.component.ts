import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {BetService} from "../bet.service";

interface UserProfile {
  username: string;
  joinDate: string;
  stats: {
    tapped: number;
    wagered: number;
    athProfit: number;
    atlProfit: number;
    netProfit: number;
    chats: number;
  }
}


interface BetHistory {
  id: string;
  time: string;
  betAmount: number;
  multiplier: number;
  profit: number;
}



@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileModalComponent implements OnInit{

  @Input() tipping_id?: string

  constructor(private betService: BetService) {}

  isLoading = true;
  betHistory: BetHistory[] = [
    {
      id: '123456',
      time: '2024-03-15 14:30',
      betAmount: 100,
      multiplier: 2.5,
      profit: 150,
    },
  ];

  @Input() profile: UserProfile = {
    username: 'CryptoMaster',
    joinDate: 'September 2024',
    stats: {
      tapped: 123,
      wagered: 99992,
      athProfit: 3333,
      atlProfit: -110,
      netProfit: 444,
      chats: 1111
    }
  };
  @Input() profileImageUrl?: string;

  onClose() {


  }

  onTip() {
    // Implement tip logic or emit event
  }
  closeModal() {


  }



  ngOnInit() {
    this.betService.currentProfileDetails.subscribe((profileDetails) => {
      if(profileDetails==null) return
      console.log(profileDetails)
      this.profile.username = profileDetails.username
      this.isLoading = false;
      // console.log(betd)
    });

    this.betService.currentfullbetDetails.subscribe((fullbetDetails) => {
      if(fullbetDetails==null) return
      console.log(fullbetDetails)
      this.betHistory[0].id = fullbetDetails.id
      this.isLoading = false;
      // console.log(betd)
    });

    this.betService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }


  show(d : string) {
    this.tipping_id = d;
    let s = document.getElementById('tip_modal') as HTMLDialogElement
    s.showModal()
    console.log(this.tipping_id)
  }

  showTapHistory(d : string) {
    this.betService.fetch_and_FullBetHistory(d)
  }
}
