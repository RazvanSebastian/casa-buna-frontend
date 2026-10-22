import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { UserActions } from '../../../user/state/user.action';
import { UserState } from '../../../user/state/user.state';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'app-main-dashboard',
  styleUrl: './main-dashboard.scss',
  templateUrl: './main-dashboard.html',
})
export class MainDashboardComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly actions = inject(Actions);
  private readonly router = inject(Router);

  protected readonly user = this.store.selectSignal(UserState.getUser);

  ngOnInit(): void {
    this.actions
      .pipe(ofActionSuccessful(UserActions.LogoutUser))
      .subscribe(() => this.store.dispatch(UserActions.GetCurrentUser));
  }

  onLogout() {
    this.store.dispatch(new UserActions.LogoutUser());
  }
}
