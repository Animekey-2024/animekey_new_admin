export const TABLES = {
  SUB_ADMIN: [
    getColumnConfig('id', 'Sub Admin ID', 'id'),
    getColumnConfig(
      'subAdminName',
      'Name',
      'subAdminName',
      true,
      'pictureUrl',
      false
    ),
    getColumnConfig('email', 'Email ID', 'email'),
    // getColumnConfig('zone', 'Zone', 'zone'),
    getColumnConfig('role_access', 'Role & Access', 'role_access'),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, '', true),
    getColumnConfig('isActive', 'Status', 'isActive'),
    getColumnConfig('action', 'Action', ''),
  ],

  ROLE_TABLE: [
    getColumnConfig('id', 'Role ID', 'id'),
    getColumnConfig('title', 'Role Name', 'title', false, '', true),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, '', true),
    getColumnConfig('isActive', 'Status', 'isActive'),
    getColumnConfig('action', 'Action', ''),
  ],

  FAQ_TABLE: [
    getColumnConfig('title', 'Questions', 'title', false, '', false),
    getColumnConfig('updatedAt', 'Last updated', 'updatedAt', false, '', true),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, '', true),
    getColumnConfig('action', 'Action', ''),
  ],
  NOTIFICATION_TABLE: [
    getColumnConfig('id', 'Notification ID', 'id'),

    getColumnConfig('title', 'Title', 'title', false, '', false),
    getColumnConfig('platform', 'Recipient', 'platform', false, '', false),
    // getColumnConfig('recipient', 'Persona', 'recipient', false, '', false),
    getColumnConfig('createdAt', 'Added On', 'createdAt', false, '', false),
    getColumnConfig('action', 'Action', ''),
  ],

  VIDEO_LIST_TABLE: [
    getColumnConfig('id', 'Video ID', 'id', false),
    getColumnConfig('title', 'Title', 'title', false, '', false),
    getColumnConfig('contentType', 'Content Type', 'contentType', false),
    getColumnConfig('year', 'Year of release', 'year', false, '', false),
    getColumnConfig('genre', 'Genre', 'genre', false),
    getColumnConfig('isActive', 'Status', 'status' ,false, '', false),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, ''),
    getColumnConfig('action', 'Action', ''),
  ],

  VIDEO_SEASON_TABLE: [
    getColumnConfig('content', 'Season ID', 'content', false),
    getColumnConfig('title', 'Title', 'title', false, '', false),
    getColumnConfig('season', 'Season', 'season', false),
    getColumnConfig('episodes', 'Episodes', 'episodes', false, ''),
    getColumnConfig('isActive', 'Status', 'isLive'),
    getColumnConfig('action', 'Action', ''),
  ],

  VIDEO_EPISODE_TABLE: [
    getColumnConfig('id', 'Episode ID', 'id', false),
    getColumnConfig('title', 'Title', 'title', false, '', false),
    getColumnConfig('season', 'Season', 'season', false),
    getColumnConfig('episode', 'Episodes', 'episode', false),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, ''),
    getColumnConfig('isActive', 'Status', 'isLive'),
    getColumnConfig('action', 'Action', ''),
  ],

  USER_LIST_TABLE: [
    getColumnConfig('id', 'User ID', '_id', false),
    getColumnConfig('name', 'Name', 'name', false, '', false),
    getColumnConfig('email', 'Email', 'email', false, '' , false),
    getColumnConfig('isSubscribed', 'Subscription', 'isSubscribed', false, '', false),
    getColumnConfig('phone', 'Mobile No', 'phone', false),
    getColumnConfig('isActive', 'Status', 'isActive'),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, ''),
    getColumnConfig('action', 'Action', ''),
  ],

  CONTENT_TYPE_LIST: [
    getColumnConfig('id', 'Content Type ID', 'id', false),
    getColumnConfig('title', 'Title', 'title', false, '', false),
    getColumnConfig(
      'description',
      'Description',
      'description',
      false,
      '',
      false
    ),
    getColumnConfig('updatedBy', 'Updated By', 'updatedBy', false, ''),
    getColumnConfig('isActive', 'Status', 'isLive'),
    getColumnConfig('categories', 'Categories', 'categories', false, '', false),
    getColumnConfig('videos', 'Videos', 'videos', false, '', false),
    getColumnConfig('sortOrder', 'Order', 'sortOrder', false, '', false),
    getColumnConfig('action', 'Action', ''),
  ],

  CATEGORY_LIST: [
    getColumnConfig('id', 'Category ID', 'id', false),
    getColumnConfig('title', 'Title', 'name', false, '', false),
    getColumnConfig(
      'description',
      'Description',
      'description',
      false,
      '',
      false
    ),
    getColumnConfig(
      'contentType',
      'Content Types',
      'contentType',
      false,
      '',
      false
    ),
    getColumnConfig('createdOn', 'Created On', 'createdOn', false, ''),
    // getColumnConfig('updatedBy', 'Updated On', 'updatedOn', false, ''),
    getColumnConfig('isActive', 'Status', 'isActive'),
    // getColumnConfig('categories', 'Categories', 'categories', false, '', false),
    getColumnConfig('videos', 'Videos', 'videos', false, '', false),
    getColumnConfig('sortOrder', 'Order', 'order', false, '', false),
    getColumnConfig('action', 'Action', ''),
  ],
  PLAN_LIST_TABLE: [
    getColumnConfig('id', 'User ID', 'id', false),
    getColumnConfig('name', 'Name', 'name', false, '', false),
    getColumnConfig('country', 'Country', 'country', false, '' , false),
    getColumnConfig('billingFrequency', 'Billing Frequnecy', 'billingFrequency', false, '', false),
    getColumnConfig('isActive', 'Status', 'isActive'),
    getColumnConfig('createdAt', 'Created On', 'createdAt', false, ''),
    getColumnConfig('action', 'Action', ''),
  ],
};

export function getColumnConfig(
  key: string,
  name: string,
  dataKey: string,
  showWithImage: boolean = false,
  imageKey: string = '',
  isSortable = false,
  showWithImageRating: string = ''
) {
  return {
    key,
    name,
    dataKey,
    showWithImage,
    imageKey,
    isSortable,
    showWithImageRating,
  };
}
