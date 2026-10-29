import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStateAction } from '../../../user/state/user.action';
import { UserState } from '../../../user/state/user.state';
import { RoleName } from '../../model/user.model';
import { NavList } from './nav-list/nav-list';

@Component({
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    NavList,
  ],
  selector: 'app-main-dashboard',
  styleUrl: './main-dashboard.scss',
  templateUrl: './main-dashboard.html',
})
export class MainDashboardComponent implements OnInit {
  private readonly _routeToOnboarding = effect(() => {
    const user = this.user();
    if (user && !this.isOnboarded()) {
      this.router.navigate(['onboarding']);
    }
  });

  private readonly router = inject(Router);
  private readonly store = inject(Store);

  protected readonly user = this.store.selectSignal(UserState.getUser);

  /**
   * Every logged in user has by default only USER roles.
   * If there is any other role, the user is onboarded
   */
  protected readonly isOnboarded = computed(() =>
    this.user()?.roles.some((role) => role.name !== RoleName.ROLE_USER),
  );

  protected readonly drawerOpen = signal(true);

  ngOnInit(): void {}

  toggleDrawer() {
    this.drawerOpen.update((value) => !value);
  }

  onLogout() {
    this.store.dispatch(new UserStateAction.LogoutUser());
  }
}
