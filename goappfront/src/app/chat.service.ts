// chat.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private scrollSubject = new Subject<void>();

  scrollToBottom$ = this.scrollSubject.asObservable();

  triggerScrollToBottom() {
    this.scrollSubject.next(undefined );

  }
}
