import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Disaster Management',
    path: '/disaster',
    icon: icon('ic_disabled'),
  },

  {
    title: 'Map',
    path: '/map',
    icon: icon('ic_user'),
  },

];

export default navConfig;
