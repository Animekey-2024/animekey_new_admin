import { PERMISSIONS } from '@enums/permissions.enum';

export interface GroupPermissions {
  SHARE: boolean;
  VIEW: boolean;
  ADD: boolean;
  EDIT: boolean;
  STATUS: boolean;
  EMAIL_EDIT: boolean;
  DELETE: boolean;
}

export class PermissionGroup {
  permissionId: string;
  slug!: string;
  title: string;
  isView!: boolean;
  isEdit!: boolean;
  isAdd!: boolean;
  isStatus!: boolean;
  isShare!: boolean;
  isAssign!: boolean;
  isEmail!: boolean;
  isEditChild!: boolean;
  isViewChild!: boolean;
  isDisabled?: boolean;
  permissions!: GroupPermissions;
  isManage?: boolean;
  isDelete?: boolean;
  isViewDisabled?: boolean;
  isViewAllDisabled?: boolean;
  options: string[];

  constructor(props: any, isEdit?: boolean) {
    this.permissionId = props.permissionId;
    this.slug = props.slug;
    this.title = props.title;
    this.isView = isEdit ? props.isView : props.isView ? false : undefined;
    this.isEdit = isEdit ? props.isEdit : props.isEdit ? false : undefined;
    this.isAdd = isEdit ? props.isAdd : props.isAdd ? false : undefined;
    this.isStatus = isEdit
      ? props.isStatus
      : props.isStatus
      ? false
      : undefined;
    this.isShare = isEdit ? props.isShare : props.isShare ? false : undefined;
    this.isAssign = isEdit
      ? props.isAssign
      : props.isAssign
      ? false
      : undefined;
    this.isEmail = isEdit ? props.isEmail : props.isEmail ? false : undefined;
    this.isEditChild = isEdit
      ? props.isEditChild
      : props.isEditChild
      ? false
      : undefined;
    this.isViewChild = isEdit
      ? props.isViewChild
      : props.isViewChild
      ? false
      : undefined;
    this.isDisabled = props.isDisabled;
    this.permissions = getPermissionConfig(props, isEdit);
    this.isManage = props.isManage;
    this.isDelete = isEdit
      ? props.isDelete
      : props.isDelete
      ? false
      : undefined;
    this.isViewDisabled = props.isViewDisabled;
    this.options = props.options;
    this.checkViewunAssignPermission();
  }

  assignEditPermission() {
    this.isEdit = true;
    this.isView = true;
    this.checkViewunAssignPermission();
  }

  unAssignEditPermission() {
    this.isEdit = false;
    this.checkViewunAssignPermission();
  }

  assignViewPermission() {
    this.isView = true;
  }

  assignViewAllPermission() {
    this.isViewChild = true;
  }

  assignEditAllPermission() {
    this.isEditChild = true;
  }

  unAssignViewAllPermission() {
    this.isViewChild = false;
  }

  unAssignEditAllPermission() {
    this.isEditChild = false;
  }

  unAssignDeleteAllPermission() {
    this.isDelete = false;
  }

  assignEditEmailPermission() {
    this.isEmail = true;
  }

  unAssignEditEmailPermission() {
    this.isEmail = false;
  }

  unAssignViewPermission() {
    this.isView = false;
  }

  assignAddPermission() {
    this.isAdd = true;
    this.isView = true;
    this.checkViewunAssignPermission();
  }

  unAssignDeletePermission() {
    this.isDelete = false;
    this.checkViewunAssignPermission();
  }

  assignDeletePermission() {
    this.isDelete = true;
    this.isView = true;
    this.checkViewunAssignPermission();
  }

  unAssignAddPermission() {
    this.isAdd = false;
    this.checkViewunAssignPermission();
  }

  assignStatusPermission() {
    this.isStatus = true;
    this.isView = true;
    this.checkViewunAssignPermission();
  }

  unAssignStatusPermission() {
    this.isStatus = false;
    this.checkViewunAssignPermission();
  }

  assignSharePermission() {
    this.isShare = true;
  }

  assignPermission() {
    this.isAssign = true;
  }

  unAssignSharePermission() {
    this.isShare = false;
  }

  unAssignPermission() {
    this.isAssign = false;
  }

  checkViewunAssignPermission() {
    if (this.isAdd || this.isEdit || this.isStatus || this.isDelete) {
      this.isViewDisabled = true;
      return;
    }
    this.isViewDisabled = false;
  }
}

export function getPermissionConfig(props: any, isEdit?: boolean) {
  if (!isEdit) {
    return {
      SHARE: props.isShare,
      VIEW: props.isView,
      ADD: props.isAdd,
      EDIT: props.isEdit,
      STATUS: props.isStatus,
      ASSIGN: props.isAssign,
      EMAIL_EDIT: props.isEmail,
      DELETE: props.isDelete,
    };
  } else
    return {
      SHARE: props.isShare !== null ? true : false,
      VIEW:
        props.isView !== null && props.options.includes(PERMISSIONS.VIEW)
          ? true
          : false,
      ADD:
        props.isAdd !== null && props.options.includes(PERMISSIONS.ADD)
          ? true
          : false,
      EDIT:
        props.isEdit !== null && props.options.includes(PERMISSIONS.EDIT)
          ? true
          : false,
      STATUS:
        props.isStatus !== null && props.options.includes(PERMISSIONS.STATUS)
          ? true
          : false,
      ASSIGN: props.isAssign !== null ? true : false,
      EMAIL_EDIT: props.isEmail !== null ? true : false,
      DELETE:
        props.isDelete !== null && props.options.includes(PERMISSIONS.DELETE)
          ? true
          : false,
    };
}
