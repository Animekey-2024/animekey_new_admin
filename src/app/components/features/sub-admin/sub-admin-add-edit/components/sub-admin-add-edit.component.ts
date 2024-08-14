import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Regex } from '@constants/regex';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorComponent } from '@shared/components/error/error.component';
import { InputErrorPipe } from '@shared/pipes/input-error/input-error.pipe';
import { ImageUploaderComponent } from '@shared/components/image-uploader/image-uploader.component';
import { HeaderComponentComponent } from '@shared/components/header-component/header-component.component';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from '@shared/components/breadcrumb/breadcrumb.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ERROR_VALIDATION_MESSAGES,
  invalidImageError,
  invalidFileSize,
  POPUP_MESSAGES,
} from '@constants/messages';
import { SUB_ADMIN } from '@constants/routes';
import { API_URLs } from '@constants/url';
import { VALIDATION_CRITERIA } from '@constants/validation-criteria';
import { BUTTON_SLUGS } from '@enums/button-slugs';
import { UPLOAD_ACTION_TYPE } from '@enums/upload-action.enum';
import { IPopupData } from '@interface/verify-password.interface';
import { AppStateService } from '@services/app-state.service';
import { FileUploadService } from '@services/file-upload.service';
import { SnackbarService } from '@services/snackbar.service';
import { UtilityService } from '@services/utility.service';
import { VerifyPasswordComponent } from '@shared/components/verify-password/verify-password.component';
import { LabelTextComponent } from '@shared/components/label-text/label-text.component';
import { EmailComponent } from '@shared/components/email/email.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonSelectComponent } from '@shared/components/common-select/common-select.component';
import { SubAdminService } from '../../service/sub-admin.service';
import { DialogActionBtn } from '@enums/dialog-btn.enum';
import { ConfirmComponent } from '@shared/dialogs/confirm/confirm.component';
import { InputRefDirective } from '@shared/directives/InputRefDirective/input-ref.directive';
import { Subscription } from 'rxjs';
import { SubAdminAdd } from '@interface/sub-admin-interface';
import { RolesService } from '@components/features/roles/services/roles.service';
import { AdminProfileService } from '@components/features/admin-profile/service/admin-profile.service';
import { COUNTRIES } from '@components/features/admin-profile/data';

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
];

@Component({
  selector: 'app-sub-admin-add-edit',
  standalone: true,
  imports: [
    CommonModule,
    ...materials,
    ImageUploaderComponent,
    BreadcrumbComponent,
    LabelTextComponent,
    EmailComponent,
    ButtonComponent,
    CommonSelectComponent,
    InputRefDirective,
  ],
  templateUrl: './sub-admin-add-edit.component.html',
  styleUrls: ['./sub-admin-add-edit.component.scss'],
})
export class SubAdminAddEditComponent implements OnInit, OnDestroy {
  subAdminProfileForm!: FormGroup;
  canEdit = false;
  editMode = true;
  imageFile!: File;
  profilePicURL = '';
  selectedPictureURL = '';
  profileDetail: any = {};
  country_codes: any = [];
  roles: any = [];
  btnSlugs = BUTTON_SLUGS;
  imageFileEvent!: Event;
  imageErrorText = ERROR_VALIDATION_MESSAGES.IMAGE_VALIDATION(
    'JPEG,PNG,JPG',
    '1 MB'
  );
  allowedFormats: string[] = ['jpeg', 'png', 'jpg'];
  submitDisabled: boolean = false;

  #formBuilder = inject(FormBuilder);
  #breadCrumbService = inject(BreadcrumbService);

  validationCriteria = VALIDATION_CRITERIA;
  @Input() subAdminId: string = '';
  loggedInSubAdminId: string = '';
  isLoggedInUser: boolean = false;
  isEdit: boolean = false;
  subscription: Subscription[] = [];
  fileName = '';

  constructor(
    private _fileUploadService: FileUploadService,
    private _dialog: MatDialog,
    private _adminProfileService: AdminProfileService,
    private _rolesService: RolesService,
    private _subAdminService: SubAdminService,
    private _toastService: SnackbarService,
    private _utilityService: UtilityService,
    private _router: Router,
    private _appStateService: AppStateService,
  ) { }

