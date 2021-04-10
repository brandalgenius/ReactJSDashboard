export default async function getMenuData() {
  let dataMenu = [
    {
      category: true,
      title: 'Menu',
    },
    {
      title: 'Dashboard',
      key: 'dashboards',
      icon: 'fe fe-home',
      url: '/dashboard/home',
    },
    {
      title: 'Conversion Report',
      key: 'conversion-report',
      icon: 'fe fe-bar-chart',
      url: '/dashboard/report/conversion',
    },
    {
      title: 'Global Report',
      key: 'global-report',
      icon: 'fa fa-globe',
      url: '/dashboard/report/global',
    },
    {
      title: 'Traffic Log',
      key: 'traffic-log',
      icon: 'fa fa-area-chart',
      url: '/dashboard/traffic',
    },
    {
      title: 'Payment',
      key: 'payment',
      icon: 'fa fa-money',
      url: '/dashboard/payment',
    },
    {
      title: 'Generate Link',
      key: 'generate-link',
      icon: 'fa fa-link',
      url: '/dashboard/generate',
    },
    {
      title: 'Users',
      key: 'user',
      icon: 'fa fa-user',
      url: '/dashboard/generate',
    },
    {
      title: 'Setting',
      key: 'setting',
      icon: 'fa fa-cog',
      url: '',
    },

  ]

  return dataMenu
}
