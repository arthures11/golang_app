import { Component } from '@angular/core';

@Component({
  selector: 'app-ladder-table-info',
  templateUrl: './ladder-table-info.component.html',
  styleUrl: './ladder-table-info.component.css'
})
export class LadderTableInfoComponent {

  showDailyContestLearnMode() {
    let s = document.getElementById('learn_more_daily_contest') as HTMLDialogElement
    s.showModal()
  }


}
