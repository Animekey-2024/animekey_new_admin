import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICONS } from '@enums/icons.enum';
import { CustomSnackbarComponent } from '@shared/components/custom-snackbar/custom-snackbar.component';
export const DURATION = 7000;

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbar = inject(MatSnackBar);

  openErrorToast(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: DURATION,
      panelClass: 'error-toast',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: 'error',
        icon: ICONS.SNACKBAR_ERROR,
      },
    });
  }

  openSuccessToast(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: DURATION,
      panelClass: 'success-toast',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: 'success',
        icon: ICONS.SNACKBAR_SUCCESS,
      },
    });
  }

  openWarningToast(message: string) {
    this.snackbar.openFromComponent(CustomSnackbarComponent, {
      duration: DURATION,
      panelClass: 'warning-toast',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: 'warning',
        icon: ICONS.SNACKBAR_WARNING,
      },
    });
  }

  openHelperToast(message: string) {
    this.snackbar.open(message, 'Ok', {
      panelClass: 'helper-toast',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
