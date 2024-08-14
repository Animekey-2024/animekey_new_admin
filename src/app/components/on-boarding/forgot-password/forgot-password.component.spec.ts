import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordService } from './service/forgot-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router: Router;
  let forgotPasswordService: ForgotPasswordService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ForgotPasswordComponent,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [ForgotPasswordService, MatSnackBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    forgotPasswordService = TestBed.inject(ForgotPasswordService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
    expect(component.forgotPasswordForm.controls['email'].value).toEqual('');
  });

  it('should set resetLinkLabel to "Send Password Reset Link" initially', () => {
    expect(component.resetLinkLabel).toEqual('Send Password Reset Link');
  });

  it('should enable Verify Button if the form is valid', () => {
    const emailControl = component.forgotPasswordForm.get('email');

    emailControl?.setValue('abc@yopmail.com');

    expect(component.forgotPasswordForm.valid).toBeTruthy();

    fixture.detectChanges();

    const verifyButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;
    expect(verifyButton.disabled).toBeFalsy();
  });

  it('should enable the form and update resetLinkLabel on successful password reset', () => {
    const response = { result: true } as any;
    spyOn(forgotPasswordService, 'forgotPassword').and.returnValue(
      of(response)
    );

    component.forgotPasswordForm.setValue({ email: 'test@example.com' });
    component.onSubmit();

    expect(component.forgotPasswordForm.enabled).toBeTruthy();
    expect(component.resetLinkLabel).toEqual('Resend Password Reset Link');
  });

  // it('should navigate to login page on backToLogin()', () => {
  //   spyOn(router, 'navigate');
  //   component.backToLogin();
  //   expect(router.navigate).toHaveBeenCalledWith(['/login']);
  // });
});
