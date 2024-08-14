import { formatDate } from '@angular/common';
import { dateFormatEnum } from '@enums/date-format.enum';

export class SubAdminModel {
  subAdminName = '';
  id = '';
  email = '';
  isActive;
  createdAt;
  pictureUrl = '';
  locale = 'en-US';
  _id = '';
  role_access = '';

  constructor(data: any) {
    const name = [];
    if (data.name) {
      if (data.name.first) {
        name.push(data.name.first);
      }
      if (data.name.last) {
        name.push(data.name.last);
      }
    }
    this.subAdminName = name.length ? name.join(' ') : 'N/A';
    this.id = `${data.id}`;
    this.email = data.email ? data.email : '';
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.role_access = data.role ? data.role.title : 'N/A';
    (this._id = data?._id),
      (this.pictureUrl =
        data.avatar && data.avatar.trim() != '' ? data.avatar : '');
  }
}
