import { Injectable, signal } from '@angular/core';
import { ROLES_KEY } from '@enums/roles.enum';
import { AdminProfileData } from '@interface/admin-profile.interface';


@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  // userProfileUpdate = new BehaviorSubject<any>(null);
  userProfileUpdate = signal<any | undefined>(undefined);
  permission: unknown;
  userSession$: any = {
    PROFILE: {
      id: 'EMP-9NDQW3JKPM',
      _id: '324234234324',
      name: {
        fist: 'Test',
        last: 'name',
      },
      email: 'dileep@yopmail.com',
      countryCode: '+1',
      phoneNumber: '',
      avatar: '',
      role: '',
      timezone: '',
    },
  };
  constructor() {}

  getUserID() {
    return this.userSession$.PROFILE._id;
  }

  isUserLoggedIn() {
    return this.userSession$.PROFILE.role === ROLES_KEY.ADMIN;
  }

  resetUserProfile() {
    this.userSession$ = {
      PROFILE: null,
    };
    this.userProfileUpdate.set(null);
  }

  saveUserProfile(profile: AdminProfileData) {
    this.userProfileUpdate.set(profile);
    this.userSession$.PROFILE = profile;
    this.userSession$.PROFILE.permissions = this.permission;
  }

  getUserProfile() {
    return this.userSession$.PROFILE;
  }

  setUserPermissions(permissions: any) {
    if (!this.userSession$.PROFILE) {
      return;
    }
    this.permission = permissions;
    this.userSession$.PROFILE.permissions = permissions;
    this.userSession$.PROFILE.permissions = this.permission;
  }

  getUserPermissions() {
    const permissions = this.userSession$.PROFILE.permissions;
    Object.keys(permissions).forEach((key) => {
      permissions[key].entity = key;
    });
    return Object.values(permissions);
  }
}
