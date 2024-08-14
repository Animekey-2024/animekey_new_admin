/**
 * Static class to contain all the url constants.
 */
const VERSION = 'v1';
const ACCOUNTS = 'accounts';
const SESSIONS = 'sessions';
const PASSWORDS = 'passwords';
const PERMISSIONS = 'permissions';
const CUSTOMERS = 'customers';
const ADMINS = 'admins';
const ADMIN = 'admin';
const CMS = 'cms';
const CONTENTS = 'content';
const FAQ = 'faq';
const DRIVERS = 'drivers';
const ROLES = 'roles';
const BOOKING = 'bookings';
const RIDES = 'rides';
const COUNTRIES = 'countries';
const CATEGORYID = 'categoryId';

export class API_URLs {
  // accounts

  // passwords

  // sessions
  // static readonly REFRESH = `auth/${VERSION}/${SESSIONS}/refresh`;
  // static readonly LOGOUT = `auth/${VERSION}/${SESSIONS}/logout`;
  // permissions
  static readonly PERMISSIONS = `user/${VERSION}/${PERMISSIONS}`;
  // static readonly GET_PERMISSIONS = `user/${VERSION}/${PERMISSIONS}/search`;
  static readonly VALIDATE_TOKEN = (token: string) =>
    `admins/check-link?token=${token}`;

  // customers
  static readonly CUSTOMERS = `user/${VERSION}/${CUSTOMERS}`;
  static readonly CUSTOMER_DETAIL = `user/${VERSION}/${CUSTOMERS}/profile`;
  static readonly CUSTOMER_BLOCK_UNBLOCK = `user/${VERSION}/${CUSTOMERS}/profile/action`;

  // content management system
  static readonly CONTENTS_FETCH = `${CONTENTS}/${VERSION}/${CMS}/search`;
  static readonly CONTENTS_UPDATE = `${CONTENTS}/${VERSION}/${CMS}/`;

  //content management system >> FAQ
  static readonly GET_FAQ = `${CONTENTS}/${VERSION}/${FAQ}`;
  static readonly GET_FAQ_DETAILS = `${CONTENTS}/${VERSION}/${FAQ}`;
  static readonly ADD_FAQ = `${CONTENTS}/${VERSION}/${FAQ}`;
  static readonly UPDATE_FAQ_DETAILS = `${CONTENTS}/${VERSION}/${FAQ}`;
  static readonly DELETE_FAQ = `${CONTENTS}/${VERSION}/${FAQ}`;

  //country codes
  static readonly COUNTRY_CODES = `location/${VERSION}/countries`;

  //pre-signed url
  static readonly PRESIGNED_URL = `auth/${VERSION}/upload/get-signed-url`;

  // country
  static readonly COUNTRY = `locations/${VERSION}/countries/search`;

  // state
  static readonly STATE = `locations/${VERSION}/countries/states`;

  // city
  static readonly CITY = `locations/${VERSION}/countries/states/cities`;

  // Zip code
  static readonly ZIPCODE_ADD = `locations/${VERSION}/zipcodes`;
  static readonly ZIPCODE_DETAIL = `locations/${VERSION}/zipcodes/details`;
  static readonly ZIPCODE_LIST = `locations/${VERSION}/zipcodes/search`;
  static readonly ZIPCODE_TEMPLATE = `locations/${VERSION}/zipcodes/template`;

  // drivers
  static readonly DRIVERS = `user/${VERSION}/${DRIVERS}`;
  static readonly DRIVER_DETAIL = `user/${VERSION}/${DRIVERS}/profile`;
  static readonly DRIVER_BLOCK_UNBLOCK = `user/${VERSION}/${DRIVERS}/profile/action`;

  // Zone management
  static readonly DRIVERS_LIST_STATS = `user/${VERSION}/${DRIVERS}/analytics`;

  // Zone manegment
  static readonly ZONE_ADD_LIST = `locations/${VERSION}/zones`;
  static readonly ZONE_ACTIVATE = `locations/${VERSION}/zones/activate`;
  static readonly ZONE_DEACTIVATE = `locations/${VERSION}/zones/deactivate`;



