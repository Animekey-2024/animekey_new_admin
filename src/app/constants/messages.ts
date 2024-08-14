export const POPUP_MESSAGES = {
  ok: 'Ok',
  close: 'Close',
  confirm: 'Confirmation',
  no: 'No',
  yes: 'Yes',
  cancel: 'Cancel',
  verify: 'Verify',
  save: 'Save',
  reset: 'Reset',
  passwordResetTitle: 'Reset Password',
  passwordResetLink:
    'Password reset link has been sent to registered email id . Please follow the link to reset password .',
  passwordChanged: 'Password has been changed successfully.',
  resetPassword: 'Password has been reset successfully.',
  logout: 'Logout',
  logoutConfirmation: 'Do you wish to logout?',
  forgotPasswordTitle:
    "Forgot Your Password? Don't worry send us your registered email address and we will send your steps to reset your password.",
  verifyPasswordTitle: 'Verify Password',
  verifyPasswordMessage: 'Enter your password',
  warningAdminSessionExpires:
    'To update, you need to enter your password',
  warningSubAdminSessionExpires:
    'To update, you need to enter your password.',
  resetContentFormTitle: `Reset`,
  resetAuthenticatorDescription:
    'To reset your authenticator you need to enter your password',
  updateDataConfirmation:
    'If you click on Cancel, the changes you made will be lost. Click on Update to make the changes.',
};

export const COMMON_MESSAGES = {
  ADDED: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been added successfully',
  UPDATED: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been updated successfully',
  RESET: (type: string, isUpperCase?: boolean) =>
    toTitleCase(type, isUpperCase) + ' has been reset successfully',
  BLOCKED: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to deactivate this ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deactivated successfully`,
  },

  ACTIVE: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to activate this ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been activated successfully`,
  },
  INACTIVE: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to deactivate this ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deactivated successfully`,
  },
  ACTIVATED: {
    title: (text: string) => `Activate ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer'
    ) =>
      `Are you sure you want to ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  DEACTIVATED: {
    title: (text: string) => `Deactivate ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer'
    ) =>
      `Are you sure you want to ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  DELETED: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to delete this ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been deleted successfully`,
  },

  DELETED_CONFIRMATION: {
    title: (text: string) => `${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer'
    ) =>
      `Are you sure you want to ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    finalConfirmation: `After confirming, the entire country's data will be lost.`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  VERIFY: {
    confirm: (type: string, isUpperCase?: boolean) =>
      `Do you want to verify this ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      }?`,
    success: (type: string, isUpperCase?: boolean) =>
      `${toTitleCase(type, isUpperCase)} has been verified successfully`,
  },

  CANCEL: {
    heading: 'Confirmation?',
    text: 'If you cancel, the changes you made are lost.Click on save option to make changes.',
  },

  UPDATE: {
    heading: (key: string) => `${key} Update`,
  },

  DATE_FILTER_DISCLAIMER:
    'The 7-day data will be displayed by default. To view more data, use the date filter.',

  DELETE_NOTIFICATION: {
    title: 'Delete Notification',
  },

  DELETE_NOTIFICATION_TEXT: {
    title: 'Are you sure you want to delete notification?',
  },

  DEACTIVATED_NOTIFICATION: {
    title: (text: string) => `Delete ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer',
      thisText: string = 'this'
    ) => `Are you sure you want to Delete Notification`,
    success: (type: string, isUpperCase?: boolean) =>
      `Notification has been successfully Delte`,
  },

  DELETE_VIDEO: {
    title: 'Delete Video',
  },

  DELETE_VIDEO_TXT: {
    title: 'Are you sure you want to delete Video?',
  },

  PUBLISH: {
    title: (text: string) => `Publish ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer'
    ) =>
      `Are you sure you want to ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },

  UNPUBLISH: {
    title: (text: string) => `Unpublish ${text}`,
    confirm: (
      type: string,
      isUpperCase?: boolean,
      module: string = 'customer'
    ) =>
      `Are you sure you want to ${isUpperCase ? type.toUpperCase() : type.toLowerCase()
      } this ${module}?`,
    success: (type: string, isUpperCase?: boolean) =>
      `Customer has been successfully ${toTitleCase(type, isUpperCase)}`,
  },
};

export const invalidImageError = (format = 'jpeg/png') =>
  `Only ${format} images are allowed`;

export const invalidFileSize = (size = 1) =>
  `File size can not be more than ${size} MB`;

export const ERROR_VALIDATION_MESSAGES = {
  CHECK_INTERNET_CONNECTION: 'Check your internet connection',
  NO_RESULT_FOUND: 'No result found',
  IMAGE_VALIDATION: (files: string, size: string) =>
    `${files} format are allowed with maximum size of ${size}`,
};

export const PERMISSION_DENIED = 'You do not have permission.';

export const toTitleCase = (str: string, isUpperCase?: boolean) => {
  return str.replace(/\w\S*/g, function (txt) {
    if (isUpperCase) {
      return txt.toUpperCase();
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
