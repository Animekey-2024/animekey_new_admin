import { Injectable, inject } from '@angular/core';
import { UtilityService } from './utility.service';
import { StorageKeys } from '@models/storage-keys.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * Save key to the Local Storage
   * @param key
   * @param value
   * @returns
   */
  saveToLocalStorage = (key: string, value: any) => {
    if (typeof value === 'object') {
      localStorage[key] = JSON.stringify(value);
      return;
    }
    localStorage.setItem(key, value);
  };

  /**
   * Get from Local Storage based on the key
   * @param key
   * @returns
   */
  getFromLocalStorage(key: string): any {
    if (localStorage[key]) {
      return localStorage[key] || 'null';
    } else {
      return false;
    }
  }

  /**
   * Removed key from Local Storage based on the key
   * @param key
   */
  removeFromLocalStorage(key: string): any {
    localStorage.removeItem(key);
  }

  /**
   * Clear Local Storage
   */
  clearStorage() {
    localStorage.clear();
    // this.appStateService.resetUserProfile();
  }
}
