import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '@services/app-state.service';
import { PERMISSIONS } from '@enums/permissions.enum';
import { NO_PERMISSION } from '@constants/routes';
import { LoaderService } from '@services/loader.service';

export const PermissionViewGuard: CanActivateFn = (route, state) => {
  const loaderService = inject(LoaderService);
  const appState = inject(AppStateService);
  const router = inject(Router);
  const permissions: any[] = appState.getUserPermissions();
  const pagePermissions = permissions.find(
    (feature) => feature.entity === route.data['feature']
  );
  if (
    pagePermissions &&
    (pagePermissions.includes(PERMISSIONS.VIEW) ||
      pagePermissions.includes(PERMISSIONS.ADD) ||
      pagePermissions.includes(PERMISSIONS.EDIT) ||
      pagePermissions.includes(PERMISSIONS.STATUS))
  ) {
    return true;
  } else {
    loaderService.hideLoader();
    router.navigate([NO_PERMISSION.fullUrl]);
    return false;
  }
};
