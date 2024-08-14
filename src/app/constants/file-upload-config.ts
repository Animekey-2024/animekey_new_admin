export const FileUploadConfig = {
  ALLOWED_IMAGE_FORMATS: ['jpg', 'png', 'jpeg', 'gif', 'jfif'],
  ALLOWED_VIDEO_FORMATS: [
    'mp4',
    'wmv',
    'mov',
    'flv',
    'vob',
    'm4z',
    'mkv',
    'avi',
    '3gp',
    'mpg',
    'mxf',
    'HLS Feed',
  ],
  ALLOWED_CSV_FORMATS: ['xlsx', 'xls', 'csv'],
  ACCEPT_IMAGE_ONLY: 'image/*',
  ACCEPT_VIDEO_ONLY: 'video/*',
  ACCEPT_CSV_ONLY: '.csv',
  IMAGE_MAX_SIZE_IN_KB: 5120,
  VIDEO_MAX_SIZE_IN_KB: 51200,
  CSV_MAX_SIZE_IN_KB: 15000,
  IMAGES_MAXLENGTH: 100,
  VIDEOS_MAXLENGTH: 20,
};

export const FILE_TYPE = {
  VIDEO: 'video',
  IMAGE: 'image',
  CSV: 'csv',
};
