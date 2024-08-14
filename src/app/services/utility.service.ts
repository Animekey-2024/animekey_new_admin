import { Injectable } from '@angular/core';
import { StorageKeys } from '../models/storage-keys.model';
import { Form } from '@angular/forms';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private _location: Location) {}

  routeBack() {
    this._location.back();
  }

  trim(data?: any) {
    for (const item in data) {
      if (typeof data[item] === 'string') {
        data[item] = data[item].trim();
      }
    }
    return data;
  }

  /**
   * Get current timezone of the system
   * @returns
   */
  getCurrentTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // Function to remove duplicates from the array
  // Function to remove duplicate objects
  removeDuplicateObjects(arr: any) {
    const uniqueObjects = arr.filter((obj: any, index: number, self: any) => {
      // Use JSON.stringify to compare the objects as strings
      // This method only works if the properties are in the same order for all objects.
      const objString = JSON.stringify(obj);
      return (
        index === self.findIndex((o: any) => JSON.stringify(o) === objString)
      );
    });

    return uniqueObjects;
  }

  // Function to compare objects by their properties (you can customize this based on your requirements)
  areObjectsEqual(obj1: any, obj2: any, duplicateKey: string) {
    return obj1[duplicateKey] !== obj2[duplicateKey];
  }
  /**
   * Function to create the new URL for the image uploading if there is already uploaded image and we are not updating
   * @param imageURL
   */
  generateNewURL(imageURL: string): string {
    if (imageURL) {
      const data = new URL(imageURL);
      return data.pathname.substring(1);
    }
    return '';
  }

  /**
   *
   * @param date date argument
   * @returns  returns in YYYY-MM-DD format
   */
  changeDateFormat(date: Date): string {
    const newDate = new Date(date);
    var year = newDate.getFullYear().toString();
    var month = (newDate.getMonth() + 101).toString().substring(1);
    var day = (newDate.getDate() + 100).toString().substring(1);
    return year + '-' + month + '-' + day;
  }

  /**
   * download csv here
   */

  downloadFile(data: string) {
    const link = document.createElement('a');
    link.href = 'data:attachment/csv,' + data;
    link.download = 'sample_import_zipcode.csv';
    link.click();
    link.remove();
  }

  /**
   * @indexFinder finds the index of the given string in array
   */

  indexFinder(data: string, dataArray: any) {
    let index = dataArray.findIndex((item: any) => item.key === data);
    if (index == -1) {
      index = 0;
    }
    return index;
  }

  /**
   * @createNameObject it will create the name object
   */
  createNameObject(firstName: string, lastName: string) {
    return {
      first: firstName,
      last: lastName,
    };
  }

  /**
   * @updateBodyBasedEdit it will update the body and return the updated body
   * @param body
   * @param form
   * @param data
   */
  updateBodyBasedEdit(body: any, form: Form, data: any) {
    return body;
  }

  /**
   * change object key name for drodown (in form of  name and value)
   * @param dataArray  data list array
   * @param renameByKey1  need to rename by name key
   * @param renameByKey2  need to rename by value key
   * @param renameToKey1  need to replace  by renameByKey1 key
   * @param renameToKey2 need to replace  by renameByKey2 key
   * @returns
   */

  changeObjectKeyName(
    dataArray: any,
    renameByKey1: string,
    renameByKey2: string,
    renameToKey1: string,
    renameToKey2: string
  ) {
    return dataArray.map((item: any) => ({
      ...item,
      [renameByKey1]: item[renameToKey1],
      [renameByKey2]: item[renameToKey2],
    }));
  }

  /**
   *
   * @param time time conversion into 12 hrs
   * @returns
   */
  convertTimeIn12Hrs(time: string) {
    return new Date('1970-01-01T' + time + 'Z').toLocaleTimeString('en-US', {
      timeZone: 'UTC',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  /**
   *
   * @param value convert hrs into minuts
   * @returns
   */
  convertHrsIntoMinuts(value: any) {
    let add12Hrs = 0;
    let splitTime = value.split(' ');
    if (splitTime[1] == 'PM') {
      add12Hrs = 12;
    }
    let separateHrsAndMinuts = splitTime[0].split(':');
    separateHrsAndMinuts[0] =
      splitTime[1] === 'AM' && separateHrsAndMinuts[0] == 12
        ? 0
        : separateHrsAndMinuts[0];
    return (
      (parseInt(separateHrsAndMinuts[0]) + add12Hrs) * 60 +
      parseInt(separateHrsAndMinuts[1])
    );
  }
  /**
   *
   * @param time12h time conversion from 12 hrs to 24 hrs
   * @returns
   */
  convertTime12to24(time12h: any) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours.padStart(2, 0), 10) + 12;
    }
    hours = hours.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    return `${hours}:${minutes}:00`;
  }

  /**
   * Get file extension from file
   * @param fileName
   * @returns
   */
  getFileExtension(fileName: string) {
    // Split the file name by periods and get the last element
    const parts = fileName.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    } else {
      return ''; // No extension found
    }
  }

  /**
   * Get file name without extension
   * @param fileName
   * @returns
   */
  getFileNameWithoutExtension(fileName: string): string {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return fileName.substring(0, lastDotIndex);
    } else {
      return fileName;
    }
  }
}
