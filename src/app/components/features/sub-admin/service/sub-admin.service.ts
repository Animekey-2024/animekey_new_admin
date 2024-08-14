import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { ApiResponse, BLOCK_UNBLOCK_BODY } from '@interface/common.interface';
import {
  SubAdminAdd,
  SubAdminDetail,
  SubAdminListingResponse,
} from '@interface/sub-admin-interface';
import { HttpService } from '@services/http.service';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubAdminService {
  constructor(private httpService: HttpService) {}

  /**
   * Call the Login API to validate the credentials
   * @param payload
   * @returns
   */
  subAdminList(obj?: any, platform?: string): Observable<ApiResponse<SubAdminListingResponse>> {
    return this.httpService
      .get(API_URLs.SUB_ADMIN, obj)
      .pipe(tap((response) => {}));
  }

  /**
   * 
   * @param id : string
   * @param body : BLOCK_UNBLOCK_BODY
   * @returns activates/deactivates sub admin
   */
  subAdminBlockUnblock(
    id: string,
    body: BLOCK_UNBLOCK_BODY
  ): Observable<ApiResponse<boolean>> {
    return this.httpService
      .patch(`${API_URLs.SUB_ADMIN_BLOCK_UNBLOCK}/${id}`, body)
      .pipe(tap((response) => {}));
  }

  /**
   * 
   * @param id : string
   * @returns sub admin profile details
   */
  getSubAdminProfile(id: string): Observable<ApiResponse<SubAdminDetail>> {
    return this.httpService
      .get(`${API_URLs.SUB_ADMIN}/${id}`)
      .pipe(tap((response) => {}));
  }

  /**
   * 
   * @param body :SubAdminAdd
   * @returns creates new sub admin to sub admin list
   */
  addSubAdmin(body: SubAdminAdd): Observable<ApiResponse<string>> {
    return this.httpService
      .post(`${API_URLs.SUB_ADMIN}`, body)
      .pipe(tap((response) => {}));
  }

  /**
   * 
   * @param id : string
   * @param body : SubAdminAdd
   * @returns edits existing sub admin profile details
   */
  editSubAdmin(id: string, body: SubAdminAdd): Observable<ApiResponse<string>> {
    return this.httpService.patch(`${API_URLs.SUB_ADMIN}/${id}`, body).pipe();
  }

  /**
   * Call the api to update the sub-admin profile details
   * @returns
   */
  resetAdminMFA(id: string): Observable<ApiResponse<boolean>> {
    return this.httpService.put(`${API_URLs.RESET_MFA}/${id}`, null).pipe();
  }
}
