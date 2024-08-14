import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { OtpVerificationComponent } from './otp-verification.component';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { OtpVerificationService } from './services/otp-verification.service';
import { ApiResponse } from '@interface/common.interface';
import { LoginResponse } from '@interface/onboarding-interface';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('OtpVerificationComponent', () => {
  let component: OtpVerificationComponent;
  let fixture: ComponentFixture<OtpVerificationComponent>;
  let router: Router;
  let otpVerificationService: OtpVerificationService;
  let httpService: HttpService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        OtpVerificationComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      providers: [
        OtpVerificationService,
        HttpService,
        StorageService,
        AuthService,
        MatSnackBar,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpVerificationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    otpVerificationService = TestBed.inject(OtpVerificationService);
    httpService = TestBed.inject(HttpService);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.otpVerificationForm.valid).toBeFalsy();
    expect(component.otpVerificationForm.controls['otp'].value).toEqual('');
  });

  it('should call onVerify and navigate to "/" after successful verification', () => {
    spyOn(router, 'navigate');
    spyOn(otpVerificationService, 'verifyCode').and.returnValue(
      of(getMockApiResponse())
    );
    component.otpVerificationForm.setValue({ otp: '123456' });
    component.onVerify();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should enable Verify Button if the form is valid', () => {
    const otp = component.otpVerificationForm.get('otp');

    otp?.setValue('000000');

    expect(component.otpVerificationForm.valid).toBeTruthy();

    fixture.detectChanges();

    const verifyButton = fixture.debugElement.query(
      By.css('button[type="submit"')
    ).nativeElement;

    expect(verifyButton.disabled).toBeFalsy()
  });

  // it('should call backToSetup and navigate to "/login"', () => {
  //   spyOn(router, 'navigate');
  //   component.backToSetup();
  //   expect(router.navigate).toHaveBeenCalledWith(jasmine.arrayContaining(['/login']));
  // });

  // Mock API response for successful verification
  function getMockApiResponse(): ApiResponse<any> {
    return {
      statusCode: 200,
      message: 'Verification successful',
      result: {
        authToken: 'mockAuthToken',
        refreshToken: 'mockRefreshToken',
      },
    };
  }
});
