import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css',
  animations: [
    trigger('notificationAnimation', [
      // Entry animation
      transition(':enter', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
          height: 0,
        }),
        animate('150ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1,
          height: '*'
        }))
      ]),
      // Exit animation
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          opacity: 1,
          height: '*'
        }),
        animate('150ms ease-in', style({
          transform: 'scale(0.8)',
          opacity: 0,
          height: 0
        }))
      ])
    ])
  ]
})
export class NotificationContainerComponent implements OnInit {
  notifications$ = this.notificationService.notifications$;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {}

  closeNotification(id: number) {
    this.notificationService.remove(id);
  }



}
