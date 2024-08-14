import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';

import { ResetPasswordComponent } from './reset-password.component';
import { SnackbarService } from '@services/snackbar.service';
import { LOGIN, LINK_EXPIRED } from '@constants/routes';
import { ResetPasswordService } from './service/reset-password.service';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ApiResponse } from '@interface/common.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

fdescribe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let router: Router;
  let resetPasswordService: ResetPasswordService;
  let snackBarService: SnackbarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ResetPasswordComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { token: 'someToken' } } },
        },
        ResetPasswordService,
        SnackbarService,
        HttpClient,
        MatSnackBar,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    resetPasswordService = TestBed.inject(ResetPasswordService);
    snackBarService = TestBed.inject(SnackbarService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.resetPasswordForm.valid).toBeFalsy();
    expect(component.resetPasswordForm.controls['newPassword'].value).toEqual(
      ''
    );
    expect(
      component.resetPasswordForm.controls['confirmPassword'].value
    ).toEqual('');
  });

  it('should mark password as valid when strength is checked', () => {
    expect(component.isPassValid).toBeFalsy();
    component.markPasswordValid(true);
    expect(component.isPassValid).toBeTruthy();
  });

  it('should disable Reset Password Button if the form is invalid', () => {
    const newPassword = component.resetPasswordForm.get('newPassword');
    const confirmPassword = component.resetPasswordForm.get('confirmPassword');

    // Set passwords to be invalid
    newPassword?.setValue('Short'); // Assuming this is an invalid password
    confirmPassword?.setValue('Mismatch'); // Assuming this is an invalid confirmation

    fixture.detectChanges();

    // Use waitForAsync to wait for asynchronous operations to complete
    fixture.whenStable().then(() => {
      const resetPasswordButton = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;

      // Log the button's disabled property

      expect(component.resetPasswordForm.invalid).toBeTruthy();
      expect(resetPasswordButton.disabled).toBeTruthy();
    });
  });

  // it('should enable Reset Password Button if the form is valid', () => {
  //   const newPassword = component.resetPasswordForm.get('newPassword');
  //   const confirmPassword = component.resetPasswordForm.get('confirmPassword');

  //   // Set passwords to be valid
  //   newPassword?.setValue('ValidPassword123');
  //   confirmPassword?.setValue('ValidPassword123');

  //   fixture.detectChanges();

  //   // Use waitForAsync to wait for asynchronous operations to complete
  //   fixture.whenStable().then(() => {
  //     const resetPasswordButton = fixture.debugElement.query(
  //       By.css('button[type="submit"]')
  //     ).nativeElement;

  //     // Log the button's disabled property
  //     console.log('Button Disabled:', resetPasswordButton.disabled);

  //     expect(component.resetPasswordForm.valid).toBeTruthy();
  //     expect(resetPasswordButton.disabled).toBeFalsy();
  //   });
  // });

  it('should call onSubmit and reset password successfully', () => {
    spyOn(resetPasswordService, 'resetPassword').and.returnValue(
      of({ message: 'Password reset successfully' } as ApiResponse<unknown>)
    );
    spyOn(snackBarService, 'openSuccessToast');
    spyOn(router, 'navigate');

    component.resetPasswordForm.controls['newPassword'].setValue(
      'newPassword123'
    );
    component.resetPasswordForm.controls['confirmPassword'].setValue(
      'newPassword123'
    );

    component.onSubmit();

    expect(component.resetPasswordService.resetPassword).toHaveBeenCalled();
    expect(snackBarService.openSuccessToast).toHaveBeenCalledWith(
      'Password reset successfully'
    );
    expect(router.navigate).toHaveBeenCalledWith([LOGIN.fullUrl]);
  });

  // it('should call onSubmit and handle link expiration error', () => {
  //   spyOn(resetPasswordService, 'resetPassword').and.throwError(
  //     new HttpErrorResponse({ error: { statusCode: 410 } })
  //   );
  //   spyOn(snackBarService, 'openSuccessToast');
  //   spyOn(router, 'navigate');

  //   component.resetPasswordForm.controls['newPassword'].setValue(
  //     'newPassword123'
  //   );
  //   component.resetPasswordForm.controls['confirmPassword'].setValue(
  //     'newPassword123'
  //   );

  //   component.onSubmit();

  //   expect(component.resetPasswordService.resetPassword).toHaveBeenCalled();
  //   expect(router.navigate).toHaveBeenCalledWith([LINK_EXPIRED.fullUrl]);
  // });
});
