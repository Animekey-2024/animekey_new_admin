import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LabelTextComponent } from '../label-text/label-text.component';
import { Regex } from '@constants/regex';
import { DisallowSpecialCharacterDirective } from '@shared/directives/disallow-special-character/disallow-special-character.directive';
import { FormsModule } from '@angular/forms';

const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  LabelTextComponent,
  FormsModule,
];

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ...materials, DisallowSpecialCharacterDirective],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Output() applySearchFilter = new EventEmitter();
  @Input({ required: true }) label!: string;
  @Input() width: string | number = 'auto';
  private searchSub = new Subject<string>();

  search = '';

  ngOnInit(): void {
    this.searchSub
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.applySearchFilter.emit(filterValue);
      });
  }

  changeValue(event: KeyboardEvent) {
    // Regular expression to match alphanumeric characters
    const filterValue = (event.target as HTMLInputElement).value
      ?.trim()
      ?.toLowerCase();
    // Remove any special characters from the input value
    let sanitizedValue = filterValue.replace('+', '');

    this.searchSub.next(sanitizedValue?.trim()?.toLowerCase());
    return true;
  }

  clearSearch() {
    this.search = '';
    this.searchSub.next('');
  }
}
