import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TABLES } from '@constants/table-columns';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { Pagination } from '@models/pagination.model';
import { Params, Router, RouterModule } from '@angular/router';
import { TableComponent } from '@shared/components/table/table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { SearchComponent } from '@shared/components/search/search.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { SubAdminFilterComponent } from '../../sub-admin-filter/sub-admin-filter.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { SubAdminService } from '../../service/sub-admin.service';
import {
  ADMIN_EDIT_PROFILE,
  ADMIN_VIEW_PROFILE,
  SUB_ADMIN,
  SUB_ADMIN_ADD,
  SUB_ADMIN_EDIT,
} from '@constants/routes';
import { DateFilterComponent } from '@shared/components/filters/date-filter/date-filter.component';
import { COMMON_MESSAGES, PERMISSION_DENIED } from '@constants/messages';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { ICONS } from '@enums/icons.enum';
import { SnackbarService } from '@services/snackbar.service';
import { SubAdminList } from '@interface/sub-admin-interface';
import { SubAdminModel } from './sub-admin-model';
import { AppStateService } from '@services/app-state.service';
import { PERMISSIONS } from '@enums/permissions.enum';
import { CheckPermissionDirective } from '@shared/directives/check-permission/check-permission.directive';
import { PermissionService } from '@services/permission.service';
import { MatTooltipModule } from '@angular/material/tooltip';


const importMaterials = [
  TableComponent,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatDialogModule,
  MatTooltipModule,
];

@Component({
  selector: 'app-sub-admin-list',
  standalone: true,
  imports: [
    CommonModule,
    ...importMaterials,
    PaginationComponent,
    SearchComponent,
    RouterModule,
    BreadcrumbComponent,
    SubAdminFilterComponent,
    ButtonComponent,
    DateFilterComponent,
    CheckPermissionDirective,
  ],
  templateUrl: './sub-admin-list.component.html',
  styleUrls: ['./sub-admin-list.component.scss'],
})
export class SubAdminListComponent extends Pagination {
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  columns = TABLES.SUB_ADMIN;
  features = FEATURE_SLUGS;
  permissions = PERMISSIONS;
  sortData!: object;
  pagination = new Pagination();

  filtersData!: object;
  searchText!: string;
  #breadCrumbService = inject(BreadcrumbService);
  #permissionService = inject(PermissionService);
  #router = inject(Router);
  queryParams = {};
  btnSlug = BUTTON_SLUGS;
  fromDate = '';
  toDate = '';
  loggedInUserId: string = '';
  subAdminActionPermission = true;
  permissionMessages = PERMISSION_DENIED;
  constructor(
    private _subAdminService: SubAdminService,
    private _route: Router,
    private _dialog: MatDialog,
    private _toast: SnackbarService,
    private _profileService: AppStateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.#breadCrumbService.routerEvents();
    this.dataSource.sort = this.sort;
    this.loggedInUserId = this._profileService.getUserID();
  }

  onSortChange(ev: MatSort) {
    let sortQuery = {};
    if (ev.direction) {
      sortQuery = {
        sort: ev.direction,
        sortBy: ev.active,
      };
    }
    this.sortData = sortQuery;
    this.getSubAdminData();
  }

  onChange(event: any): void {
    if (!event) {
      this.filtersData = {};
    } else {
      this.filtersData = event;
    }
    this.getSubAdminData();
  }

  /**
   * change in filter value
   * @param inputText : string
   */
  changeFilter(inputText: string): void {
    // this.resetPagination();
    this.searchText = inputText;
    this.getSubAdminData();
  }

  /**
   *  fetching sub admin list by this method
   */

  getSubAdminData(): void {
    let obj: Params = {
      limit: this.pagination['pageSize'],
      page: this.pagination['currentPage'],
    };
    if (this.searchText && this.searchText.trim() !== '') {
      obj['search'] = this.searchText.toLowerCase();
      this.pagination.resetPagination();
    }

    if (this.toDate && this.fromDate) {
      obj['fromDate'] = this.fromDate;
      obj['toDate'] = this.toDate;
    }

    const queryParams = {
      ...this.queryParams,
      ...obj,
      ...this.sortData,
      ...this.pagination.getPaginationData(),
    };

    this._subAdminService.subAdminList(queryParams).subscribe((response) => {
      const result = response.result;

      const allData: any = [];
      result.data.map((element: SubAdminList) => {
        allData.push(new SubAdminModel(element));
      });
      this.dataSource.data = allData;
      this.checkSubAdminPermission();
      this.pagination.totalRecords = result.total;
    });
  }

