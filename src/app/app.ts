import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { map } from 'rxjs';
import { LoginComponent } from './global/component/login/login';
import { MainDashboardComponent } from './global/component/main-dashboard/main-dashboard';
import { UserStateAction } from './user/state/user.action';
import { UserState } from './user/state/user.state';

@Component({
  imports: [CommonModule, MatButtonModule, MainDashboardComponent, LoginComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly store = inject(Store);
  private readonly actions = inject(Actions);

  protected isAuthenticationCompleted = toSignal(
    this.actions.pipe(ofActionCompleted(UserStateAction.GetCurrentUser)).pipe(map(() => true)),
  );

  protected user = this.store.selectSignal(UserState.getUser);

  ngOnInit(): void {
    this.store.dispatch(UserStateAction.GetCurrentUser);
  }
}
