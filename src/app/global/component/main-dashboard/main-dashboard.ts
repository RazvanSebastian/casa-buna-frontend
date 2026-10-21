import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../../../user/state/user.state';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule],
  selector: 'app-main-dashboard',
  styleUrl: './main-dashboard.scss',
  templateUrl: './main-dashboard.html',
})
export class MainDashboardComponent {
  private readonly store = inject(Store);

  protected readonly user = this.store.selectSignal(UserState.getUser);
}
