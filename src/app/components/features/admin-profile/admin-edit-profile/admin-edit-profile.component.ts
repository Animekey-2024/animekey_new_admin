import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorComponent } from '@shared/components/error/error.component';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Regex } from '@constants/regex';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { FileUploadService } from '@services/file-upload.service';
import { IPopupData } from '@interface/verify-password.interface';
import { VerifyPasswordComponent } from '@shared/components/verify-password/verify-password.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ERROR_VALIDATION_MESSAGES,
  POPUP_MESSAGES,
  invalidFileSize,
  invalidImageError,
} from '@constants/messages';
import { AppStateService } from '@services/app-state.service';
import { AdminProfileService } from '../service/admin-profile.service';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UPLOAD_ACTION_TYPE } from '@enums/upload-action.enum';
import { API_URLs } from '@constants/url';
import { Subscription } from 'rxjs';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { EmailComponent } from '@shared/components/email/email.component';
import { SnackbarService } from '@services/snackbar.service';
import { UtilityService } from '@services/utility.service';
import { Router } from '@angular/router';
import { ADMIN_VIEW_PROFILE } from '@constants/routes';
import { VALIDATION_CRITERIA } from '@constants/validation-criteria';
import { AdminProfileData } from '@interface/admin-profile.interface';
import { CommonSelectComponent } from '@shared/components/common-select/common-select.component';
import { InputRefDirective } from '@shared/directives/InputRefDirective/input-ref.directive';
import { AllowOnlyNumericDirective } from '@shared/directives/allow-number-only/allow-only-numeric.directive';
import { COUNTRIES } from '../data';

const materials = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule,
  ErrorComponent,
  InputErrorPipe,
  HeaderComponentComponent,
  AllowOnlyNumericDirective,
];
@Component({
  selector: 'app-admin-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ...materials,
    BreadcrumbComponent,
    ImageUploaderComponent,
    ButtonComponent,
    LabelTextComponent,
    EmailComponent,
    CommonSelectComponent,
    MatDialogModule,
    InputRefDirective,
  ],
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.scss'],
})
export class AdminEditProfileComponent implements OnInit {
  title = 'Edit Profile';
  editProfileForm!: FormGroup;
  canEdit = false;
  editMode = true;
  imageFile!: File;
  profilePicURL = '';
  selectedPictureURL = '';

  country_codes: any = [];
  roles: any;
  btnSlugs = BUTTON_SLUGS;
  imageFileEvent!: Event;
  editProfileSubscription!: Subscription;
  imageErrorText = ERROR_VALIDATION_MESSAGES.IMAGE_VALIDATION(
    'JPEG,PNG,JPG',
    '1 MB'
  );
  allowedFormats = ['jpeg', 'png'];
  submitDisabled = true;
  subscription: Subscription[] = [];

  #formBuilder = inject(FormBuilder);
  #breadCrumbService = inject(BreadcrumbService);
  #profileService = inject(AppStateService);

  profileDetail = this.#profileService.userProfileUpdate();

  validationCriteria = VALIDATION_CRITERIA;
  fileName = '';

  constructor(
    private _fileUploadService: FileUploadService,
    private _dialog: MatDialog,
    private _profileService: AppStateService,
    private _adminProfileService: AdminProfileService,
    private _toastService: SnackbarService,
    private _utilityService: UtilityService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCountryCodes();
    this.getAdminProfile();
    this.#breadCrumbService.routerEvents();
  }

