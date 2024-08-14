import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { LabelTextComponent } from '../label-text/label-text.component';
import { InputErrorPipe } from '../../pipes/input-error/input-error.pipe';

interface valueType {
  name: string;
  value: string | number;
  flag?: string;
  isDisabled?: boolean;
}

const modules = [
  CommonModule,
  MatFormFieldModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectSearchComponent,
  LabelTextComponent,
  InputErrorPipe,
];
@Component({
  selector: 'app-common-select',
  standalone: true,
  templateUrl: './common-select.component.html',
  styleUrls: ['./common-select.component.scss'],
  imports: [modules],
})
export class CommonSelectComponent {
  @Input() set dataList(data: valueType[]) {
    if (data && !!data.length) {
      this.allData = data;
    } else {
      this.allData = [];
    }
  }
  allData: valueType[] = [];

  @Input() label = '';

  @Output() valueChange = new EventEmitter();
  @Input() controlName: any = '';
  @Input() form: any = FormGroup;
  @Input() selectedItem: string[] | string = '';
  @Input() styleClass: string = '';
  @Input() errorText: string = '';
  @Input() isMultipleSelect = false;
  @Input() isSearchable = false;
  @Input() isDisabled = false;
  @Input() placeholderLabel = '';
  @Input() combineKeyValue = false;
  @Input() panelWidth = 'auto';
  @Input() panelClass = '';

  filterDataCtrl: FormControl = new FormControl();

  /** list of data filtered by search keyword */
  filteredData: ReplaySubject<valueType[]> = new ReplaySubject<valueType[]>(1);

  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject<void>();

  ngOnInit() {
    this.filterDataCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterData();
      });
    this.setInitialization();
  }
  setInitialization() {
    setTimeout(() => {
      this.filteredData.next(this.allData.slice());
    }, 100);
  }

  filterData() {
    if (!this.allData) {
      return;
    }
    let search = this.filterDataCtrl.value;
    if (!search) {
      this.filteredData.next(this.allData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredData.next(
      this.allData.filter(
        (bank) => bank.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['dataList']) {
      this.setInitialization();
      if (this.selectedItem) {
        this.form.get(this.controlName)?.setValue(this.selectedItem);
        this.form.updateValueAndValidity();
      }
    }
  }

  sendValue() {
    this.valueChange.emit(this.form.controls[this.controlName]?.value);
  }

  toggleSelectedItem() {
    this.clearSearch();
  }

  clearSearch() {
    this.filterDataCtrl?.setValue(''); // Clear the search input
    this.filteredData.next(this.allData.slice()); // Reset the filtered list to the original data
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