  // Fare estimate management
  static readonly FARE_LIST = `${BOOKING}/${VERSION}/fares`;
  static readonly FARE_CATEGORY = `${BOOKING}/${VERSION}/categories`;
  static readonly FARE_LOCATION_PLACES = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

  // Live Country Management
  // static readonly COUNTRY_LIST = `locations/${VERSION}/${COUNTRIES}`;
  static readonly COUNTRY_DETAILS = `locations/${VERSION}/${COUNTRIES}/search`;
  static readonly ADD_UPDATE_COUNTRY = `locations/${VERSION}/${COUNTRIES}`;
  static readonly LOCATION_DATE_FORMAT = `locations/${VERSION}/date-format`;
  static readonly LOCATION_TIME_FORMAT = `locations/${VERSION}/time-format`;
  static readonly LOCATION_DISTANCE_UNIT = `locations/${VERSION}/distance-unit`;
  static readonly COUNTRY_DETAIL = `locations/${VERSION}/${COUNTRIES}/search`;
  static readonly CITY_BY_COUNTRY = `locations/${VERSION}/${COUNTRIES}/states/cities`;
  static readonly DEACTIVATE_CITY = `${this.CITY_BY_COUNTRY}/deactivate`;
  static readonly LOCATION_WEIGHT_UNIT = `locations/${VERSION}/weight-unit`;

  // Ride Management
  static readonly RIDE_LIST = `bookings/${VERSION}/${RIDES}`;
  static readonly RIDE_LIST_STATS = `bookings/${VERSION}/${RIDES}/analytics`;
  static readonly RIDE_DETAIL = `bookings/${VERSION}/${RIDES}`;
  static readonly RIDE_BLOCK_UNBLOCK = `bookings/${VERSION}/${RIDES}/profile/action`;

  //Vehicle
  static readonly VEHICLE_CATEGORY_LIST = `bookings/v1/categories/vehicles`;
  static readonly VEHICLE_LIST = `bookings/v1/vehicles`;
  static readonly VEHICLE_ADD = `bookings/v1/categories`;
  static readonly VEHICLE_EDIT = `bookings/v1/categories`;
  static readonly VEHICLE_DETAIL = `bookings/v1/categories`;
  static readonly VEHICLE_TYPE = `bookings/v1/vehicles/types`;

  static readonly WEIGHT_UNITS = `locations/${VERSION}/weight-unit`;

  // Notification
  static readonly NOTIFICATION_LIST = `notification/${VERSION}/notifications`;
  static readonly NOTIFICATION_ADD = `notification/${VERSION}/notifications`;
  static readonly NOTIIFICATION_EDIT = `notification/${VERSION}/notifications`;
  static readonly NOTIFICATION_DETAIL = `notification/${VERSION}/notifications`;
  static readonly NOTIFICATION_DELETE = `notification/${VERSION}/notifications`;
  static readonly NOTIFICATION_RESEND = `notification/${VERSION}/notifications/resend`;

  //Video List Management
  static readonly VIDEO_LIST = `media/${VERSION}/videos`;
  static readonly VIDEO_ADD = `media/${VERSION}/videos`;
  static readonly VIDEO_CATEGORIES = `media/${VERSION}/videos/categories`;
  static readonly VIDEO_CONTENT_TYPES = `media/${VERSION}/videos/content-types`;
  static readonly VIDEO_GENRES = `media/${VERSION}/videos/genres`;
  static readonly GET_VIDEO_DETAILS = `media/${VERSION}/videos`;
  static readonly EDIT_VIDEO = `media/${VERSION}/videos`;
  static readonly DELETE_VIDEO = `media/${VERSION}/videos`;

  //Video Content (Movies,Series)
  static readonly CONTENT = `media/${VERSION}/contents`;
  static readonly CONTENT_STATUS_UPDATE = `media/${VERSION}/contents/action`;

