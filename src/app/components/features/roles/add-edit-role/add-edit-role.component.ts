import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SelectPermissionsComponent } from '../select-permissions/select-permissions.component';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { ERROR_TOASTS } from '@constants/toast-messages';
import { PERMISSIONS as STATIC_PERMISSIONS } from './permissions';
import { SnackbarService } from '@services/snackbar.service';
import { PermissionGroup } from '@models/permission-groups.model';
import { HelperTextComponent } from '@shared/components/helper-text/helper-text.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { ROLES_KEY } from '@enums/roles.enum';
import { Regex } from '@constants/regex';
import { MinLengthValidator } from 'src/app/validators/min-length.validators';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { AppStateService } from '@services/app-state.service';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { RolesService } from '../services/roles.service';
import {
  AddRolePayload,
  PermissionSearchData,
  PermissionSearchResult,
  PermissionsDetails,
  RoleDetails,
  RolesList,
} from '@interface/roles.interface';
import { PERMISSIONS } from '@enums/permissions.enum';
import { VALIDATION_CRITERIA } from '@constants/validation-criteria';
import { ROLES } from '@constants/routes';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { POPUP_MESSAGES } from '@constants/messages';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
];

@Component({
  selector: 'app-add-edit-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ...materials,
    SelectPermissionsComponent,
    HelperTextComponent,
    InputErrorPipe,
    BreadcrumbComponent,
    MatDividerModule,
    LabelTextComponent,
    MatDialogModule,
  ],
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
  readonly validationCriteria = VALIDATION_CRITERIA;
  form!: FormGroup;
  permissionGroups: PermissionGroup[] = [];
  isEditMode: boolean = false;
  roleDetail!: RoleDetails;
  isLoggedInUserRoleMatchWithCurrentRole = false;
  userInfo: any;
  routes = {
    ROLES: `/${ROLES.fullUrl}`,
  };

  @Input() roleId :  string ='';

  constructor(
    private rolesService: RolesService,
    private toast: SnackbarService,
    private router: Router,
    private fb: FormBuilder,
    private breadcrumbService: BreadcrumbService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.routerEvents();
    this.createForm();
    this.getRouteData();
    // this.userInfo = this.appStateService.getUserProfile();
  }

  /**
   * calls method to get role details by id
   */
  getRouteData() {
    if (this.roleId) {
      this.isEditMode = true;
      this.getRoleDetail();
    } else {
      this.fetchPermissionGroups();
    }
  }

  /**
   * fetches role details by id
   * @returns
   */
  // @LoaderEnabled()
  getRoleDetailApi() {
    return this.rolesService.getRoleDetailsByID(this.roleId);
  }

  /**
   * fetches role details by id
   */
  getRoleDetail() {
    this.getRoleDetailApi().subscribe((res) => {
      this.roleDetail = res.result;
      this.form.patchValue(res.result);
      this.form.get('id')?.disable();
      this.setPermissionGroups(res.result.permissions);
    });
  }

  /**
   * set up rolePermissions for user
   * @param permissions : PermissionSearchData
   * @returns 
   */
  setPermissionGroups(
    permissions: PermissionSearchData[] | PermissionsDetails[]
  ) {
    if (!this.isEditMode) {
      const rolePermissions = permissions as PermissionSearchData[];
      this.permissionGroups = rolePermissions.map(
        (item: PermissionSearchData) => {
          const permission: any = {
            isAdd: item.access[0].actions.includes(PERMISSIONS.ADD),
            isEdit: item.access[0].actions.includes(PERMISSIONS.EDIT),
            isStatus: item.access[0].actions.includes(PERMISSIONS.STATUS),
            isView: item.access[0].actions.includes(PERMISSIONS.VIEW),
            isDelete: item.access[0].actions.includes(PERMISSIONS.DELETE),
            title: item.title,
            permissionId: item._id,
          };

          // item.isDisabled = false;
          // if (
          //   (this.roleDetail?.title === ROLES_KEY.ADMIN ||u
          //     this.isLoggedInUserRoleMatchWithCurrentRole) &&
          //   item.slug === FEATURE_SLUGS.ROLES &&
          //   this.isEditMode
          // ) {
          //   item.isDisabled = true;
          // }

          return new PermissionGroup(permission, this.isEditMode);
        }
      );
      return;
    }
    const rolePermissions = permissions as PermissionsDetails[];
    this.permissionGroups = rolePermissions.map((item: PermissionsDetails) => {
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

      return new PermissionGroup(permission, this.isEditMode);
    });
  }

  /**
   * Mapped permission details coming from API
   * @param permission : string
   * @param actions : string
   * @param options : string
   * @returns
   */
  mappedPermissions(
    permission: string,
    actions: string[],
    options: string[]
  ): boolean {
    for (const key of options) {
      if (actions?.includes(key) && actions.includes(permission)) {
        return true;
      }
    }
    return false;
  }

  // @LoaderEnabled()
  fetchPermissionGroupsApi() {
    return this.rolesService.getPermissionsListing();
  }

  /**
   * set permission group according to the fetched permission
   */
  fetchPermissionGroups() {
    this.fetchPermissionGroupsApi().subscribe((res) => {
      this.setPermissionGroups(res?.result?.data);
    });
  }

  createForm() {
    this.form = this.fb.group({
      id: [
        '',
        Validators.compose([Validators.pattern(Regex.ALPHANUMERIC_WITH_HYPEN)]),
      ],
      title: [
        '',
        Validators.compose([
          Validators.required,
          //BlankSpaceValidator(),
          MinLengthValidator(VALIDATION_CRITERIA.nameMinLength),
          Validators.maxLength(VALIDATION_CRITERIA.nameMaxLength),
          Validators.pattern(Regex.characterOnly),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          Validators.maxLength(VALIDATION_CRITERIA.subTitleMaxLength),
        ]),
      ],
      permissions: [],
      isDefault: [],
    });
  }

  /**
   * api call for save/update role 
   * @returns 
   */
  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.permissionsAdded()) {
      const payload = await this.createPayload();
      if (!this.isEditMode) {
        this.saveRole(payload).subscribe({
          next: (res) => {
            this.toast.openSuccessToast(res.message);
            this.goToListPage();
          },
          error: (err) => {
            //this.toast.openErrorToast(err.message);
          },
        });
      } else {
        this.updateRoleConfirmation(payload);
      }
    } else {
      this.toast.openErrorToast(ERROR_TOASTS.SELECT_ONE_PERMISSION);
    }
  }

  /**
   * Create payload to create new role in the admin app
   * @returns
   */
  createPayload(): Promise<AddRolePayload> {
    return new Promise((resolve, reject) => {
      const permissions: PermissionGroup[] = JSON.parse(
        JSON.stringify(this.permissionGroups)
      );
      const permissionPayload = permissions.map((role) => {
        const selectedPermissions = this.filterSelectedActions(role);
        return {
          _id: role.permissionId,
          actions: selectedPermissions,
        };
      });

      const payload = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        permissions: this.filterSelectedPermission(permissionPayload),
      };
      if (this.form.get('title')?.value === this.roleDetail?.title) {
        delete payload.title;
      }

      resolve(payload);
    });
  }

  /**
   * filters permission for payload
   * @param permissionPayload :  {
      _id: string;
      actions: string[];
    }
   * @returns 
   */
  filterSelectedPermission(
    permissionPayload: {
      _id: string;
      actions: string[];
    }[]
  ) {
    const filteredPermission = permissionPayload?.filter((permission) => {
      return permission.actions.length > 0;
    });
    return filteredPermission;
  }

  /**
   * filters actions for payload
   * @param role : PermissionGroup
   * @returns 
   */
  filterSelectedActions(role: PermissionGroup): string[] {
    const actions = [];
    if (role.isAdd) {
      actions.push(PERMISSIONS.ADD);
    }
    if (role.isView) {
      actions.push(PERMISSIONS.VIEW);
    }
    if (role.isEdit) {
      actions.push(PERMISSIONS.EDIT);
    }
    if (role.isStatus) {
      actions.push(PERMISSIONS.STATUS);
    }
    if (role.isDelete) {
      actions.push(PERMISSIONS.DELETE);
    }
    return actions;
  }

  /**
   * navigates to roles list page
   */
  goToListPage() {
    this.router.navigate([ROLES.fullUrl]);
  }

