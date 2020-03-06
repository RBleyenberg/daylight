import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Article } from '@angular-ngrx-nx-realworld-example-app/api';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  @Input() article: Article;
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();
}