  //Home Page Data

  static readonly HOME_ADD = `media/${VERSION}/contents/home`;
  static readonly BANNER_IMAGES = `media/${VERSION}/contents/home/carousal`;
  static readonly USERS_COUNT = `media/${VERSION}/customers/analytics/count`;
  static readonly VIDEOS_COUNT = `media/${VERSION}/contents/analytics/count`;
  static readonly GRAPH_ANALYTICS = `media/${VERSION}/contents/graph/views`;

  //Upload season
  static readonly SEASON = `media/${VERSION}/seasons`;

  //Upload episode
  static readonly EPISODE = `media/${VERSION}/contents/episode`;

  //Configuration Management

  static readonly CONFIGURATION = `media/${VERSION}/settings`;
  static readonly CONFIGURATION_EDIT = `media/${VERSION}/settings`;

  // Multi part upload
  static readonly INITIATE_MULTIPART_UPLOAD = `media/${VERSION}/storage/initiate-multipart-upload`;
  static readonly COMPLETE_MULTIPART_UPLOAD = `media/${VERSION}/storage/complete-multipart-upload`;

  // Category management
  static readonly SAVE_MANAGE_HOME = `media/${VERSION}/contents/manage-home`;
  static readonly GET_MANAGE_HOME = `media/${VERSION}/contents/manage-home`;


  //User Management
  static readonly USER = `media/${VERSION}/customers`;

  //Subscription Management
  static readonly PLAN = `media/${VERSION}/plans`;

  //Countries
  static readonly COUNTRY_LIST = `media/${VERSION}/country`;

  // account
  static readonly LOGIN = `media/${VERSION}/${ACCOUNTS}/login`;
  static readonly VERIFY_MFA_CODE = `media/${VERSION}/${ACCOUNTS}/login`;
  static readonly RESET_MFA = `media/${VERSION}/${ACCOUNTS}/reset-mfa`;


  //permissions 
  static readonly ADMIN_PERMISSIONS = `media/${VERSION}/${ACCOUNTS}/permissions`;
  static readonly GET_PERMISSIONS = `media/${VERSION}/${PERMISSIONS}/${PERMISSIONS}/search`;

  // sessions
  static readonly LOGOUT = `media/${VERSION}/${SESSIONS}/logout`
  static readonly REFRESH = `media/${VERSION}/${SESSIONS}/refresh`;

  //password
  static readonly FORGET_PASSWORD = `media/${VERSION}/${PASSWORDS}/${ADMIN}`;
  static readonly RESET_PASSWORD = `media/${VERSION}/${PASSWORDS}/${ADMIN}`;
  static readonly CHANGE_PASSWORD = `media/${VERSION}/${PASSWORDS}`;
  static readonly VERIFY_PASSWORD = `media/${VERSION}/${PASSWORDS}/verify`;

  // Roles Management
  static readonly CREATE_ROLES = `media/${VERSION}/${ROLES}/${ROLES}`;
  static readonly GET_ROLES = `media/${VERSION}/${ROLES}/${ROLES}`;
  static readonly GET_ROLES_DETAILS = `media/${VERSION}/${ROLES}/${ROLES}`;
  static readonly UPDATE_ROLES_DETAILS = `media/${VERSION}/${ROLES}/${ROLES}`;
  static readonly ROLE_BLOCK_UNBLOCK = `media/${VERSION}/${ROLES}/${ROLES}/action`;

  //sub-admin
  static readonly SUB_ADMIN = `media/${VERSION}/${ADMINS}/${ADMINS}`;
  static readonly SUB_ADMIN_BLOCK_UNBLOCK = `media/${VERSION}/${ADMINS}/${ADMINS}/profile/action`;

  // admin profile
  static readonly ADMIN_PROFILE_DETAIL = `media/${VERSION}/${ADMINS}/${ADMINS}/profile`;
  static readonly FILE_UPLOAD = `media/${VERSION}/storage/upload`;


}
