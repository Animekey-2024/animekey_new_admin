import { AfterViewInit, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavService } from '../sidenav/services/sidenav.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { StorageService } from '@services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SnackbarService } from '@services/snackbar.service';
import { ImagePlaceholderPipe } from '@shared/pipes/imagePlaceholder/imagePlaceholder.pipe';
import { ADMIN_VIEW_PROFILE, UPDATE_PASSWORD } from '@constants/routes';
import { AppStateService } from '@services/app-state.service';
import { Subscription } from 'rxjs';
import { AdminProfileData } from '@interface/admin-profile.interface';
import { DateComponent } from '@shared/components/date/date.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { POPUP_MESSAGES } from '@constants/messages';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { ICONS } from '@enums/icons.enum';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    ImagePlaceholderPipe,
    DateComponent,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  //images URL path
  LOGOUT_ICON = ICONS.LOGOUT_ICON;
  PROFILE_ICON = ICONS.PROFILE_SVG;
  CHANGE_PASSWORD_ICON = ICONS.CHANGE_PASSWORD;
  RIGHT_ARROW_ICON = ICONS.RIGHT_ARROW;
  NOTIFICATION = ICONS.NOTIFICATION;

  sidenavService = inject(SidenavService);
  storageService = inject(StorageService);
  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(SnackbarService);
  profileService = inject(AppStateService);

  // profileDetail!: AdminProfileData;
  profileDetail = this.profileService.userProfileUpdate();
  profileSubscription!: Subscription;
  icons = ICONS;
  profile = computed(() =>
  this.profileService.userProfileUpdate().reduce((acc: any, item: { quantity: any; }) => acc + item, 0)
  )



  constructor(private _dialog: MatDialog) {}

  ngOnInit() {
    // this.profileSubscription = this.profileService.userProfileUpdate.subscribe(
    //   (response) => {
    //     this.profileDetail = response;
    //   }
    // );
  }

  ngAfterViewInit(): void {
    this.getProfileDetail();
  }
  navigationPanel() {
    this.sidenavService.toggleSidenav(true);
  }

  onMenuAction(route: string) {
    switch (route) {
      case 'profile':
        this.router.navigate([ADMIN_VIEW_PROFILE.fullUrl]);
        break;
      case 'password':
        this.router.navigate([UPDATE_PASSWORD.fullUrl]);
        break;
      default:
        this.router.navigate([ADMIN_VIEW_PROFILE.fullUrl]);
        break;
    }
  }
  /**
   * We will fetch profile detail of admin
   */
  getProfileDetail() {
    this.profileDetail = this.profileService.getUserProfile();
  }

  onLogout(): void {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: {
        title: POPUP_MESSAGES.confirm,
        headerText: POPUP_MESSAGES.logoutConfirmation,
        submitButtonText: DialogActionBtn.CONFIRM,
        cancelButtonText: DialogActionBtn.CANCEL,
        showTextBox: false,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.authService.logout();
      }
    });
  }

  // ngOnDestroy() {
  //   if (this.profileSubscription) {
  //     this.profileSubscription.unsubscribe();
  //   }
  // }
}
