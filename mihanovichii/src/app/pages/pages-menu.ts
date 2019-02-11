import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'SYSTEM',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Administrator',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'nb-home',
    children: [
      {
        title: 'Dashboard',
        link: '/pages/dashboard',
      }, {
        title: 'Dashboard Document',
        link: '/pages/dashboard1',
      }, {
        title: 'Dashboard Inventory',
        link: '/pages/dashboard2',
      },
    ],
    home: true,
  },
  {
    title: 'Authentications',
    icon: 'nb-locked',
    children: [
      {
        title: 'Users',
        link: '/pages/users/users-list',
      },
      {
        title: 'Roles',
        link: '/pages/roles/roles-list',
      },
      {
        title: 'Permissions',
        link: '/pages/permissions/permissions-list',
      },
    ],
  },
  {
    title: 'Setting',
    icon: 'nb-gear',
    children: [
      {
        title: 'Companies',
        link: '/pages/companies/companies-table',
      },
      {
        title: 'Departments',
        link: '/pages/departments/departments-table',
      },
      {
        title: 'Employees',
        link: '/pages/employees/employees-table',
      },
      {
        title: 'Positions',
        link: '/pages/positions/positions-table',
      },
      {
        title: 'Locations',
        link: '/pages/locations/locations-table',
      },
      {
        title: 'Warehouse',
        link: '/pages/warehouses/warehouses-table',
      },
      {
        title: 'Item unit',
        link: '/pages/units/units-table',
      },
      {
        title: 'Item code',
        link: '/pages/itemcodes/items-table',
      },
    ],
  },
  {
    title: 'Audit',
    icon: 'nb-lightbulb',
    children: [
      {
        title: 'Activity log',
        link: '/logs/activity',
      },
      {
        title: 'Security log',
        link: '/logs/security',
      },
    ],
  },
];

export const USER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Application',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'nb-bar-chart',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'วัสดุสิ้นเปลือง',
    icon: 'nb-grid-b-outline',
    children: [
      {
        title: 'ทะเบียนวัสดุสิ้นเปลือง',
        link: '/consumable/login',
      },
      {
        title: 'ร้องขอวัสดุสิ้นเปลือง',
        link: '/consumable/request',
      },
      {
        title: 'โอนย้ายวัสดุสิ้นเปลือง',
        link: '/consumable/transfer-note',
      },
      {
        title: 'จ่ายวัสดุสิ้นเปลือง',
        link: '/consumable/issue',
      },
      {
        title: 'รับวัสดุสิ้นเปลือง',
        link: '/consumable/receive',
      },
    ],
  },
  {
    title: 'ทรัพย์สิน',
    icon: 'nb-grid-b-outline',
    children: [
      {
        title: 'ทะเบียนทรัพย์สิน',
        link: '/fix-asset',
      },
      {
        title: 'ร้องขอทรัพย์สิน',
        link: '/fix-asset/request',
      },
      {
        title: 'โอนย้ายทรัพย์สิน',
        link: '/fix-asset/transfer-note',
      },
      {
        title: 'จ่ายทรัพย์สิน',
        link: '/fix-asset/issue',
      },
      {
        title: 'รับทรัพย์สิน',
        link: '/fix-asset/receive',
      },
    ],
  },
];