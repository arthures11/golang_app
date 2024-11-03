import {Component, Input} from '@angular/core';
import {ChatService} from "../chat.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent {

  constructor(private chatService: ChatService) {}

  ngAfterViewInit() {
    const header = document.querySelector('app-header-user-panel');
    if (header) {
      const headerHeight = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      this.chatService.triggerScrollToBottom()
    }
  }




}
