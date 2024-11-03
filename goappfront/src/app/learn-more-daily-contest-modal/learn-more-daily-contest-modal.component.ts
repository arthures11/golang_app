import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-more-daily-contest-modal',
  templateUrl: './learn-more-daily-contest-modal.component.html',
  styleUrl: './learn-more-daily-contest-modal.component.css'
})
export class LearnMoreDailyContestModalComponent {
  rewardDistribution: number[] = [28, 15, 9, 7.5, 6.5, 5.5, 4.5, 4, 3.5, 3, 2.5, 2, 1.7, 1.5, 1.3, 1.2, 1.1, 1, 0.8, 0.4];

  showLeaderboardModal() {
    const modal = document.getElementById('leaderboard_modal') as HTMLDialogElement;
    modal.showModal();
  }

}
