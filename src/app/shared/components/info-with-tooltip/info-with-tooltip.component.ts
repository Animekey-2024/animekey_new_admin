import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-info-with-tooltip',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './info-with-tooltip.component.html',
  styleUrls: ['./info-with-tooltip.component.scss'],
})
export class InfoWithTooltipComponent {
  @Input() tooltipText = '';
}
