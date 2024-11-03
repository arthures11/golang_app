import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ChatService} from "../chat.service";
import {Subscription} from "rxjs";
import {BetService} from "../bet.service";


interface ChatMessage {
  time: string;
  username: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit, OnDestroy{

  messages: ChatMessage[] = [
    { time: '13:46', username: 'User', text: 'Hello, my name is User, how are you guys?' },
    { time: '13:47', username: 'Alice', text: "Hi User! I'm doing great, thanks for asking. How about you?" },
    { time: '13:48', username: 'Bob', text: "Hey User, welcome to the chat! I'm good too." },
    { time: '13:49', username: 'User', text: "I'm doing well, thanks! Glad to be here." },
    { time: '13:50', username: 'Charlie', text: "Hello everyone! What's the topic of discussion today?" },
    { time: '13:51', username: 'Alice', text: "We were just getting to know User. Any suggestions for a topic?" },
    { time: '13:52', username: 'Bob', text: "How about we talk about our favorite books?" },
    { time: '13:53', username: 'User', text: "That sounds interesting! I love reading sci-fi novels." },
    { time: '13:54', username: 'Charlie', text: "Great idea! I'm more into mystery and thriller genres." },
    { time: '13:55', username: 'Alice', text: "I enjoy a good fantasy series. Any recommendations?" },
    { time: '13:56', username: 'Bob', text: "The Mistborn trilogy by Brandon Sanderson is fantastic!" },
    { time: '13:57', username: 'User', text: "Oh, I've heard good things about that series. I'll check it out!" },
    { time: '13:58', username: 'Charlie', text: "For mystery lovers, I'd recommend Agatha Christie's works." },
    { time: '13:59', username: 'Alice', text: "Thanks for the suggestions, everyone! I'll add these to my reading list." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions." },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions.This has been a great chat! Looking forward to more discussions.This has been a great chat! Looking forward to more discussions.This has been a great chat! Lookin" },
    { time: '14:00', username: 'User', text: "This has been a great chat! Looking forward to more discussions.This has been a great chat! Looking forward to more discussions.This has been a great chat! Looking forward to more discussions." },
  ];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;


  chatHeight: number = 40; // Default height in vh

  private subscription: Subscription | undefined;  // Initialize as undefined


  constructor(private chatService: ChatService, private betService: BetService) {}

  ngOnInit() {
    this.subscription = this.chatService.scrollToBottom$.subscribe(() => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  openProfile(userID: string) {
    this.betService.fetch_and_ProfileDetails(userID)
  }
}
