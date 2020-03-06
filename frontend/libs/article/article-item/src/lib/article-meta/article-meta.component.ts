import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Article } from '@angular-ngrx-nx-realworld-example-app/api';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleMetaComponent {
  @Input() article: Article;
  @Input() isAuthenticated: boolean;
  @Input() canModify: boolean;
  @Output() delete: EventEmitter<string> = new EventEmitter();

   deleteArticle() {
    this.delete.emit(this.article.slug);
  }
}
