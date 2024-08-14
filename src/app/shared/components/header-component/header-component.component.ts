import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [CommonModule, MatCardModule, ButtonComponent],
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent {
  @Input() title!: string;
  @Input() headerType?: string =
    ''; /** it define then in which module, header is being used */
  @Input() showBtn: boolean =
    true; /** it is specially used in cms module  for edit button (for shoing or hiding edit button)*/
  @Output() changeEvent =
    new EventEmitter(); /** it is specially used in cms module, when click on edit button then send a boolean value for showing editor */

  edit() {
    /** *  when click on edit button from header then this method will be invoke */
    this.changeEvent.emit(true);
  }
}
