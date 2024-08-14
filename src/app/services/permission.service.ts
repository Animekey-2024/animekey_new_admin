import { Injectable } from '@angular/core';
import { AppStateService } from './app-state.service';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { PERMISSIONS } from '@enums/permissions.enum';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private appStateService: AppStateService) {}

  hasPermission(feature: FEATURE_SLUGS, permission: PERMISSIONS) {
    const allPermissions: any[] = this.appStateService.getUserPermissions();
    const module = allPermissions.find(
      (permission) => permission.entity === feature
    );
    return module && module.includes(permission);
  }
}
