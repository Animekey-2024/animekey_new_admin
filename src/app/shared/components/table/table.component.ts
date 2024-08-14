import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OptionalFieldPipe } from '@shared/pipes/optional-field/optional-field.pipe';
import { DateComponent } from '../date/date.component';
import { StatusComponent } from '../status/status.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { ShortNamePipe } from '@shared/pipes/short-name/short-name.pipe';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { Column } from 'src/app/interface/table-column.interface';
import { STATIC_COLUMNS } from '@enums/static-column.enum';
import { UserModelInterface } from 'src/app/interface/auth.interface';
import { NoDataComponent } from '../no-data/no-data.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    OptionalFieldPipe,
    DateComponent,
    StatusComponent,
    ImagePreviewComponent,
    ShortNamePipe,
    NoDataComponent,
    MatCheckboxModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() feature!: FEATURE_SLUGS;
  @Input() tableColumns!: Column[];
  @Input() dataSource: any = [];
  @Input() customTemplates: any;
  @Input() customMenu: any;
  @Input() ratingIcon: any;
  @Output() viewItem = new EventEmitter();
  @Output() editItem = new EventEmitter();
  @Output() actionChange = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() rowClick = new EventEmitter();
  displayedColumns: string[] = [];
  staticColumns = STATIC_COLUMNS;
  loggedInUser: UserModelInterface | any;
  permissions = Permissions;
  @Input() isCursor = false;
  // appStateService = inject(AppStateService);

  selection: any = new SelectionModel(true, []);

  constructor() {}
  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((column) => column.key);
    // this.loggedInUser = this.appStateService.getUserProfile();
  }

  sortChange(ev: Sort) {
    this.sort.emit(ev);
  }

  view(ev: any) {
    this.viewItem.emit(ev);
  }

  edit(ev: any) {
    this.editItem.emit(ev);
  }

  changeAction(ev: any) {
    this.actionChange.emit(ev);
  }

  viewFromRow(ev: any) {
    this.rowClick.emit(ev);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row: any) =>
            this.selection.select(row)
          );
    }
  }

  /**
   *
   * @returns checks wheteher all rows are selected or not
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   *
   * @returns checks wheteher some rows are selected or not
   */

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }
}
