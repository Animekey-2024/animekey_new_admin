import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
})
export class PaginationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @Output() page = new EventEmitter();
  @Input() dataSource = new MatTableDataSource();
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  @Input() totalRecords!: number;
  @Input() pageIndex = 0;

  constructor() {}

  ngOnInit(): void {}

  pageChanged(event: PageEvent) {
    this.page.emit(event);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
