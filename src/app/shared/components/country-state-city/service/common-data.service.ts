import { Injectable } from '@angular/core';
import { API_URLs } from '@constants/url';
import { CityListingResponse, StateListingResponse } from '@interface/zipcode.interface';

import { HttpService } from '@services/http.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  ApiResponse,
  CountryListingResponse,
} from 'src/app/interface/common.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonDataService {
  constructor(private _httpService: HttpService) {}

  /**
   *
   * @returns fetch country list here....
   */

  countryList(): Observable<ApiResponse<CountryListingResponse[]>> {
    const obj = {
      isLive: true,
    };
    return this._httpService.get(`${API_URLs.COUNTRY}`, obj).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   *
   * @returns fetch state list here....
   */

  stateList(obj: {
    countryId: string;
  }): Observable<ApiResponse<StateListingResponse[]>> {
    const newObj = {
      ...obj,
      ...{
        limit: 2000,
      },
    };
    return this._httpService.get(`${API_URLs.STATE}`, newObj).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }

  /**
   *
   * @returns fetch city list here....
   */

  cityList(obj: {
    countryId: string;
    stateId: string;
  }): Observable<ApiResponse<CityListingResponse[]>> {
    const newObj = {
      ...obj,
      ...{
        limit: 2000,
      },
    };
    return this._httpService.get(API_URLs.CITY, newObj).pipe(
      tap((response) => {}),
      catchError((er) => {
        throw throwError(() => er.error);
      })
    );
  }
}
