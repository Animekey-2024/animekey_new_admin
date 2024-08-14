import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthenticatorComponent } from './authenticator.component';
import { LOGIN, VERIFY_CODE } from '@constants/routes';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';

fdescribe('AuthenticatorComponent', () => {
  let component: AuthenticatorComponent;
  let fixture: ComponentFixture<AuthenticatorComponent>;
  let router: Router;
  let authService: AuthService;
  let storageService: StorageService;
  let activatedRoute: ActivatedRoute;0

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        AuthenticatorComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ }) },
        },
        AuthService,
        StorageService,
        MatSnackBar
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticatorComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.authenticatorForm.valid).toBeFalsy();
    expect(component.authenticatorForm.controls['authenticator'].value).toEqual('');
    expect(component.authenticatorForm.controls['code'].value).toEqual('');
  });

  it('should set enableSetup2Factor to true initially', () => {
    expect(component.enableSetup2Factor).toBeTruthy();
  });

  it('should call setupAuthenticator and navigate to QR code screen', () => {
    spyOn(router, 'navigate');
    component.setupAuthenticator();
    expect(component.enableSetup2Factor).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith([], {
      queryParams: { qrCode: true },
    });
  });

  it('should call backToSetupAuthenticator and navigate back to Setup Authenticator screen', () => {
    spyOn(router, 'navigate');
    component.backToSetupAuthenticator();
    expect(component.enableSetup2Factor).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledWith([], {});
  });

  it('should call onSubmit and navigate to VERIFY_CODE.fullUrl', () => {
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith([VERIFY_CODE.fullUrl]);
  });

  it('should call backToLogin, navigate to LOGIN.fullUrl, and clear localStorage', () => {
    spyOn(router, 'navigate');
    spyOn(storageService, 'clearStorage');
    component.backToLogin();
    expect(router.navigate).toHaveBeenCalledWith([LOGIN.fullUrl]);
    expect(storageService.clearStorage).toHaveBeenCalled();
  });

  it('should call ngOnDestroy and unsubscribe from subscriptions', () => {
    spyOn(component.subscriptions[0], 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscriptions[0].unsubscribe).toHaveBeenCalled();
  });

  // Add more test cases as needed
});