/**
 * returns permission group
 * @returns 
 */
  permissionsAdded() {
    const permissions: PermissionGroup[] = JSON.parse(
      JSON.stringify(this.permissionGroups)
    );
    return permissions.some(
      (element: PermissionGroup) =>
        element.isView ||
        element.isAdd ||
        element.isStatus ||
        element.isEdit ||
        element.isShare ||
        element.isAssign ||
        element.isEditChild ||
        element.isViewChild ||
        element.isDelete
    );
  }

  /**
   * save new role
   * @param payload : AddRolePayloa
   * @returns 
   */
  // @LoaderEnabled()
  saveRole(payload: AddRolePayload) {
    return this.rolesService.createRoles(payload);
  }

  /**
   * updates role detail
   * @param payload : AddRolePayload
   * @returns 
   */
  // @LoaderEnabled()
  updateRole(payload: AddRolePayload) {
    return this.rolesService.updateRoles(this.roleId, payload);
  }

  getPayload(source: any) {
    let payload = source;
    const permissions: PermissionGroup[] = JSON.parse(
      JSON.stringify(this.permissionGroups)
    );
    permissions.forEach((item: any) => {
      delete item.permissions;
      delete item.isDisabled;
    });
    payload.permissions = permissions;
    return payload;
  }

  /**
   * opens confirmation pop up to update role
   * @param payload AddRolePayload
   */
  updateRoleConfirmation(payload: AddRolePayload) {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: {
        title: POPUP_MESSAGES.confirm,
        headerText: POPUP_MESSAGES.updateDataConfirmation,
        submitButtonText: DialogActionBtn.UPDATE,
        cancelButtonText: DialogActionBtn.CANCEL,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) {
        return;
      }
      this.updateRole(payload).subscribe({
        next: (res) => {
          this.toast.openSuccessToast(res.message);
          this.goToListPage();
        },
        error: (err: HttpErrorResponse) => {
          this.toast.openErrorToast(err.error.message);
        },
      });
    });
  }
}

export function BlankSpaceValidator():
  | import('@angular/forms').ValidatorFn
  | null
  | undefined {
  throw new Error('Function not implemented.');
}
