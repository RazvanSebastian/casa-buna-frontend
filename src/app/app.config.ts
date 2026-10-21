import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { UserState } from './user/state/user.state';

const globalSnackbarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right', // Default position: right
  verticalPosition: 'top', // Default position: top
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore([UserState]),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: globalSnackbarConfig,
    },
  ],
};
