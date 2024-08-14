import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '@enums/icons.enum';

@Component({
  selector: 'app-verification-tick',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-tick.component.html',
  styleUrls: ['./verification-tick.component.scss'],
})
export class VerificationTickComponent {
  iconEnum = ICONS;
}