  /**
   * @function createForm
   * Used create the Edit profile form
   */
  createForm() {
    this.editProfileForm = this.#formBuilder.group({
      pictureUrl: [''],
      firstName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.name),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.name),
        ]),
      ],
      email: [
        { value: '', disabled: this.editMode },
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.email),
        ]),
      ],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
          Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength),
          Validators.pattern(Regex.numberOnly),
        ]),
      ],
      countryCode: [''],

      role: [
        { value: '', disabled: this.editMode },
        Validators.compose([Validators.required]),
      ],
    });
    this.subscription.push(
      this.editProfileForm
        .get('countryCode')!
        .valueChanges.subscribe((control) => {
          this.onCountryCodeChange();
        })
    );
  }

  /**
   * @function getCountryCodes
   * Used to get the country codes from API
   */
  getCountryCodes() {
    const payload = {
      page: 1,
      limit: 500,
    };
    this._adminProfileService
      .fetchCountryCodes(payload)
      .subscribe((response) => {
        if (response?.result) {
          let data: any = response?.result;
          this.country_codes = data.data.map(
            (item: {
              id: string;
              name: string;
              flag: string;
              code: string;
            }) => ({
              value: item.code,
              name: `(${item.code}) ${item.name}`,
            })
          );
        }
      });
  }

  /**
   * @function getAdminProfile
   * Used to get the profile data from the AppStateService and patch the value in form.
   */
  getAdminProfile() {
    // this.profileDetail = this._profileService.getUserProfile();
    this.editProfileForm.patchValue({
      firstName: this.profileDetail?.name?.first,
      lastName: this.profileDetail?.name?.last,
      email: this.profileDetail?.email,
      phoneNumber: this.profileDetail?.phoneNumber,
      countryCode: this.profileDetail?.countryCode,
      pictureUrl: this.profileDetail?.avatar,
      role: this.profileDetail?.role?._id,
    });
    this.editProfileForm.get('email')?.disable();

    /**
     * @function generateNewURL - is used to create the uploading image path from the given image URL from api response.
     * @param avatar - image URL coming from API
     */
    this.profilePicURL = this._utilityService.generateNewURL(
      this.profileDetail?.avatar
    );
  }

  /**
   * @description This function is called when user change profile pic. Save that file
   * @param event
   */
  async onFileSelect(event: { file: File; base64: string; fileName: string }): Promise<void> {
    try {
      this.imageFile = event?.file;
      this.fileName = event?.fileName;
      this.profilePicURL = event?.base64 as string;
      this.selectedPictureURL = event?.base64 as string;
      this.onValueChange();
    } catch (err: any) {
      if (err.type) {
        this._toastService.openWarningToast(invalidImageError());
      } else if (err.size) {
        this._toastService.openWarningToast(invalidFileSize());
      }
    }
  }

  /**
   * @description First upload the profile picture then edit the profile
   */
  async editProfile(): Promise<void> {
    if (this.editProfileForm.invalid) return;
    if (
      this.editProfileForm.get('email')?.value != this.profileDetail.email ||
      this.editProfileForm.get('phoneNumber')?.value !=
      this.profileDetail.phoneNumber
    ) {
      this.onVerifyPassword();
    } else {
      await this.uploadImage();
      this.updateAdminProfile();
    }
  }

  /**
   * Upload Image using signed URL
   */
  async uploadImage(): Promise<void> {
    if (this.imageFile) {
      console.log(this.imageFile);
      const response = await this._fileUploadService.getSignedUrl(
        this.imageFile,
        UPLOAD_ACTION_TYPE.ADMIN_PROFILE,
        API_URLs.FILE_UPLOAD,
        this.fileName
      );
      const preSignedUrl = response.result as {
        name: string;
        path: string;
        url: string;
      };
      const fileType = this.imageFile.type;
      if (preSignedUrl) {
        const result = await this._fileUploadService.fileUploadToS3(
          preSignedUrl.url,
          this.imageFile,
          fileType
        );
        if (result.status === 200) {
          this.profilePicURL = preSignedUrl?.path;
        } else {
          this.profilePicURL = '';
        }
      }
    }
  }

  /**
   * Update profile
   * @param body
   */
  updateAdminProfile(): void {
    const body = {
      avatar: this.profilePicURL || '',
      ...this.editProfileForm.value,
    };

    const name = {
      first: this.editProfileForm.get('firstName')?.value,
      last: this.editProfileForm.get('lastName')?.value,
    };

    body['name'] = name;

    if (name.first && name.last) {
      delete body.firstName;
      delete body.lastName;
    }
    if (
      this.profilePicURL === '' ||
      this.profilePicURL == null ||
      body.avatar
    ) {
      delete body.pictureUrl;
    }

    // if (
    //   this.editProfileForm.get('phoneNumber')?.value ==
    //   this.profileDetail.phoneNumber
    // ) {
    //   delete body.phoneNumber;
    // }
    // if (
    //   ( this.editProfileForm.get('countryCode')?.value ==
    //   this.profileDetail.countryCode ) || !this.editProfileForm.get('phoneNumber')?.value
    // ) {
    //   delete body.countryCode;
    // }
    delete body.email;

    if (!body.phoneNumber && body.countryCode) {
      body.countryCode = '';
    }
    this._profileService.userProfileUpdate.set(body);

    this.editProfileForm.disable();
    this.editProfileSubscription = this._adminProfileService
      .patchAdminProfile(body)
      .subscribe({
        next: (data) => {
          this._toastService.openSuccessToast(data?.message);
          this._profileService.saveUserProfile(data.result as AdminProfileData);
          this._router.navigate([ADMIN_VIEW_PROFILE.fullUrl]);
        },
        error: (err) => {
          this.editProfileForm.enable();
          this.editProfileForm.get('email')?.disable();
          this.profilePicURL = this.selectedPictureURL;
        },
      });
  }

  /**
   *
   * @param value set value of a field
   * @param control according to the its control name
   */
  setValue(value: string, control: string) {
    this.editProfileForm.get(control)?.patchValue(value);
    this.onValueChange();
  }

  /**
   * verifies password before editing admin details
   */
  onVerifyPassword() {
    const dialogData: IPopupData = {
      title: POPUP_MESSAGES.verifyPasswordTitle,
      message: POPUP_MESSAGES.warningAdminSessionExpires,
      confirmButtonText: POPUP_MESSAGES.verify,
      cancelButtonText: POPUP_MESSAGES.cancel,
      from: 'editProfile',
    };
    const dialogRef = this._dialog.open(VerifyPasswordComponent, {
      width: '30vw',
      data: dialogData,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        //wait for the image upload
        await this.uploadImage();
        this.updateAdminProfile();
      }
    });
  }

  /**
   * assigns submitDisabled true/false after comparing values of form &  fetched response data
   * even if one value is not same then submitDisabled is false else true
   * @returns
   */
  onValueChange() {
    if (
      this.editProfileForm.get('firstName')?.value !=
      this.profileDetail.name.first
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.editProfileForm.get('lastName')?.value !=
      this.profileDetail.name.last
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.editProfileForm.get('phoneNumber')?.value !=
      this.profileDetail.phoneNumber
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.editProfileForm.get('countryCode')?.value !=
      this.profileDetail.countryCode
    ) {
      this.submitDisabled = false;
      this.onCountryCodeChange();
      return;
    }
    this.onPhoneNumberChange();

    if (!this.profilePicURL || this.selectedPictureURL) {
      if (
        this.selectedPictureURL != this.editProfileForm.get('pictureUrl')?.value
      ) {
        this.submitDisabled = false;
        return;
      }
    }
    this.submitDisabled = true;
  }

  /**
   * set/unset validators to country code on value change/unchange of phone number respectively
   */
  onPhoneNumberChange() {
    this.editProfileForm.get('phoneNumber')?.value
      ? this.editProfileForm
        .get('countryCode')
        ?.setValidators([Validators.required])
      : this.editProfileForm.get('countryCode')?.setValidators([]);
    this.editProfileForm.get('countryCode')?.updateValueAndValidity();
  }

  onCountryCodeChange() {
    this.editProfileForm.controls['countryCode'].value
      ? this.editProfileForm.controls['phoneNumber'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
          Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength),
          Validators.pattern(Regex.numberOnly),
        ])
      )
      : this.editProfileForm.controls['phoneNumber'].setValidators([]);
    this.editProfileForm.controls['phoneNumber'].updateValueAndValidity();
  }

  /**
   * navigates back to view profile page
   */
  onCancel() {
    this._router.navigate([ADMIN_VIEW_PROFILE.fullUrl]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
