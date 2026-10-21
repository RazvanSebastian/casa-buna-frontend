import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngxs/store';
import { RoleModel, UserModel } from '../../../global/model/user/user.model';
import { UserAdministrationActions } from '../../state/user-administration.action';
import { UserAdministrationState } from '../../state/user-administration.state';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatListModule, MatButtonModule],
  selector: 'app-dialog-set-roles',
  styleUrl: './dialog-set-roles.scss',
  templateUrl: './dialog-set-roles.html',
})
export class DialogSetRolesComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  protected readonly data = inject<UserModel>(MAT_DIALOG_DATA);

  protected readonly allRoles = this.store.selectSignal(UserAdministrationState.allRoles);

  protected form = this.formBuilder.group({
    roles: [this.data.roles ?? []],
  });

  protected compareRoles = (role1: RoleModel, role2: RoleModel) => role1?.name === role2?.name;

  ngOnInit(): void {
    this.store.dispatch(new UserAdministrationActions.GetAllRoles());
  }

  save() {
    this.store.dispatch(
      new UserAdministrationActions.SetUserRoles(this.data.id, this.form.value.roles ?? []),
    );
  }
}
