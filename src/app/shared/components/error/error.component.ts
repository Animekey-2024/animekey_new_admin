import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, MatInputModule, InputErrorPipe],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() errLabel!: string;
}
