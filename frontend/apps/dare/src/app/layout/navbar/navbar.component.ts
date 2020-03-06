import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@dare-libs/api';

@Component({
  selector: 'dare-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() user: User;
  @Input() isLoggedIn: boolean;
}
