import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ICONS } from '@enums/icons.enum';

@Component({
  selector: 'app-data-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
})
export class DataCardComponent {
  @Input() dataCardInput: any = [];
  upArrow = ICONS.UP_ARROW;

  constructor() {}
}
