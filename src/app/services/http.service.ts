import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '@models/storage-keys.model';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  userInfo: any;
  httpClient = inject(HttpClient);
  storageService = inject(StorageService);
  loaderService = inject(LoaderService);
  url = '';

  setHeaders(customHeaders?: any) {
    this.userInfo = this.storageService.getFromLocalStorage('userInfo');
    let headers = new HttpHeaders();
    // if (this.userInfo) {
    //   headers = headers.append('Authorization', `${StorageKeys.TOKEN} `);
    // }
    if (customHeaders) {
      Object.keys(customHeaders).forEach((header) => {
        headers = headers.append(header, customHeaders[header]);
      });
    }
    return headers;
  }

  get(endpoint: string, query?: any, loader = true, headers?: any) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }

    this.url = environment.baseUrl;

    return this.httpClient.get<any>(`${this.url}/${endpoint}`, {
      headers: this.setHeaders(headers),
      params: query,
    });
  }

  post(endpoint: string, data?: any, loader = true, headers?: any) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }
    this.url = environment.baseUrl;

    return this.httpClient.post<any>(
      `${this.url}/${endpoint}`,
      this.trimSpaces(data),
      {
        headers: this.setHeaders(headers),
      }
    );
  }

  patch(endpoint: string, data: any, loader = true, headers?: any) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }

    return this.httpClient.patch<any>(
      `${environment.baseUrl}/${endpoint}`,
      // data
      this.trimSpaces(data),
      {
        headers: this.setHeaders(headers),
      }
    );
  }

  put(endpoint: string, data: any, loader = true, headers?: any) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }

    return this.httpClient.put<any>(
      `${environment.baseUrl}/${endpoint}`,
      this.trimSpaces(data),
      {
        headers: this.setHeaders(headers),
      }
    );
  }

  delete(endpoint: string, query?: any, loader = true, headers?: any) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }

    return this.httpClient.delete(`${environment.baseUrl}/${endpoint}`, {
      headers: this.setHeaders(headers),
      params: query,
    });
  }

  trimSpaces(data: any) {
    if (data) {
      Object.keys(data).forEach((key: string) => {
        if (data[key] && typeof data[key] === 'object') {
          this.trimSpaces(data[key]);
        }
        if (typeof data[key] === 'string') {
          data[key] = data[key].trim();
        }
      });
    }
    return data;
  }

  deleteSession(endpoint: string, loader = true) {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }

    let headers = new HttpHeaders();
    headers = headers.append('device-id', '0');
    return this.httpClient.delete(`${environment.baseUrl}/${endpoint}`, {
      headers: headers,
    });
  }

  downloadCSV(endpoint: string, loader = true): Observable<any> {
    if (loader) {
      this.loaderService.showLoader.next(loader);
    }
    return this.httpClient.get<any>(`${environment.baseUrl}/${endpoint}`, {
      responseType: 'text' as 'json',
    });
  }
}
