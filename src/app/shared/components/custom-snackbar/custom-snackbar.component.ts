import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { ICONS } from '@enums/icons.enum';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss'],
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatIconModule, MatButtonModule],
})
export class CustomSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; icon: string; type: string },
    private _snackRef: MatSnackBarRef<CustomSnackbarComponent>
  ) {}
  ICONS = ICONS;

  closeSnackbar(): void {
    this._snackRef.dismiss();
  }
}
