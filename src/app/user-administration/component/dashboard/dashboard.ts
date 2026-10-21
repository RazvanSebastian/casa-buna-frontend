import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { UserModel } from '../../../global/model/user/user.model';
import { UserAdministrationActions } from '../../state/user-administration.action';
import { UserAdministrationState } from '../../state/user-administration.state';
import { DialogSetRolesComponent } from '../dialog-set-roles/dialog-set-roles';

@Component({
  imports: [MatTableModule, MatPaginator, MatIconModule, MatButtonModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  protected readonly displayedColumns: string[] = [
    'email',
    'firstName',
    'lastName',
    'roles',
    'actions',
  ];

  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  protected readonly usersPage = this.store.selectSignal(UserAdministrationState.getUsersPage);

  ngOnInit(): void {
    this.store.dispatch(new UserAdministrationActions.GetAllUsers(1));
  }

  protected openSetRolesDialog(element: UserModel) {
    this.dialog.open(DialogSetRolesComponent, { data: element });
  }
}
