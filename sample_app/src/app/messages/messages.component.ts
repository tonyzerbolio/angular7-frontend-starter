/**
 * messages.component.ts will output messages to any component
 * that imports this service and has the <app-messages></app-messages>
 * selector in it's HTML template.
 * 
 * @example
 * <div class="container">
 *              <p>Here is some static text</p>
 *              <app-messages></app-messages>
 * </div>
 */
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../core/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
