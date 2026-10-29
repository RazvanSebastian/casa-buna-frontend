import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { UserModel } from '../../../../global/model/user.model';
import { UserAdministrationStateAction } from '../../../state/user-administration/user-administration.action';
import { UserAdministrationState } from '../../../state/user-administration/user-administration.state';
import { DialogSetRolesComponent } from '../dialog-set-roles/dialog-set-roles';

@Component({
  imports: [MatTableModule, MatPaginator, MatIconModule, MatButtonModule],
  selector: 'app-user-table',
  styleUrl: './user-table.scss',
  templateUrl: './user-table.html',
})
export class UserTable {
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
    this.store.dispatch(new UserAdministrationStateAction.GetAllUsers(1));
  }

  protected onPageChange(event: PageEvent) {
    this.store.dispatch(new UserAdministrationStateAction.GetAllUsers(event.pageIndex));
  }

  protected openSetRolesDialog(element: UserModel) {
    this.dialog.open(DialogSetRolesComponent, { data: element });
  }
}
