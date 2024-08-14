import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { ImagePreviewComponent } from '@shared/components/image-preview/image-preview.component';
import { ImagePlaceholderPipe } from '@shared/pipes/imagePlaceholder/imagePlaceholder.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { COMMON_MESSAGES, POPUP_MESSAGES } from '@constants/messages';
import { SUB_ADMIN_EDIT } from '@constants/routes';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { IPopupData } from '@interface/verify-password.interface';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { VerifyPasswordComponent } from '@shared/components/verify-password/verify-password.component';
import { SubAdminService } from '../service/sub-admin.service';
import { SubAdminDetail } from '@interface/sub-admin-interface';
import { DateComponent } from '@shared/components/date/date.component';
import { StatusComponent } from '@shared/components/status/status.component';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { SnackbarService } from '@services/snackbar.service';
import { AppStateService } from '@services/app-state.service';
import { OptionalFieldPipe } from '@shared/pipes/optional-field/optional-field.pipe';
import { CheckPermissionDirective } from '@shared/directives/check-permission/check-permission.directive';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { PERMISSIONS } from '@enums/permissions.enum';

@Component({
  selector: 'app-sub-admin-view-profile',
  standalone: true,
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
    DateComponent,
    StatusComponent,
    OptionalFieldPipe,
    CheckPermissionDirective,
  ],
  templateUrl: './sub-admin-view-profile.component.html',
  styleUrls: ['./sub-admin-view-profile.component.scss'],
})
export class SubAdminViewProfileComponent {
  title = 'Sub Admin Details';
  btnSlugs = BUTTON_SLUGS;
  features = FEATURE_SLUGS;
  permissions = PERMISSIONS;
  subAdminProfileDetail!: SubAdminDetail;
  @Input() subAdminId: string = '';
  loggedInUserId: string = '';

  #breadCrumbService = inject(BreadcrumbService);
  #subAdminService = inject(SubAdminService);

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _toast: SnackbarService,
    private _profileService: AppStateService
  ) {}

  ngOnInit(): void {
    this.#breadCrumbService.routerEvents();
    this.fetchSubAdminProfileData();
    this.loggedInUserId = this._profileService.getUserID();
  }

  async fetchSubAdminProfileData() {
    await this.#subAdminService
      .getSubAdminProfile(this.subAdminId)
      .subscribe((response) => {
        this.subAdminProfileDetail = response.result;
      });
  }

  /**
   * navigates to sub admin edit page
   */
  onSubAdminEdit(): void {
    this._router.navigate([`${SUB_ADMIN_EDIT.fullUrl}/${this.subAdminId}`]);
  }

  /**
   * resets MFA for user if it is not set up
   */
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

  /**
   *
   * @param data change action here from listing page of specific sub admin
   */
  changeAction(data: { isActive: boolean }): void {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: {
        title: data.isActive
          ? COMMON_MESSAGES.DEACTIVATED.title('Sub Admin')
          : COMMON_MESSAGES.ACTIVATED.title('Sub Admin'),
        headerText: data.isActive
          ? COMMON_MESSAGES.DEACTIVATED.confirm(
              'Deactivate',
              false,
              'sub admin'
            )
          : COMMON_MESSAGES.ACTIVATED.confirm('Activate', false, 'sub admin'),

        submitButtonText: DialogActionBtn.CONFIRM,
        cancelButtonText: DialogActionBtn.CANCEL,
        showTextBox: false,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.#subAdminService
          .subAdminBlockUnblock(this.subAdminId, {
            blockUnblockReason: confirmed.reason,
            isActive: !data.isActive,
          })
          .subscribe((response) => {
            this.fetchSubAdminProfileData();
            this._toast.openSuccessToast(response.message);
          });
      }
    });
  }

  updateAuthenticator() {
    this.#subAdminService
      .resetAdminMFA(this.subAdminId)
      .subscribe((response) => {
        this.fetchSubAdminProfileData();
        this._toast.openSuccessToast(response.message);
      });
  }
}
