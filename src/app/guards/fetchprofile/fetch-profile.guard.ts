import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminProfileData } from '@interface/admin-profile.interface';
import { AdminProfileService } from '@components/features/admin-profile/service/admin-profile.service';
import { AppStateService } from '@services/app-state.service';
import { map, catchError, forkJoin, of } from 'rxjs';

export const FetchProfileGuard: CanActivateFn = (route, state) => {
  let profileService = inject(AdminProfileService);
  let appStateService = inject(AppStateService);
  let router = inject(Router);

  // const userProfile: AdminProfileData = {
  //   countryCode: '',
  //   phoneNumber: '',
  //   _id: '65c3268f646faadf14346daf',
  //   name: { first: 'Sahil', last: 'Singh' },
  //   id: 'SYS-PVUD663FGH',
  //   email: 'sahil@yopmail.com',
  //   role: {
  //     _id: '65c310d20406b4b406cc4b50',
  //     id: 'ROL-LIIHG565MC',
  //     title: 'All Access',
  //     isRoot: false,
  //   },
  //   avatar: '',
  //   createdBy: '65f2bb7d3fb55226d2bb88f8',
  //   isMFASetup: true,
  //   createdAt: '2024-02-07T06:43:27.343Z',
  //   lastLogin: '2024-03-14T08:54:49.633Z',
  // };

  
  const userProfile$ = profileService.fetchAdminProfile();
  const userPermission$ = profileService.fetchUserPermission();

  return forkJoin([userProfile$, userPermission$]).pipe(
    map(([profile, permission]) => {
      appStateService.saveUserProfile(profile.result);
      appStateService.setUserPermissions(permission.result);
      return true;
    }),
    catchError((er) => {
      throw er;
    })
  );
  // appStateService.saveUserProfile(userProfile);
  // return forkJoin([userPermission$]).pipe(
  //   map(([permission]) => {
  //     appStateService.setUserPermissions(permission.result);
  //     return true;
  //   }),
  //   catchError((er) => {
  //     throw er;
  //   })
  // );
};
