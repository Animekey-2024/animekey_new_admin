import { Routes } from '@angular/router';
import { AdminGuard } from '@guards/admin/admin.guard';
import { FetchProfileGuard } from '@guards/fetchprofile/fetch-profile.guard';

import { FeaturesComponent } from './features.component';
import { ADMIN_EDIT_PROFILE, ADMIN_PROFILE, ADMIN_VIEW_PROFILE, DASHBOARD, NO_PERMISSION, ROLES, ROLES_CREATE, ROLES_DETAILS, ROLES_EDIT, SUB_ADMIN, SUB_ADMIN_ADD, SUB_ADMIN_EDIT, SUB_ADMIN_VIEW, UPDATE_PASSWORD } from '@constants/routes';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { PermissionAddGuard } from '@guards/permissions/can-add.guard';
import { PermissionEditGuard } from '@guards/permissions/can-edit.guard';
import { PermissionViewGuard } from '@guards/permissions/can-view.guard';

export const FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    canActivate: [AdminGuard, FetchProfileGuard],
    children: [
      {
        path: '',
        redirectTo: DASHBOARD.path,
        pathMatch: 'full',
        data: { label: DASHBOARD.label, breadcrumb: DASHBOARD.path },
      },
      // Dashboard Routing Config
      {
        path: DASHBOARD.path,
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (comp) => comp.DashboardComponent
          ),
        data: { label: DASHBOARD.label, breadcrumb: DASHBOARD.path },
      },
      // Admin Profile Routing Config
      {
        path: ADMIN_PROFILE.path,
        data: { label: ADMIN_PROFILE.label, breadcrumb: ADMIN_PROFILE.path },
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin-profile/admin-view-profile/admin-view-profile.component'
              ).then((comp) => comp.AdminViewProfileComponent),
          },
          {
            path: `${ADMIN_VIEW_PROFILE.path}`,
            loadComponent: () =>
              import(
                './admin-profile/admin-view-profile/admin-view-profile.component'
              ).then((comp) => comp.AdminViewProfileComponent),
            data: {
              label: ADMIN_VIEW_PROFILE.label,
              breadcrumb: ADMIN_VIEW_PROFILE.path,
            },
          },
          {
            path: `${ADMIN_EDIT_PROFILE.path}`,
            loadComponent: () =>
              import(
                './admin-profile/admin-edit-profile/admin-edit-profile.component'
              ).then((comp) => comp.AdminEditProfileComponent),
            data: {
              label: ADMIN_EDIT_PROFILE.label,
              breadcrumb: ADMIN_EDIT_PROFILE.path,
            },
          },

          {
            path: `${UPDATE_PASSWORD.path}`,
            loadComponent: () =>
              import(
                './admin-profile/change-password/change-password.component'
              ).then((comp) => comp.ChangePasswordComponent),
            data: {
              label: UPDATE_PASSWORD.label,
              breadcrumb: UPDATE_PASSWORD.path,
            },
          },
        ],
      },

      //Sub Admin Routing Config 
      {
        path: SUB_ADMIN.path,
        data: {
          label: SUB_ADMIN.label,
          breadcrumb: SUB_ADMIN.path,
          feature: FEATURE_SLUGS.SUB_ADMINS,
        },
        children: [
          {
            path: '',
            canActivate: [PermissionViewGuard],
            loadComponent: () =>
              import(
                './sub-admin/sub-admin-list/components/sub-admin-list.component'
              ).then((comp) => comp.SubAdminListComponent),
          },
          {
            path: `${SUB_ADMIN_ADD.path}`,
            canActivate: [PermissionAddGuard],
            loadComponent: () =>
              import(
                './sub-admin/sub-admin-add-edit/components/sub-admin-add-edit.component'
              ).then((comp) => comp.SubAdminAddEditComponent),
            data: {
              label: SUB_ADMIN_ADD.label,
              breadcrumb: SUB_ADMIN_ADD.path,
            },
          },
          {
            path: `${SUB_ADMIN_EDIT.path}/:subAdminId`,
            canActivate: [PermissionEditGuard],
            loadComponent: () =>
              import(
                './sub-admin/sub-admin-add-edit/components/sub-admin-add-edit.component'
              ).then((comp) => comp.SubAdminAddEditComponent),
            data: {
              label: SUB_ADMIN_EDIT.label,
              breadcrumb: SUB_ADMIN_EDIT.path,
            },
          },
          {
            path: `:subAdminId`,
            canActivate: [PermissionViewGuard],
            loadComponent: () =>
              import(
                './sub-admin/sub-admin-view-profile/sub-admin-view-profile.component'
              ).then((comp) => comp.SubAdminViewProfileComponent),
            data: {
              label: SUB_ADMIN_VIEW.label,
              breadcrumb: SUB_ADMIN_VIEW.path,
            },
          },
        ],
      },

      // Roles Management Routing Config
      {
        path: ROLES.path,
        data: {
          label: ROLES.label,
          breadcrumb: ROLES.path,
          feature: FEATURE_SLUGS.ROLES,
        },
        children: [
          {
            path: '',
            canActivate: [PermissionViewGuard],
            loadComponent: () =>
              import('./roles/role-table/role-table.component').then(
                (comp) => comp.RolesTableComponent
              ),
          },
          {
            path: ROLES_CREATE.path,
            canActivate: [PermissionAddGuard],
            loadComponent: () =>
              import('./roles/add-edit-role/add-edit-role.component').then(
                (comp) => comp.AddEditRoleComponent
              ),
            data: { label: ROLES_CREATE.label, breadcrumb: ROLES_CREATE.path },
          },
          {
            path: `${ROLES_EDIT.path}/:roleId`,
            canActivate: [PermissionEditGuard],
            loadComponent: () =>
              import('./roles/add-edit-role/add-edit-role.component').then(
                (comp) => comp.AddEditRoleComponent
              ),
            data: { label: ROLES_EDIT.label, breadcrumb: ROLES_EDIT.path },
          },
          {
            path: `${ROLES_DETAILS.path}/:roleId`,
            canActivate: [PermissionViewGuard],
            loadComponent: () =>
              import('./roles/view-role/view-role.component').then(
                (comp) => comp.ViewRoleComponent
              ),
            data: {
              label: ROLES_DETAILS.label,
              breadcrumb: ROLES_DETAILS.path,
            },
          },
        ],
      },


      {
        path: NO_PERMISSION.path,
        loadComponent: () =>
          import(
            '../../shared/components/no-permission/no-permission.component'
          ).then((comp) => comp.NoPermissionComponent),
      },
    ],
  },
];
