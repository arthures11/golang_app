
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private nextId = 0;
  private notifications = new BehaviorSubject<Notification[]>([]);
  private timeouts = new Map<number, any>();
  notifications$ = this.notifications.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', autoClose = true) {
    const id = this.nextId++;
    const notification = { id, message, type, autoClose };

    this.notifications.next([...this.notifications.value, notification]);

    if (autoClose) {
      const timeout = setTimeout(() => this.remove(id), 5000);
      this.timeouts.set(id, timeout);
    }

    return id;
  }

  remove(id: number) {
    const timeout = this.timeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.timeouts.delete(id);
    }

    const currentNotifications = this.notifications.value;
    this.notifications.next(currentNotifications.filter(notification => notification.id !== id));
  }

  // Optional: Add this method to clean up when component is destroyed
  clearAll() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();
    this.notifications.next([]);
  }
}
