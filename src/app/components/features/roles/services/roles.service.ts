import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import { API_URLs } from '@constants/url';
import { ApiResponse } from '@interface/common.interface';
import {
  AddRolePayload,
  PermissionSearchData,
  PermissionSearchResult,
  RoleDetails,
  RolesList,
} from '@interface/roles.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private httpService: HttpService) {}

  /**
   * @description Get all the permission Listing from API
   * @returns
   */
  getPermissionsListing(): Observable<ApiResponse<PermissionSearchResult>> {
    return this.httpService.get(API_URLs.GET_PERMISSIONS).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * @description Get all Roles from API
   * @returns
   */
  getRoles(queryParams: any): Observable<ApiResponse<RolesList>> {
    return this.httpService.get(API_URLs.GET_ROLES, queryParams).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   * @description Get Roles By Id
   * @returns
   */
  getRoleDetailsByID(roleId: string): Observable<ApiResponse<RoleDetails>> {
    const endPoint = `${API_URLs.GET_ROLES_DETAILS}/${roleId}`;
    return this.httpService.get(endPoint);
  }

  /**
   * @description Create new role to call the API
   * @returns
   */
  createRoles(body: AddRolePayload): Observable<ApiResponse<string>> {
    return this.httpService.post(API_URLs.CREATE_ROLES, body);
  }

  /**
   * @description Update existing role by passing ID
   * @returns
   */
  updateRoles(
    id: string,
    roles: AddRolePayload
  ): Observable<ApiResponse<string>> {
    return this.httpService.patch(
      `${API_URLs.UPDATE_ROLES_DETAILS}/${id}`,
      roles
    );
  }

  roleBlockUnblock(id: string, isActive: boolean): Observable<ApiResponse> {
    let endPoint = API_URLs.ROLE_BLOCK_UNBLOCK;
    const body = { isActive: !isActive };
    return this.httpService.patch(`${endPoint}/${id}`, body).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
}
