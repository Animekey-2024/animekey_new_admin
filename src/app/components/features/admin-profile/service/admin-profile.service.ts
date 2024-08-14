import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { AdminProfileData } from '@interface/admin-profile.interface';
import { ApiResponse } from '@interface/common.interface';
import { HttpService } from '@services/http.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProfileService {

  username: string = 'ANK_USR';
  password: string = 'ANK_PWD';

  constructor(private httpService: HttpService) { }

  /**
   * Call the api to change the password
   * @param payload
   * @returns
   */
  updatePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }): Observable<ApiResponse> {
    return this.httpService.patch(API_URLs.CHANGE_PASSWORD, payload).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
  /**
   * Call the api to get the admin profile details
   * @returns
   */
  fetchAdminProfile(): Observable<ApiResponse<AdminProfileData>> {
    return this.httpService.get(API_URLs.ADMIN_PROFILE_DETAIL).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * Call the api to get the admin profile details
   * @returns
   */
  fetchUserPermission(): Observable<ApiResponse<unknown>> {
    return this.httpService.get(API_URLs.ADMIN_PERMISSIONS).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * Call the api to get the country codes
   * @returns
   */
  fetchCountryCodes(payload: any): Observable<ApiResponse> {

    const headers: {
      [name: string]: string | string[];
    } = {};
    headers['Authorization'] =
      'Basic ' + btoa(this.username + ':' + this.password);
    return this.httpService.get(API_URLs.COUNTRY_LIST, payload, false, headers).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
  /**
   * Call the api to update the admin profile details
   * @returns
   */
  patchAdminProfile(payload: any): Observable<ApiResponse> {
    return this.httpService.patch(API_URLs.ADMIN_PROFILE_DETAIL, payload).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * Call the api to update mfa of the admin profile details
   * @returns
   */
  resetAdminMFA(id: string): Observable<ApiResponse<boolean>> {
    return this.httpService.put(`${API_URLs.RESET_MFA}/${id}`, null).pipe(
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
}
