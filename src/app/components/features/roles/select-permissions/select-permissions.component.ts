import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { PermissionGroup } from '@models/permission-groups.model';
import { RolesToolTip } from '@constants/tooltip';

const materials = [MatCheckboxModule, MatIconModule, MatCheckboxModule];

@Component({
  selector: 'app-select-permissions',
  standalone: true,
  imports: [CommonModule, ...materials],
  templateUrl: './select-permissions.component.html',
  styleUrls: ['./select-permissions.component.scss'],
})
export class SelectPermissionsComponent {
  readonly toolTip = RolesToolTip;
  permissionGroups: PermissionGroup[] = [];
  @Input() set permissions(val: PermissionGroup[]) {
    this.permissionGroups = val;
    this.markSelectAllEditStatus();
    this.markSelectAllViewStatus();
    this.markSelectAllAddStatus();
    this.markSelectAllActionStatus();
    this.markSelectAllDeleteStatus();
  }
  allEditPermissionsSelected = false;
  allAddPermissionsSelected = false;
  allViewPermissionsSelected = false;
  allActiveDeactivatePermissionsSelected = false;
  allDeletePermissionsSelected = false;


  constructor() {}

  ngOnInit(): void {}

  selectAllEdit(ev: any) {
    this.permissionGroups.forEach((group: PermissionGroup) => {
      if (!group.isDisabled) {
        if (ev.checked) {
          group.assignEditPermission();
          group.assignSharePermission();
          group.assignPermission();
          group.assignEditAllPermission();
        } else {
          group.unAssignEditAllPermission();
          group.unAssignEditPermission();
          group.unAssignSharePermission();
          group.unAssignPermission();
        }
      }
    });
    this.markSelectAllEditStatus();
    this.markSelectAllViewStatus();
    this.markSelectAllAddStatus();
    this.markSelectAllDeleteStatus();
  }

  selectAllView(ev: any) {
    this.permissionGroups.forEach((group: PermissionGroup) => {
      if (!group.isDisabled) {
        if (ev.checked) {
          group.assignViewPermission();
          group.assignSharePermission();
          group.assignPermission();
          group.assignViewAllPermission();
        } else {
          group.unAssignViewPermission();
          group.unAssignSharePermission();
          group.unAssignPermission();
          group.unAssignViewAllPermission();
        }
      }
    });
    this.markSelectAllViewStatus();
  }

  selectAllAdd(ev: any) {
    this.permissionGroups.forEach((group: PermissionGroup) => {
      if (!group.isDisabled) {
        if (ev.checked) {
          group.assignAddPermission();
        } else {
          group.unAssignAddPermission();
        }
      }
    });
    this.markSelectAllAddStatus();
    this.markSelectAllViewStatus();
  }

  selectAllDelete(ev: any) {
    this.permissionGroups.forEach((group: PermissionGroup) => {
      if (!group.isDisabled) {
        if (ev.checked) {
          group.assignDeletePermission();
        } else {
          group.unAssignDeletePermission();
        }
      }
    });
    this.markSelectAllDeleteStatus();
    this.markSelectAllViewStatus();
  }

  selectAllActionStatus(ev: any) {
    this.permissionGroups.forEach((group: PermissionGroup) => {
      if (!group.isDisabled) {
        if (ev.checked) {
          group.assignStatusPermission();
        } else {
          group.unAssignStatusPermission();
        }
      }
    });
    this.markSelectAllActionStatus();
    this.markSelectAllViewStatus();
  }

  markSelectAllEditStatus() {
    const allPermissions: PermissionGroup[] = this.permissionGroups.filter(
      (group: PermissionGroup) => group?.permissions?.EDIT
    );
    this.allEditPermissionsSelected = allPermissions.every(
      (group) => group.isEdit
    );
  }
  
  markSelectAllDeleteStatus() {
    const allPermissions: PermissionGroup[] = this.permissionGroups.filter(
      (group: PermissionGroup) => group?.permissions?.DELETE
    );
    this.allDeletePermissionsSelected = allPermissions.every(
      (group) => group.isDelete
    );
  }

  markSelectAllViewStatus() {
    const allPermissions: PermissionGroup[] = this.permissionGroups.filter(
      (group: PermissionGroup) => group?.permissions?.VIEW
    );
    this.allViewPermissionsSelected = allPermissions.every(
      (group) => group.isView
    );
  }

  markSelectAllAddStatus() {
    const allPermissions: PermissionGroup[] = this.permissionGroups.filter(
      (group: PermissionGroup) => group?.permissions?.ADD
    );
    this.allAddPermissionsSelected = allPermissions.every(
      (group) => group.isAdd
    );
  }

  markSelectAllActionStatus() {
    const allPermissions: PermissionGroup[] = this.permissionGroups.filter(
      (group: PermissionGroup) => group?.permissions?.STATUS
    );
    this.allActiveDeactivatePermissionsSelected = allPermissions.every(
      (group) => group.isStatus
    );
  }

  assignWritePermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignEditPermission();
    } else {
      group.unAssignEditPermission();
    }
    this.markSelectAllEditStatus();
    this.markSelectAllViewStatus();
  }

  assignEditEmailPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignViewPermission();
      group.assignEditEmailPermission();
    } else {
      group.unAssignEditEmailPermission();
    }
    this.markSelectAllViewStatus();
  }

  assignViewPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignViewPermission();
    } else {
      group.unAssignEditPermission();
      group.unAssignViewPermission();
      group.unAssignEditEmailPermission();
      group.unAssignViewAllPermission();
    }
    this.markSelectAllViewStatus();
  }

  assignAddPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignAddPermission();
    } else {
      group.unAssignAddPermission();
    }
    this.markSelectAllAddStatus();
    this.markSelectAllViewStatus();
  }

  assignDeletePermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignDeletePermission();
    } else {
      group.unAssignDeletePermission();
    }
    // this.markSelectAllAddStatus();
    this.markSelectAllViewStatus();
  }

  assignActionPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignStatusPermission();
    } else {
      group.unAssignStatusPermission();
    }
    this.markSelectAllActionStatus();
    this.markSelectAllViewStatus();
  }

  assignSharePermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.assignSharePermission();
    } else {
      group.unAssignSharePermission();
    }
  }

  assignPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.isAssign = true;
    } else {
      group.isAssign = false;
    }
  }

  assignEditAllPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.isEditChild = true;
      group.assignEditPermission();
      group.assignViewAllPermission();
    } else {
      group.isEditChild = false;
    }
  }

  assignViewAllPermission(ev: any, group: PermissionGroup) {
    if (ev.checked) {
      group.isViewChild = true;
      group.assignViewPermission();
    } else {
      group.isViewChild = false;
      group.unAssignEditAllPermission();
    }
  }

  getPermissions() {
    return this.permissionGroups.slice();
  }
}