  ngOnInit(): void {
    this.loggedInSubAdminId = this._appStateService.getUserID();
    if (this.subAdminId) {
      if (this.loggedInSubAdminId === this.subAdminId) {
        this.isLoggedInUser = true;
      } else {
        this.isLoggedInUser = false;
      }
      this.isEdit = true;
      this.submitDisabled = true;
      this.getSubAdminData(this.subAdminId);
    }
    this.createForm();
    this.getCountryCodes();
    this.getRoles();
    this.#breadCrumbService.routerEvents();
  }

  /**
   * @function createForm
   * Used to create the Edit profile form
   */
  createForm(): void {
    this.subAdminProfileForm = this.#formBuilder.group({
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
      email: ['', Validators.compose([Validators.pattern(Regex.email)])],
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
        { value: '', disabled: this.isLoggedInUser },
        Validators.compose([Validators.required]),
      ],
    });
    this.subscription.push(
      this.subAdminProfileForm
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
  getCountryCodes(): void {
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
   * @function getSubAdminData
   * Used to get the sub admin data from the Sub admin service and patch the value in form.
   */
  async getSubAdminData(id: string) {
    await this._subAdminService.getSubAdminProfile(id).subscribe((response) => {
      this.profileDetail = response.result;
      this.subAdminProfileForm.patchValue({
        firstName: this.profileDetail?.name?.first,
        lastName: this.profileDetail?.name?.last,
        email: this.profileDetail?.email,
        phoneNumber: this.profileDetail?.phoneNumber,
        countryCode: this.profileDetail?.countryCode,
        pictureUrl: this.profileDetail?.avatar,
        role: this.profileDetail?.role?._id,
      });
      /**
       * @function generateNewURL - is used to create the uploading image path from the given image URL from api response.
       * @param avatar - image URL coming from API
       */
      this.profilePicURL = this._utilityService.generateNewURL(
        this.profileDetail?.avatar
      );
    });
  }

  /**
   * @description This function is called when user change profile pic. Save that file
   * @param event
   */
  async onFileSelect(event: { file: File; base64: string, fileName: string }): Promise<void> {
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
   * @description it will check the edit condition and calls the function according to the add or edit form
   */
  addEditSubAdminProfile(): void {
    if (this.subAdminProfileForm.invalid) return;
    this.isEdit ? this.subAdminEditConfirmation() : this.updateQueryData();
  }

  /**
   * Upload Image using signed URL
   */
  async uploadImage(): Promise<void> {
    if (this.imageFile) {
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
   * sets up payload for add or update sub admin accordingly
   * @param body
   */
  async updateQueryData(): Promise<void> {
    await this.uploadImage();
    const controls = this.subAdminProfileForm.controls['value'];
    const body = {
      avatar: this.profilePicURL || '',
      ...this.subAdminProfileForm.value,
    };

    body['name'] = this._utilityService.createNameObject(
      this.subAdminProfileForm.get('firstName')?.value,
      this.subAdminProfileForm.get('lastName')?.value
    );

    if (body.name.first && body.name.last) {
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

    if (
      this.subAdminProfileForm.get('email')?.value == this.profileDetail.email
    ) {
      delete body.email;
    }

    if (
      this.subAdminProfileForm.get('phoneNumber')?.value ==
      this.profileDetail.phoneNumber
    ) {
      delete body.phoneNumber;
    }

    // if (
    //   this.subAdminProfileForm.get('countryCode')?.value ==
    //   this.profileDetail.countryCode
    // ) {
    //   delete body.countryCode;
    // }

    // if (
    //   this.subAdminProfileForm.get('countryCode')?.value ==
    //   this.profileDetail.countryCode
    // ) {
    //   delete body.countryCode;
    // }

    if (
      this.subAdminProfileForm.get('role')?.value ==
      this.profileDetail?.role?._id
    ) {
      delete body.role;
    }

    if (body.phoneNumber === '' || body.countryCode === '') {
      delete body.phoneNumber;
      delete body.countryCode;
    }

    this.isEdit
      ? this.editSubAdminProfile(body)
      : this.addSubAdminProfile(body);
  }

  /**
   * creates new sub admin
   * @param body : SubAdminAdd
   */
  addSubAdminProfile(body: SubAdminAdd): void {
    this._subAdminService.addSubAdmin(body).subscribe({
      next: (data) => {
        this._toastService.openSuccessToast(data?.message);
        this._router.navigate([SUB_ADMIN.fullUrl]);
      },
      error: (err) => {
        this.subAdminProfileForm.enable();
        this.profilePicURL = this.selectedPictureURL;
      },
    });
  }

  /**
   * opens confirmation dialog box to save the changes made to existing sub admin details
   */
  subAdminEditConfirmation(): void {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      data: {
        title: POPUP_MESSAGES.confirm,
        headerText: POPUP_MESSAGES.updateDataConfirmation,
        submitButtonText: DialogActionBtn.UPDATE,
        cancelButtonText: DialogActionBtn.CANCEL,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        if (
          this.subAdminProfileForm.get('email')?.value !=
          this.profileDetail.email ||
          this.subAdminProfileForm.get('phoneNumber')?.value !=
          this.profileDetail.phoneNumber ||
          this.subAdminProfileForm.get('role')?.value != this.profileDetail.role
        ) {
          this.onVerifyPassword();
        }
      }
    });
  }

  /**
   * edits sub admin detail by passing body  as a parameter from "updateQueryData" method
   * @param body : SubAdminAdd
   */
  editSubAdminProfile(body: SubAdminAdd): void {
    this._subAdminService.editSubAdmin(this.subAdminId, body).subscribe({
      next: (data) => {
        this._toastService.openSuccessToast(data?.message);
        this._router.navigate([SUB_ADMIN.fullUrl]);
      },
      error: (err) => {
        this.subAdminProfileForm.enable();
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
    this.subAdminProfileForm.get(control)?.patchValue(value);
    this.onValueChange();
  }

  /**
   * opens verify password component before updating sub admin details
   */
  onVerifyPassword(): void {
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
        //this.subAdminProfileForm.disable();
        this.updateQueryData();
      }
    });
  }

  /**
   * returns if subAdminId doesn't exists
   * assigns submitDisabled true/false after comparing values of form &  fetched response data
   * even if one value is not same then submitDisabled is false else true
   * @returns
   */
  onValueChange(): void {
    if (!this.subAdminId) return;
    if (
      this.subAdminProfileForm.get('firstName')?.value !=
      this.profileDetail.name.first
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.subAdminProfileForm.get('lastName')?.value !=
      this.profileDetail.name.last
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.subAdminProfileForm.get('phoneNumber')?.value !=
      this.profileDetail.phoneNumber
    ) {
      this.submitDisabled = false;
      return;
    }
    if (
      this.subAdminProfileForm.get('countryCode')?.value !=
      this.profileDetail.countryCode
    ) {
      this.submitDisabled = false;
      this.onCountryCodeChange();
      return;
    }

    if (
      this.subAdminProfileForm.get('role')?.value != this.profileDetail.role._id
    ) {
      this.submitDisabled = false;
      return;
    }

    if (
      this.subAdminProfileForm.get('email')?.value != this.profileDetail.email
    ) {
      this.submitDisabled = false;
      return;
    }

    if (!this.profilePicURL || this.selectedPictureURL) {
      if (
        this.selectedPictureURL !=
        this.subAdminProfileForm.get('pictureUrl')?.value
      ) {
        this.submitDisabled = false;
        return;
      }
    }
    this.submitDisabled = true;
  }

  /**
   * fetches all roles
   */
  getRoles(): void {
    this._rolesService
      .getRoles({ page: 1, limit: 100, isActive: true })
      .subscribe((response) => {
        this.roles = response.result.data.map((data) => {
          return {
            name: data.title,
            value: data._id,
          };
        });
      });
  }

  /**
   * set/unset validators to country code on value change/unchange of phone number respectively
   */
  onPhoneNumberChange(): void {
    this.subAdminProfileForm.get('phoneNumber')?.value
      ? this.subAdminProfileForm
        .get('countryCode')
        ?.setValidators([Validators.required])
      : this.subAdminProfileForm.get('countryCode')?.setValidators([]);
    this.subAdminProfileForm.get('countryCode')?.updateValueAndValidity();
  }

  /**
   * adds validators to phoneNumber according country code value
   */
  onCountryCodeChange(): void {
    this.subAdminProfileForm.controls['countryCode'].value
      ? this.subAdminProfileForm.controls['phoneNumber'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.minLength(VALIDATION_CRITERIA.phoneMinLength),
          Validators.maxLength(VALIDATION_CRITERIA.phoneMaxLength),
          Validators.pattern(Regex.numberOnly),
        ])
      )
      : this.subAdminProfileForm.controls['phoneNumber'].setValidators([]);
    this.subAdminProfileForm.controls['phoneNumber'].updateValueAndValidity();
  }

  /**
   * navigates back to sub admin list
   */
  onCancel() {
    this._router.navigate([SUB_ADMIN.fullUrl]);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
