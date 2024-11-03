import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";



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

interface fullBetHistoryDetails {
  id: string;
}
interface WithdrawalHistoryDetails {
  id: string;
  username: string;
}

interface ProfileDetails {
  id: string;
  username: string;
}

interface DepositDetails {
  id: string;
  username: string;
}
@Injectable({
  providedIn: 'root'
})

export class BetService {

  constructor() { }

   bet: BetDetails = {
    id: '123456',
    verified: true,
    username: 'john_doe',
    date: new Date(),
    result: '8436728',
    payout: 2.5,
    betAmount: 100,
    winAmount: 250,
    profitAmount: 150,
    status: 'LOSE'
  };

  profileDetails: ProfileDetails = {
    id: '123456',
    username: 'KOX',

  };


  fullbetDetails: fullBetHistoryDetails = {
    id: 'cissss',
  };

  depos: DepositDetails = {
    id: 'arturrrrrr',
    username: 'arturrrrrr',
  };
  withdrawalHistoryDetails: WithdrawalHistoryDetails = {
    id: 'wdwdwwdwdwwdwdwwdwdw',
    username: 'wdwdwwdwdwwdwdwwdwdw',
  };

  private betDetailsSource = new BehaviorSubject<BetDetails | null>(null);
  currentBetDetails  = this.betDetailsSource.asObservable();
  private profileDetailsSource = new BehaviorSubject<ProfileDetails | null>(null);
  currentProfileDetails  = this.profileDetailsSource.asObservable();

  private fullbetDetailsSource = new BehaviorSubject<fullBetHistoryDetails | null>(null);
  currentfullbetDetails  = this.fullbetDetailsSource.asObservable();

  private fullDepositDetailsSource = new BehaviorSubject<DepositDetails | null>(null);
  currentdepositDetails  = this.fullDepositDetailsSource.asObservable();

  private fullDepositHistoryDetailsSource = new BehaviorSubject<WithdrawalHistoryDetails | null>(null);
  currentwithdrawalHistoryDetails  = this.fullDepositHistoryDetailsSource.asObservable();

  private loadingSource = new BehaviorSubject<boolean>(false);
  currentLoading = this.loadingSource.asObservable();


   fetch_and_openBetDetails(d: string) {
     this.loadingSource.next(true);


      const modal = document.getElementById('bet_details_modal') as HTMLDialogElement | null;
      if (modal) {
        modal.showModal();
      }
     setTimeout(() => {
       this.bet.date = new Date()
       this.betDetailsSource.next(this.bet);
     }, 222);





  }


  fetch_and_ProfileDetails(d: string) {
    this.loadingSource.next(true);
    let s = document.getElementById('myprofile_modal') as HTMLDialogElement
    s.showModal()

    setTimeout(() => {
      this.bet.date = new Date()
      this.profileDetails.username = d;
      this.profileDetailsSource.next(this.profileDetails);
    }, 222);
  }

  fetch_and_FullBetHistory(d: string) {


    this.loadingSource.next(true);
    let s = document.getElementById('history_modal') as HTMLDialogElement
    s.showModal()

    setTimeout(() => {
      this.bet.date = new Date()
      this.fullbetDetailsSource.next(this.fullbetDetails);
    }, 222);
  }

  showFullDepositHistory(user912398123912: string) {
    this.loadingSource.next(true);
    let s = document.getElementById('fullDepositHistory-modal') as HTMLDialogElement
    s.showModal()

    setTimeout(() => {
      this.bet.date = new Date()
      this.fullDepositDetailsSource.next(this.depos);
    }, 222);
  }

  showFullWithdrawalHistory(user912398123912: string) {
    this.loadingSource.next(true);
    let s = document.getElementById('fullDepositWithdrawal-modal') as HTMLDialogElement
    s.showModal()
    setTimeout(() => {
      this.bet.date = new Date()
      this.fullDepositHistoryDetailsSource.next(this.withdrawalHistoryDetails);
    }, 222);
  }
}
