import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { VerifyCodeComponent } from './verify-code.component';
import { HttpService } from '@services/http.service';
import { StorageService } from '@services/storage.service';
import { AuthService } from '@services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { OtpVerificationService } from '@modules/on-boarding/otp-verfication/services/otp-verification.service';
import { ApiResponse } from '@interface/common.interface';
import { LoginResponse } from '@interface/onboarding-interface';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('VerifyCodeComponent', () => {
  let component: VerifyCodeComponent;
  let fixture: ComponentFixture<VerifyCodeComponent>;
  let router: Router;
  let storageService: StorageService;
  let verifyCodeService: OtpVerificationService;
  let httpService: HttpService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        VerifyCodeComponent,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        OtpVerificationService,
        HttpService,
        StorageService,
        AuthService,
        MatSnackBar,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyCodeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
    verifyCodeService = TestBed.inject(OtpVerificationService);
    httpService = TestBed.inject(HttpService);
    authService = TestBed.inject(AuthService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.verifyCodeForm.valid).toBeFalsy();
    expect(component.verifyCodeForm.controls['authenticator'].value).toEqual('');
    expect(component.verifyCodeForm.controls['otp'].value).toEqual('');
  });

  it('should call onVerify and navigate to "/" after successful verification', () => {
    spyOn(router, 'navigate');
    spyOn(verifyCodeService, 'verifyCode').and.returnValue(of(getMockApiResponse()));
    component.verifyCodeForm.setValue({ authenticator: 'mockAuth', otp: '123456' });
    component.onVerify();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call backToSetup and navigate to "/authenticator"', () => {
    spyOn(router, 'navigate');
    component.backToSetup();
    expect(router.navigate).toHaveBeenCalledWith(['/authenticator'], {
      queryParams: { qrCode: true },
    });
  });

  it('should enable Verify Button if the form is valid', () => {
    const otp = component.verifyCodeForm.get('otp');

    otp?.setValue('000000');

    expect(component.verifyCodeForm.valid).toBeTruthy();

    fixture.detectChanges();

    const verifyButton = fixture.debugElement.query(By.css('button[type="submit"')).nativeElement;

    expect(verifyButton.disabled).toBeFalsy();
  })

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
