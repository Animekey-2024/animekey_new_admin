import { IRoute } from '@models/common-model';

// On Boarding Routes
export const ONBOARDING: IRoute = {
  path: 'auth',
  label: 'auth',
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const LOGIN: IRoute = {
  path: 'login',
  label: 'Login',
  get fullUrl(): string {
    return `${ONBOARDING.fullUrl}/${this.path}`;
  },
};

export const VERIFY_OTP: IRoute = {
  path: 'verify-otp',
  label: 'Verify OTP',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const FORGOT_PASSWORD: IRoute = {
  path: 'forgot-password',
  label: 'Forgot Password',
  get fullUrl(): string {
    return `${ONBOARDING.fullUrl}/${this.path}`;
  },
};

export const RESET_PASSWORD: IRoute = {
  path: 'reset-password',
  label: 'Reset Password',
  get fullUrl(): string {
    return `${ONBOARDING.fullUrl}/${this.path}`;
  },
};

export const LINK_EXPIRED: IRoute = {
  path: 'link-expired',
  label: 'Link Expired',
  get fullUrl(): string {
    return `${ONBOARDING.fullUrl}/${this.path}`;
  },
};

export const AUTHENTICATOR: IRoute = {
  path: 'authenticator',
  label: 'Authenticator',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const VERIFY_CODE: IRoute = {
  path: 'verify-code',
  label: 'Verify Code',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const NOT_FOUND: IRoute = {
  path: '**',
  label: '',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const NO_PERMISSION: IRoute = {
  path: 'no-permission',
  label: 'No Permission',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

//
export const ANALYTICS: IRoute = {
  path: 'analytics',
  label: 'Analytics',
  get fullUrl(): string {
    return `${this.path}`;
  },
};


export const USER: IRoute = {
  path: 'user',
  label: 'User',
  get fullUrl(): string {
    return `${this.path}`;
  },
};


export const CONTENT: IRoute = {
  path: 'content',
  label: 'Content',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const SETTINGS: IRoute = {
  path: 'settings',
  label: 'Settings',
  get fullUrl(): string {
    return `${this.path}`;
  },
};


export const HOME_LISTS: IRoute = {
  path: 'home',
  label: 'Home',
  get fullUrl(): string {
    return `${this.path}`;
  },
};


export const PAGES: IRoute = {
  path: 'pages',
  label: 'Pages',
  get fullUrl(): string {
    return `${this.path}`;
  },
};



























// Dashboard Routes
export const DASHBOARD: IRoute = {
  path: 'dashboard',
  label: 'Dashboard',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

// Charts Routes
export const CHARTS: IRoute = {
  path: 'charts',
  label: 'Charts',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

// Sub admin Routes
export const SUB_ADMIN: IRoute = {
  path: 'sub-admin',
  label: 'Sub Admin Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const SUB_ADMIN_ADD: IRoute = {
  path: 'add',
  label: 'Add Sub Admin',
  get fullUrl(): string {
    return `${SUB_ADMIN.fullUrl}/${this.path}`;
  },
};

export const SUB_ADMIN_EDIT: IRoute = {
  path: 'edit',
  label: 'Edit',
  get fullUrl(): string {
    return `${SUB_ADMIN.fullUrl}/${this.path}`;
  },
};

export const SUB_ADMIN_VIEW: IRoute = {
  path: 'view',
  label: 'Sub Admin Details',
  get fullUrl(): string {
    return `${SUB_ADMIN.fullUrl}/${this.path}`;
  },
};

// Roles Management Routes
export const ROLES: IRoute = {
  path: 'roles',
  label: 'Roles Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const ROLES_CREATE: IRoute = {
  path: 'create',
  label: 'Add Role',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const ROLES_EDIT: IRoute = {
  path: 'edit',
  label: 'Edit Role',
  get fullUrl(): string {
    return `${ROLES.fullUrl}/${this.path}`;
  },
};

export const ROLES_DETAILS: IRoute = {
  path: 'detail',
  label: 'View Role',
  get fullUrl(): string {
    return `${ROLES.fullUrl}/${this.path}`;
  },
};

// Admin Profile Routes
export const ADMIN_PROFILE: IRoute = {
  path: 'admin-profile',
  label: 'Admin Profile',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const ADMIN_VIEW_PROFILE: IRoute = {
  path: 'detail',
  label: 'Profile Details',
  get fullUrl(): string {
    return `${ADMIN_PROFILE.fullUrl}`;
  },
};

export const ADMIN_EDIT_PROFILE: IRoute = {
  path: 'edit',
  label: 'Edit Profile',
  get fullUrl(): string {
    return `${ADMIN_PROFILE.fullUrl}/${this.path}`;
  },
};

export const UPDATE_PASSWORD: IRoute = {
  path: 'update-password',
  label: 'Update Password',
  get fullUrl(): string {
    return `${ADMIN_PROFILE.fullUrl}/${this.path}`;
  },
};

// Content Management Routes
export const CONTENT_MANAGEMENT: IRoute = {
  path: 'static-content',
  label: 'Static Content Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

//FAQ routes
export const ADD_FAQ: IRoute = {
  path: 'add-faq',
  label: 'Add FAQ',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const EDIT_FAQ: IRoute = {
  path: 'edit-faq',
  label: 'Edit FAQ',
  get fullUrl(): string {
    return `${CONTENT_MANAGEMENT.fullUrl}/${this.path}`;
  },
};

export const FAQ_DETAILS: IRoute = {
  path: 'detail',
  label: 'View FAQ',
  get fullUrl(): string {
    return `${CONTENT_MANAGEMENT.fullUrl}/${this.path}`;
  },
};

// Notification management

export const NOTIFICATION: IRoute = {
  path: 'notifications',
  label: 'Notifications',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const NOTIFICATION_EDIT: IRoute = {
  path: 'edit',
  label: 'Edit Notification',
  get fullUrl(): string {
    return `/${NOTIFICATION.fullUrl}/${this.path}`;
  },
};

export const NOTIFICATION_DETAIL: IRoute = {
  path: 'details',
  label: 'Notification Details',
  get fullUrl(): string {
    return `/${NOTIFICATION.fullUrl}/${this.path}`;
  },
};

export const NOTIFICATION_ADD: IRoute = {
  path: 'add',
  label: 'Create Notification',
  get fullUrl(): string {
    return `/${NOTIFICATION.fullUrl}/${this.path}`;
  },
};

// Video List module

export const VIDEOS: IRoute = {
  path: 'videos',
  label: 'Content Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const VIDEOS_LIST: IRoute = {
  path: 'video-list',
  label: 'Video List',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const VIDEO_DETAILS: IRoute = {
  path: 'detail',
  label: 'Video Details',
  get fullUrl(): string {
    return `${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const VIDEO_ADD: IRoute = {
  path: 'add-movie',
  label: 'Add Movie',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const VIDEO_EDIT: IRoute = {
  path: 'edit-movie',
  label: 'Edit Movie',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SEASON: IRoute = {
  path: 'season',
  label: 'Series',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SERIES_ADD: IRoute = {
  path: 'add-series',
  label: 'Add Series',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SERIES_EDIT: IRoute = {
  path: 'edit-series',
  label: 'Edit Series',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SERIES_DETAILS: IRoute = {
  path: 'series-details',
  label: 'Series Details',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

//Season

export const SEASON_LIST: IRoute = {
  path: 'season-list',
  label: 'Season List',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const SEASON_DETAILS: IRoute = {
  path: 'season-details',
  label: 'Season Details',
  get fullUrl(): string {
    return `${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SEASON_ADD: IRoute = {
  path: 'add-season',
  label: 'Add Season',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const SEASON_EDIT: IRoute = {
  path: 'edit-season',
  label: 'Edit Season',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

//Episode

export const EPISODE_LIST: IRoute = {
  path: 'episode-list',
  label: 'Episode List',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const EPISODE_ADD: IRoute = {
  path: 'add-episode',
  label: 'Add Episode',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const EPISODE_EDIT: IRoute = {
  path: 'edit-episode',
  label: 'Edit Episode',
  get fullUrl(): string {
    return `/${VIDEOS.fullUrl}/${this.path}`;
  },
};

export const EPISODE_DETAILS: IRoute = {
  path: 'episode-details',
  label: 'Episode Details',
  get fullUrl(): string {
    return `${VIDEOS.fullUrl}/${this.path}`;
  },
};
// Configuration

export const CONFIGURATION: IRoute = {
  path: 'configurations',
  label: 'Configuration Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

// Content Types
export const CONTENT_TYPES: IRoute = {
  path: 'content-types',
  label: 'Content Type Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const CONTENT_TYPE_ADD: IRoute = {
  path: 'add',
  label: 'Add Content Type',
  get fullUrl(): string {
    return `/${CONTENT_TYPES.fullUrl}/${this.path}`;
  },
};

export const CONTENT_TYPE_EDIT: IRoute = {
  path: 'edit',
  label: 'Add Content Type',
  get fullUrl(): string {
    return `/${CONTENT_TYPES.fullUrl}/${this.path}`;
  },
};

export const CONTENT_TYPE_DETAILS: IRoute = {
  path: 'details',
  label: 'Add Content Type',
  get fullUrl(): string {
    return `/${CONTENT_TYPES.fullUrl}/${this.path}`;
  },
};

// Categories

export const CATEGORIES: IRoute = {
  path: 'categories',
  label: 'Categories Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const CATEGORIE_ADD: IRoute = {
  path: 'add',
  label: 'Add Categories',
  get fullUrl(): string {
    return `/${CATEGORIES.fullUrl}/${this.path}`;
  },
};

export const CATEGORIE_EDIT: IRoute = {
  path: 'edit',
  label: 'Add Categories',
  get fullUrl(): string {
    return `/${CATEGORIES.fullUrl}/${this.path}`;
  },
};

export const CATEGORIE_DETAILS: IRoute = {
  path: 'details',
  label: 'Add Categories',
  get fullUrl(): string {
    return `/${CATEGORIES.fullUrl}/${this.path}`;
  },
};

// Home

export const CATEGORY_MANAGEMENT: IRoute = {
  path: 'category-management',
  label: 'Category Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const HOME: IRoute = {
  path: 'home',
  label: 'Home',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

//User

export const USERS: IRoute = {
  path: 'users',
  label: 'User Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const USER_DETAILS: IRoute = {
  path: 'detail',
  label: 'User Details',
  get fullUrl(): string {
    return `${USERS.fullUrl}/${this.path}`;
  },
};

//Subscription
export const SUBSCRIPTIONS: IRoute = {
  path: 'subscriptions',
  label: 'Subscription Management',
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const SUBSCRIPTION_ADD: IRoute = {
  path: 'add',
  label: 'Add Subscription',
  get fullUrl(): string {
    return `/${SUBSCRIPTIONS.fullUrl}/${this.path}`;
  },
};

export const SUBSCRIPTION_EDIT: IRoute = {
  path: 'edit',
  label: 'Edit Subscription',
  get fullUrl(): string {
    return `/${SUBSCRIPTIONS.fullUrl}/${this.path}`;
  },
};

export const SUBSCRIPTION_DETAILS: IRoute = {
  path: 'detail',
  label: 'Subscription Details',
  get fullUrl(): string {
    return `${SUBSCRIPTIONS.fullUrl}/${this.path}`;
  },
};
