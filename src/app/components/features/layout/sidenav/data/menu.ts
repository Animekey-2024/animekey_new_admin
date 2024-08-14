// import { LayoutRoutes } from '@constants/routes';

import {
  ADMIN_PROFILE,
  ANALYTICS,
  CONTENT,
  DASHBOARD,
  HOME_LISTS,
  NOTIFICATION,
  PAGES,
  ROLES,
  SETTINGS,
  SUB_ADMIN,
  USER,
} from '@constants/routes';
import { MENUS_ICONS } from './menu-icons';
import { FEATURE_SLUGS } from '@enums/feature-slugs.enum';
import { DASH } from '@angular/cdk/keycodes';

export const MENUS = [
  {
    name: ANALYTICS.label,
    route: DASHBOARD.path,
    icon: MENUS_ICONS.ANALYTICS,
    isVisible: true,
    feature: FEATURE_SLUGS.ANALYTICS,
  },
  {
    name: ROLES.label,
    route: ROLES.path,
    icon: MENUS_ICONS.ROLES,
    isVisible: true,
    feature: FEATURE_SLUGS.ROLES,
  },

  {
    name: SUB_ADMIN.label,
    route: SUB_ADMIN.path,
    icon: MENUS_ICONS.USER,
    isVisible: true,
    feature: FEATURE_SLUGS.SUBADMINS,
  },

  // {
  //   name: USER.label,
  //   route: USER.path,
  //   icon: MENUS_ICONS.USER,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.USERS,
  // },

  // {
  //   name: CONTENT.label,
  //   route: CONTENT.path,
  //   icon: MENUS_ICONS.CONTENT,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.CONTENTS,
  // },
  // {
  //   name: SETTINGS.label,
  //   route: SETTINGS.path,
  //   icon: MENUS_ICONS.SETTINGS,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.SETTINGS,
  // },
  // {
  //   name: NOTIFICATION.label,
  //   route: NOTIFICATION.path,
  //   icon: MENUS_ICONS.NOTIFICATION,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.NOTIFICATIONS,
  // },

  // {
  //   name: HOME_LISTS.label,
  //   route: HOME_LISTS.path,
  //   icon: MENUS_ICONS.HOME_LISTS,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.HOME,
  // },
  // {
  //   name: PAGES.label,
  //   route: PAGES.path,
  //   icon: MENUS_ICONS.PAGES,
  //   isVisible: true,
  //   feature: FEATURE_SLUGS.PAGES,
  // },
];
