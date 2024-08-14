import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() label?: string = '';
  @Input() color?: string = 'primary';
  @Input() type: string = 'submit';
  @Input() class?: string = 'butn butn__new';
  @Input() isStrokeBtn = false;
  @Input() matIcon = '';
  @Output() enter = new EventEmitter();
  @Output() onClick = new EventEmitter();
  @HostListener('document:keyup.enter', ['$event']) onEnter(ev: any) {
    if (!this.disabled) {
      this.enter.emit(true);
    }
  }

  constructor() {}

  ngOnInit(): void {}

  click() {
    if (!this.disabled) {
      this.onClick.emit(true);
    }
  }
  cancel() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
