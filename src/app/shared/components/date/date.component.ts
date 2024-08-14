import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent {
  @Input() date!: string | undefined;
  @Input() showTime: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
