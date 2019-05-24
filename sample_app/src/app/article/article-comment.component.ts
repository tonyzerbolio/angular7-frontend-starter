import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { Comment, User, UserService } from '../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
