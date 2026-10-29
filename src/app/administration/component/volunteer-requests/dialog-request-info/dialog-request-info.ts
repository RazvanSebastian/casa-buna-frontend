import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VolunteerRequestWithUserResponse } from '../../../../global/model/volunteer-request.model';
import { RequestPreview } from '../../../../volunteer-request/component/volunteer-request/request-preview/request-preview';

@Component({
  imports: [MatDialogModule, RequestPreview, MatButtonModule],
  selector: 'app-dialog-request-info',
  styleUrl: './dialog-request-info.scss',
  templateUrl: './dialog-request-info.html',
})
export class DialogRequestInfo {
  protected readonly data = inject<VolunteerRequestWithUserResponse>(MAT_DIALOG_DATA);
}
