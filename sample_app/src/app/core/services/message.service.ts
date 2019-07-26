/**
 * message.service.ts is a simple service used to generate and display
 * messages for the end user in other components.
 *
 * It can be used for debugging or for actual end-user messaging.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
