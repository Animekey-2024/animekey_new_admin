export const ERROR_TOASTS = {
  FILE_SIZE_EXCEED(size: any, errorKey: string) {
    return `${errorKey} size should not exceed ${size / 1024} MB`;
  },

  FILE_SIZE_EXCEED_IN_KB(size: any) {
    return `Maximum ${size} KB file can be uploaded`;
  },
  NOT_VALID_FORMAT(formats: any) {
    return `Only ${formats.join(', ')} file(s) allowed`;
  },
  MAX_UPLOADS(number: any) {
    return `Maximum ${number} files can be uploaded`;
  },
  NO_ACCESS(text: string) {
    return `You do not have permission to access this ${text} `;
  },
  ONE_VALID_VALUE_REQUIRED:
    'At-least one active value is required in dropdown list',
  SELECT_ONE_PERMISSION: 'Select at least one permission to proceed',
  ADD_INSPECTION_COMMENT:
    'Please add comments for this inspection and then proceed',
  ERROR_VALIDATING_COMPONENTS:
    'Required fields has empty or invalid data, check your input and try again',
  INTERNAL_SERVER_ERROR: 'Something went wrong',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  ACCESS_PERMISSION_DENIED: 'You do not have permission to access',
  INTERNET_NOT_CONNECTED: 'Internet not connected',
};

// Success Toast messages
export const SUCCESS_TOASTS = {
  restLinkShared: `Password reset link shared again`,
  USER_ADDED(orgName: any) {
    return `User Added Successfully. Details of the user has been added to the ${orgName} Organization`;
  },
  CSV_UPLOADED_SUCCESSFULLY: 'CSV uploaded successfully',

  PROFILE_UPDATED_SUCCESSFULLY: 'Profile updated successfully',
  LOGOUT_SUCCESSFULLY: 'Logout Successfully',
  LOGIN_SUCCESSFULLY: 'Login Successfully',
  MARKED_AS_ACTIVE: 'Marked as Active',
  MARKED_AS_INACTIVE: 'Marked as Inactive',
  NO_DATA: 'No Data',
};

export const WarningToasts = {
  UPLOADING_FILES: 'Please wait while the files are being uploaded',
  UPLOAD_IN_PROGRESS: 'File upload is in progress, please wait...',
};
