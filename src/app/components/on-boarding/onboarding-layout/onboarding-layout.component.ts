import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICONS } from '@enums/icons.enum';

@Component({
  selector: 'app-onboarding-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './onboarding-layout.component.html',
  styleUrls: ['./onboarding-layout.component.scss'],
})
export class OnboardingLayoutComponent {
  icons = ICONS;
}
