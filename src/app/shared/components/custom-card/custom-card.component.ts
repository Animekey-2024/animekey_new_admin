import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ICONS } from '@enums/icons.enum';

export const importMaterials = [MatCardModule];

@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [CommonModule, ...importMaterials],
  templateUrl: './custom-card.component.html',
  styleUrl: './custom-card.component.scss',
})
export class CustomCardComponent implements OnInit {
  @Input() cardData: any = [];
  @Input() cardColors: any;
  icons = [
    {
      icon: ICONS.MOVIE,
    },
    {
      icon: ICONS.MOVIE,
    },
    {
      icon: ICONS.TOTAL_USERS,
    },
    {
      icon: ICONS.TOTAL_USERS,
    },
  ];
  ngOnInit(): void {}
}
