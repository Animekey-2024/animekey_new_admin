import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RolesToolTip } from 'src/app/constants/tooltip';
import { API_URLs } from '@constants/url';
import { PERMISSIONS } from '@enums/permissions.enum';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { PermissionGroup } from '@models/permission-groups.model';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { SnackbarService } from '@services/snackbar.service';
import { RolesService } from '../services/roles.service';
import { PermissionsDetails, RoleDetails } from '@interface/roles.interface';
import { COMMON_MESSAGES } from '@constants/messages';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { StatusComponent } from '@shared/components/status/status.component';
import { DateComponent } from '@shared/components/date/date.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { ROLES_EDIT } from '@constants/routes';
import { OptionalFieldPipe } from '@shared/pipes/optional-field/optional-field.pipe';
import { CheckPermissionDirective } from '@shared/directives/check-permission/check-permission.directive';
import { AppStateService } from '@services/app-state.service';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    StatusComponent,
    DateComponent,
    ButtonComponent,
    BreadcrumbComponent,
    OptionalFieldPipe,
    CheckPermissionDirective,
  ],
})
export class ViewRoleComponent implements OnInit {
  readonly toolTip = RolesToolTip;
  readonly URLConstants = API_URLs;
  readonly btnSlugs = BUTTON_SLUGS;
  roleDetail: any;
  features = FEATURE_SLUGS;
  permissions = PERMISSIONS;
  isRoleActive = true;
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  #toast = inject(SnackbarService);
  #dialog = inject(MatDialog);
  #roleService = inject(RolesService);
  #breadcrumbService = inject(BreadcrumbService);
  @Input() roleId: string = '';
  profileService = inject(AppStateService);

  // profileDetail!: AdminProfileData;
  profileDetail = this.profileService.userProfileUpdate();

  ngOnInit(): void {
    this.#breadcrumbService.routerEvents();
    this.getRouteData();
  }

  getRouteData() {
    if (this.roleId) {
      this.getRoleDetail();
    }
  }

  /**
   * api call for role detail by id
   * @returns
   */
  //@LoaderEnabled()
  getRoleDetailApi() {
    return this.#roleService.getRoleDetailsByID(this.roleId);
  }

  /**
   * fetches role detail
   */
  getRoleDetail() {
    this.getRoleDetailApi().subscribe((res) => {
      const result = res.result;
      const permissionsData = result.permissions.map(
        (item: PermissionsDetails) => {
          const permission: any = {
            isAdd: item.actions.includes(PERMISSIONS.ADD),
            isEdit: item.actions.includes(PERMISSIONS.EDIT),
            isStatus: item.actions.includes(PERMISSIONS.STATUS),
            isView: item.actions.includes(PERMISSIONS.VIEW),
            isDelete: item.actions.includes(PERMISSIONS.DELETE),
            title: item?.title,
            permissionId: item?._id,
            options: item.options,
          };
          return new PermissionGroup(permission, true);
        }
      );
      this.roleDetail = result;
      this.roleDetail.permissions = permissionsData as any;
    });
  }

  /**
   * opens confirmation dialog box to activate/deactivate role
   * @param roleData : Role
   */
  changeStatus(roleData: RoleDetails): void {
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
            this.roleDetail.isActive = !roleData.isActive;
            this.#toast.openSuccessToast(response.message);
          });
      }
    });
  }

  /**
   * navigates to add/edit role page
   */
  editRole(): void {
    this.#router.navigate([ROLES_EDIT.fullUrl, this.roleId]);
  }

  /**
 * We will fetch profile detail of admin
 */
  getProfileDetail() {
    this.profileDetail = this.profileService.getUserProfile();
  }

}
