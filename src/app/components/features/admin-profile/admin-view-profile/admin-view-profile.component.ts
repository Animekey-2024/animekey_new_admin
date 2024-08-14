import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ImagePreviewComponent } from '@shared/components/image-preview/image-preview.component';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { ADMIN_EDIT_PROFILE, LOGIN } from '@constants/routes';
import { AppStateService } from '@services/app-state.service';
import { MatCardModule } from '@angular/material/card';
import { AdminProfileData } from '@interface/admin-profile.interface';
import { ImagePlaceholderPipe } from '../../../../shared/pipes/imagePlaceholder/imagePlaceholder.pipe';
import { POPUP_MESSAGES } from '@constants/messages';
import { IPopupData } from '@interface/verify-password.interface';
import { VerifyPasswordComponent } from '@shared/components/verify-password/verify-password.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AdminProfileService } from '../service/admin-profile.service';
import { SnackbarService } from '@services/snackbar.service';
import { StorageService } from '@services/storage.service';
import { OptionalFieldPipe } from '@shared/pipes/optional-field/optional-field.pipe';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { PERMISSIONS } from '@enums/permissions.enum';

@Component({
  selector: 'app-admin-view-profile',
  standalone: true,
  templateUrl: './admin-view-profile.component.html',
  styleUrls: ['./admin-view-profile.component.scss'],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    HeaderComponentComponent,
    MatButtonModule,
    ButtonComponent,
    ImagePreviewComponent,
    MatCardModule,
    ImagePlaceholderPipe,
    MatDialogModule,
    OptionalFieldPipe,
  ],
})
export class AdminViewProfileComponent implements OnInit {
  title = 'Admin Details';
  btnSlugs = BUTTON_SLUGS;
  // profileDetail!: AdminProfileData;

  #breadCrumbService = inject(BreadcrumbService);
  #profileService = inject(AppStateService);
  #adminProfileService = inject(AdminProfileService);
  #storageService = inject(StorageService);

  profileDetail = this.#profileService.userProfileUpdate();
  features = FEATURE_SLUGS;
  permissions = PERMISSIONS;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _toast: SnackbarService
  ) {}

  ngOnInit(): void {
    this.#breadCrumbService.routerEvents();
    // this.fetchProfileData();
  }

  // fetchProfileData() {
  //   this.profileDetail = this.#profileService.getUserProfile();
  // }

  onEdit(): void {
    this._router.navigate([ADMIN_EDIT_PROFILE.fullUrl]);
  }

  onResetAuthenticator() {
    const dialogData: IPopupData = {
      title: POPUP_MESSAGES.verifyPasswordTitle,
      message: POPUP_MESSAGES.resetAuthenticatorDescription,
      confirmButtonText: POPUP_MESSAGES.verify,
      cancelButtonText: POPUP_MESSAGES.cancel,
      from: 'viewProfile',
    };
    const dialogRef = this._dialog.open(VerifyPasswordComponent, {
      width: '30vw',
      data: dialogData,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.updateAuthenticator();
      }
    });
  }
  updateAuthenticator() {
    this.#adminProfileService
      .resetAdminMFA(this.#profileService.getUserID())
      .subscribe((response) => {
        this._toast.openSuccessToast(response.message);
        this.#storageService.clearStorage();
        this._router.navigate([LOGIN.fullUrl]);
      });
  }
}
