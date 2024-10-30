import { Component } from '@angular/core';


@Component({
  selector: 'app-header-user-panel',
  templateUrl: './header-user-panel.component.html',
  styleUrl: './header-user-panel.component.css'
})
export class HeaderUserPanelComponent {

  isWalletMenuOpen = false;

  openWalletMenu() {
    this.isWalletMenuOpen = true;
  }

  closeWalletMenu(event: MouseEvent) {
    this.isWalletMenuOpen = false;
  }
}