  /**
   * checks sub admin permissions
   */
  checkSubAdminPermission(): void {
    const subAdminActivateDeactivatePermission =
      this.#permissionService.hasPermission(
        FEATURE_SLUGS.SUB_ADMINS,
        PERMISSIONS.STATUS
      );
    const subAdminEditPermission = this.#permissionService.hasPermission(
      FEATURE_SLUGS.SUB_ADMINS,
      PERMISSIONS.EDIT
    );

    this.subAdminActionPermission =
      subAdminActivateDeactivatePermission || subAdminEditPermission;
  }

  /**
   *
   * @param ev change pagination by this method
   */
  onPaginationChange(ev: MatPaginator): void {
    this.pagination.page = ev.pageIndex + 1;
    this.pagination.limit = ev.pageSize;
    this.getSubAdminData();
  }
  /**
   *
   * @param data change action here from listing page of specific sub admin
   */
  changeAction(data: any): void {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: {
        title: data.isActive
          ? COMMON_MESSAGES.DEACTIVATED.title('Sub Admin')
          : COMMON_MESSAGES.ACTIVATED.title('Sub Admin'),
        headerText: data.isActive
          ? COMMON_MESSAGES.DEACTIVATED.confirm(
            'Deactivate',
            false,
            'sub admin'
          )
          : COMMON_MESSAGES.ACTIVATED.confirm('Activate', false, 'sub admin'),

        submitButtonText: DialogActionBtn.CONFIRM,
        cancelButtonText: DialogActionBtn.CANCEL,
        showTextBox: false,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this._subAdminService
          .subAdminBlockUnblock(data._id, {
            blockUnblockReason: confirmed.reason,
            isActive: !data.isActive,
          })
          .subscribe((response) => {
            this.getSubAdminData();
            this._toast.openSuccessToast(response.message);
          });
      }
    });
  }

  /**
   *
   * @param obj filter applied here
   */
  filterData(obj: any): void {
    const params: any = {};
    if (obj) {
      if (obj['isActive'] && obj['isActive'] !== 'all') {
        params['isActive'] = obj['isActive'] === 'active' ? true : false;
      }
    }
    this.queryParams = params;
    this.pagination.resetPage();
    this.getSubAdminData();
  }

  /**
   *
   * @param date date argument
   * @returns  returns in YYYY-MM-DD format
   */
  changeDateFormat(date: string) {
    const newDate = new Date(date);
    var year = newDate.getFullYear().toString();
    var month = (newDate.getMonth() + 101).toString().substring(1);
    var day = (newDate.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  }
  /**
   *
   * @param value search filter is applied here
   */
  searchData(value: string): void {
    this.searchText = value;
    this.getSubAdminData();
  }
  /**
   *
   * @param data redirect to the detail page
   */
  redirectToDetailPage(data: any): void {
    if (this._profileService.getUserID() === data['_id']) {
      this.#router.navigate([`${ADMIN_VIEW_PROFILE.fullUrl}`]);
    } else {
      this._route.navigate([SUB_ADMIN.path, data['_id']]);
    }
  }

  /**
   * navigates to create sub admin page
   */
  onAdd(): void {
    this.#router.navigate([SUB_ADMIN_ADD.fullUrl]);
  }

  /**
   * navigates to edit sub admin page
   * @param subAdminId : string
   */
  onSubAdminEdit(subAdminId: string): void {
    if (this.loggedInUserId === subAdminId) {
      this.#router.navigate([`${ADMIN_EDIT_PROFILE.fullUrl}`]);
    } else {
      this.#router.navigate([`${SUB_ADMIN_EDIT.fullUrl}/${subAdminId}`]);
    }
  }

  onDateChange(event: any): void {
    if (event) {
      this.fromDate = event.value.fromDate;
      this.toDate = event.value.toDate;
      this.getSubAdminData();
    }
  }
}
