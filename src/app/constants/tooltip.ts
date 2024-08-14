export const RolesToolTip: any = {
  ROLES: TEXT('role'),
  CONTENT: TEXT('content'),
};

export function TEXT(val: string) {
  return {
    SHARE: `Share- Authorized users will be able to share ${val} with internal/external users.`,
    VIEW: `View- Authorized users will be able to view the ${val} list and details.`,
    ADD: `Add- Authorized users will be able to create ${val}.`,
    EDIT: `Edit- Authorized users will be able to edit ${val} details.`,
    STATUS: `Activate/Deactivate- Authorized users will be activate/deactivate ${val}.`,
    EDIT_EMAIL: `Edit Email - Authorized users will be able to edit email of users`,
  };
}
