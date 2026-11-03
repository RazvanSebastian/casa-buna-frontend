import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { NotificationStateAction } from '../../../notification/state/notificiation.action';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  store = inject(Store);
  test() {
    this.store.dispatch(new NotificationStateAction.Test());
  }
}
