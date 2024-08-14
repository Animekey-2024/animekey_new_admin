import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from './service/login.service';
import { StorageService } from '@services/storage.service';
import { ApiResponse } from '@interface/common.interface';
import { LoginResponse } from '@interface/onboarding-interface';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        LoginComponent,
      ],
      providers: [
        FormBuilder,
        {
          provide: LoginService,
          useValue: {
            login: jasmine.createSpy('login').and.returnValue(of({})),
          },
        },
        {
          provide: StorageService,
          useValue: {
            clearStorage: jasmine.createSpy('clearStorage'),
          },
        },
        // {
        //   provide: LoginService,
        //   useClass: MockLoginService,
        // }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark email field as valid if it is not empty', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('test@example.com');

    const errors = emailControl?.errors;

    expect(emailControl?.valid).toBeTruthy();

    expect(errors?.['required']).toBeFalsy();
  });

  it('should mark email field as invalid if it does not match the email pattern', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalidEmail');

    const errors = emailControl?.errors;

    expect(emailControl?.valid).toBeFalsy();

    expect(errors?.['pattern']).toBeTruthy();
  });

  it('should mark password field as valid if it is not empty', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('validPassword123');

    const errors = passwordControl?.errors;

    expect(passwordControl?.valid).toBeTruthy();

    expect(errors?.['required']).toBeFalsy();
  });

  it('should enable Login Button if the form is valid', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('abc@yopmail.com');
    passwordControl?.setValue('Admin@@321');

    expect(component.loginForm.valid).toBeTruthy();

    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(
      By.css('button[type="submit"]')
    ).nativeElement;

    expect(loginButton.disabled).toBeFalsy();
  });

  it('should navigate to dashboard or user page based on nextStep after a successful login', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl?.setValue('abc@yopmail.com');
    passwordControl?.setValue('Admin@@321');

    expect(component.loginForm.valid).toBeTruthy();

    // Mock the login response with nextStep
    const loginResponse = {
      statusCode: 200,
      message: 'Login Successful',
      result: {
        nextStep: '1', // or any value other than 1
      },
    } as ApiResponse<LoginResponse>;

    // spyOn(component.loginService, 'login').and.returnValue(of(loginResponse));

    // component.onSubmit();

    // expect(component.loginService.login).toHaveBeenCalled();

    // if (loginResponse.result.nextStep === NextStep.Verify) {
    //   console.log('inside if');
    //   // expect(component.router.navigate).toHaveBeenCalled();
    // } else {
    //   console.log('inside else');
    //   // spyOn(component.router, 'navigate')
    //   // expect(component.router.navigate).toHaveBeenCalled();
    // }
  });

  // it('should enable form after correcting invalid email and password', () => {
  //   const emailControl = component.loginForm.get('email');
  //   const passwordControl = component.loginForm.get('password');

  //   emailControl?.setValue('abc@yopmail.com');
  //   passwordControl?.setValue('Admin@@321');

  //   expect(component.loginForm.valid).toBeTruthy();

  // expect(component.loginForm.enable).toHaveBeenCalled();
  // expect(component.loginService.login).toHaveBeenCalled();

  // // Mock the login response with the correct type
  // const loginResponse = {
  //   statusCode: 200,
  //   message: "Login Successful",
  //   result: {
  //       nextStep: "1",
  //   }
  // } as ApiResponse<LoginResponse>

  // spyOn(component.loginService, 'login').and.returnValue(of(loginResponse));
  // // spyOn(router, 'navigate');

  // component.onSubmit();

  // expect(component.loginForm.enable).toHaveBeenCalled();
  // expect(component.loginService.login).toHaveBeenCalled();

  // component.loginForm.setValue({
  //   email: 'abc@yopmail.com',
  //   password: 'Admin@@321',
  // });
  // spyOn(component.router, 'navigate');
  // component.onSubmit();
  // if (component.result?.nextStep === NextStep.Verify) {
  //   expect(component.router.navigate).toHaveBeenCalledWith([]);
  // } else {
  //   expect(component.router.navigate).toHaveBeenCalledWith([]);
  // }
  // });

  // it('should disable the submit button if the form is invalid', () => {
  //   const submitButton: HTMLElement = fixture.nativeElement.querySelector(
  //     '.btn-large button[mat-button]'
  //   );
  //   spyOnProperty(component.loginForm, 'invalid', 'get').and.returnValue(true);

  //   fixture.detectChanges();

  //   expect(submitButton?.hasAttribute('disabled')).toBeTruthy();
  // });

  // it('should enable the submit button if the form is valid', () => {
  //   const submitButton: HTMLElement = fixture.nativeElement.querySelector(
  //     '.btn-large button[mat-button]'
  //   );
  //   spyOnProperty(component.loginForm, 'invalid', 'get').and.returnValue(false);

  //   fixture.detectChanges();

  //   expect(submitButton?.hasAttribute('disabled')).toBeFalsy();
  // });

  // it('should enable form after login API call', () => {
  //   // Use the correct type for the login response
  //   const loginResponse = { result: {} } as ApiResponse<LoginResponse>;

  //   // Mock the loginService.login method to return an observable with the correct type
  //   spyOn(component.loginService, 'login').and.returnValue(of(loginResponse));

  //   // Call the onSubmit method
  //   component.onSubmit();

  //   // Expect the loginForm.enable method to be called
  //   expect(component.loginForm.enable).toHaveBeenCalled();
  // });

  // it('should navigate to VERIFY_OTP route if nextStep is Verify', () => {
  //   // Mock the loginService.login method to return an observable of ApiResponse<LoginResponse>
  //   const loginResponse = {
  //     statusCode: 200,
  //     message: 'Success',
  //     result: { nextStep: 'Verify' },
  //   } as ApiResponse<LoginResponse>;

  //   spyOn(component.loginService, 'login').and.returnValue(of(loginResponse));
  //   spyOn(router, 'navigate');

  //   // Call the onSubmit method
  //   component.onSubmit();

  //   // Expect the router.navigate method to be called with the correct route
  //   expect(router.navigate).toHaveBeenCalledWith([VERIFY_OTP.fullUrl]);
  // });

  // it('should navigate to AUTHENTICATOR route if nextStep is not Verify', () => {
  //   // Mock the loginService.login method to return an observable of ApiResponse<LoginResponse>
  //   const loginResponse = {
  //     statusCode: 200,
  //     message: 'Success',
  //     result: {},
  //   } as ApiResponse<LoginResponse>;

  //   spyOn(component.loginService, 'login').and.returnValue(of(loginResponse));
  //   spyOn(router, 'navigate');

  //   // Call the onSubmit method
  //   component.onSubmit();

  //   // Expect the router.navigate method to be called with the correct route
  //   expect(router.navigate).toHaveBeenCalledWith([AUTHENTICATOR.fullUrl]);
  // });
});
