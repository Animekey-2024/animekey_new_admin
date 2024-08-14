import { CommonModule, DatePipe } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { TableComponent } from '@shared/components/table/table.component';
import { RoleFilterComponent } from '../role-filter/role-filter.component';
import { MatPaginator } from '@angular/material/paginator';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpService } from '@services/http.service';
import { Params, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from '@shared/components/search/search.component';
import { Column } from 'src/app/interface/table-column.interface';
import { TABLES } from '@constants/table-columns';
import { Pagination } from '@models/pagination.model';
import { SnackbarService } from '@services/snackbar.service';
import { RolesService } from '../services/roles.service';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DateFilterComponent } from '@shared/components/filters/date-filter/date-filter.component';
import { ROLES_CREATE, ROLES_DETAILS, ROLES_EDIT } from '@constants/routes';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { Role, RoleFilterData } from '@interface/roles.interface';
import { COMMON_MESSAGES, PERMISSION_DENIED } from '@constants/messages';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { PERMISSIONS } from '@enums/permissions.enum';
import { PermissionService } from '@services/permission.service';
import { CheckPermissionDirective } from '@shared/directives/check-permission/check-permission.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppStateService } from '@services/app-state.service';

@Component({
  selector: 'app-role-table',
  templateUrl: './role-table.component.html',
  styleUrls: ['./role-table.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [
    CommonModule,
    TableComponent,
    RouterModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    PaginationComponent,
    SearchComponent,
    RoleFilterComponent,
    PaginationComponent,
    BreadcrumbComponent,
    DateFilterComponent,
    CheckPermissionDirective,
    MatTooltipModule,
  ],
})
export class RolesTableComponent {
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort | any;
  searchText!: string;
  filtersData!: object;
  sortData!: object;
  columns: Column[] = TABLES.ROLE_TABLE;
  pagination = new Pagination();
  features = FEATURE_SLUGS;
  permissions = PERMISSIONS;
  httpService = inject(HttpService);
  #toast = inject(SnackbarService);
  #dialog = inject(MatDialog);
  #router = inject(Router);
  #roleService = inject(RolesService);
  #breadcrumbService = inject(BreadcrumbService);
  #permissionService = inject(PermissionService);
  rolesCreate = ROLES_CREATE;
  fromDate = '';
  toDate = '';
  queryParams = {};
  rolePermission = true;
  permissionMessages = PERMISSION_DENIED;
  profileService = inject(AppStateService);

  // profileDetail!: AdminProfileData;
  profileDetail = this.profileService.userProfileUpdate();


  ngOnInit(): void {
    this.getProfileDetail();
    this.getRoles();
    this.#breadcrumbService.routerEvents();
  }

  constructor(public datepipe: DatePipe) { }

  /**
   * Get roles from the api
   */
  getRoles(): void {
    this.getRoleList().subscribe({
      next: (res) => {
        this.dataSource.data = res.result.data;

        this.pagination.totalRecords = res.result.total;
        this.checkRolePermission();
      },
      error: (err) => {
        this.#toast.openErrorToast(err.message);
      },
    });
  }

  create() {
    this.#router.navigate(['']);
  }

  /**
   * fetches role list data
   * @returns 
   */
  getRoleList() {
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

    return this.#roleService.getRoles(queryParams);
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
    this.getRoles();
  }

  onPaginationChange(ev: MatPaginator) {
    this.pagination.page = ev.pageIndex + 1;
    this.pagination.limit = ev.pageSize;
    this.getRoles();
  }

  /**
   * navigates to role detail page
   * @param item : Role
   */
  viewRole(item: Role): void {
    this.#router.navigate([ROLES_DETAILS.fullUrl, item._id]);
  }

  /**
   * navigate to edit role page
   * @param item : Role
   */
  editRole(item: Role): void {
    this.#router.navigate([ROLES_EDIT.fullUrl, item._id]);
  }

  /**
   * opens confirmation dialog box to activate/deactivate role
   * @param roleData : Role
   */
  changeAction(roleData: Role): void {
    const dialogRef = this.#dialog.open(ConfirmComponent, {
      data: {
        title: roleData.isActive
          ? COMMON_MESSAGES.DEACTIVATED.title('Role')
          : COMMON_MESSAGES.ACTIVATED.title('Role'),
        headerText: roleData.isActive
          ? COMMON_MESSAGES.DEACTIVATED.confirm('Deactivate', false, 'role')
          : COMMON_MESSAGES.ACTIVATED.confirm('Activate', false, 'role'),
        submitButtonText: DialogActionBtn.CONFIRM,
        cancelButtonText: DialogActionBtn.CANCEL,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.#roleService
          .roleBlockUnblock(roleData._id, roleData.isActive)
          .subscribe((response) => {
            this.getRoles();
            this.#toast.openSuccessToast(response.message);
          });
      }
    });
  }

  searchTextChange(inputText: string): void {
    this.pagination.resetPagination();
    this.searchText = inputText;
    this.getRoles();
    /* Enable below line if you want to search with already fetched data */
    // this.dataSource.filter = searchText.trim().toLowerCase();
  }

  filterData(event: { isActive: boolean | string }) {
    const params: RoleFilterData = {};
    if (event) {
      if (event.isActive && event.isActive !== 'all') {
        params.isActive = event.isActive === 'active' ? true : false;
      }
    }
    this.queryParams = params;
    this.pagination.resetPage();
    this.getRoles();
  }

  onDateChange(event: any) {
    if (event) {
      this.fromDate = event.value.fromDate;
      this.toDate = event.value.toDate;
      this.getRoles();
    }
  }

  /**
   * Check has permission
   */
  checkRolePermission(): void {
    const roleEditPermission = this.#permissionService.hasPermission(
      FEATURE_SLUGS.ROLES,
      PERMISSIONS.EDIT
    );
    const roleStatusPermission = this.#permissionService.hasPermission(
      FEATURE_SLUGS.ROLES,
      PERMISSIONS.STATUS
    );

    this.rolePermission = roleEditPermission || roleStatusPermission;
  }

  /**
  * We will fetch profile detail of admin
  */
  getProfileDetail() {
    this.profileDetail = this.profileService.getUserProfile();
  }



  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
