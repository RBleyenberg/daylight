import { AuthFacade } from '@dare-libs/auth';
import { Field, NgrxFormsFacade } from '@dare-libs/ngrx-forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { editSettings } from '../+state/settings.actions';

const structure: Field[] = [
  {
    type: 'INPUT',
    name: 'username',
    placeholder: 'Your Name',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'email',
    placeholder: 'Email',
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'password',
    placeholder: 'New Password',
    validator: [Validators.required],
    attrs: {
      type: 'password',
    },
  },
];

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  structure$: Observable<Field[]>;
  data$: Observable<any>;

  constructor(private store: Store<any>, private authFacade: AuthFacade, private ngrxFormsFacade: NgrxFormsFacade) {}

  ngOnInit() {
    this.ngrxFormsFacade.setStructure(structure);
    this.authFacade.user$.subscribe(user => this.ngrxFormsFacade.setData(user));
    this.data$ = this.ngrxFormsFacade.data$;
    this.structure$ = this.ngrxFormsFacade.structure$;
  }

  updateForm(changes: any) {
    this.ngrxFormsFacade.updateData(changes);
  }

  submit() {
    this.store.dispatch(editSettings());
  }

  logout() {
    this.authFacade.logout();
  }
}
