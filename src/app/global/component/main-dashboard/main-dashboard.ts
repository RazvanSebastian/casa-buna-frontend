import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserStateAction } from '../../../user/state/user.action';
import { UserState } from '../../../user/state/user.state';
import { RoleName } from '../../model/user/user.model';

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
  private readonly router = inject(Router);
  private readonly routeToOnboarding = effect(() => {
    if (!this.isOnboarded()) {
      this.router.navigate(['onboarding']);
    }
  });
  private readonly store = inject(Store);

  protected readonly user = this.store.selectSignal(UserState.getUser);
  protected readonly isOnboarded = computed(() =>
    this.user()?.roles.find((role) => role.name !== RoleName.ROLE_USER),
  );

  ngOnInit(): void {}

  onLogout() {
    this.store.dispatch(new UserStateAction.LogoutUser());
  }
}
