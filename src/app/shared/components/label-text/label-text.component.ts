import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InfoWithTooltipComponent } from '../info-with-tooltip/info-with-tooltip.component';

@Component({
  selector: 'app-label-text',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    InfoWithTooltipComponent,
  ],
  templateUrl: './label-text.component.html',
  styleUrls: ['./label-text.component.scss'],
})
export class LabelTextComponent {
  @Input({ required: true }) labelText!: string;
  @Input() disabled = false;
  @Input() tooltipText = '';
}
