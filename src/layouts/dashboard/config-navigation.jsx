import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <Iconify icon={'carbon:analytics'} />,
  },
  {
    title: 'Disaster Management',
    path: '/disaster',
    icon: <Iconify icon={'el:warning-sign'} />,
  },
  {
    title: 'Map',
    path: '/map',
    icon: <Iconify icon={'carbon:map'} />,
  },

];

export default navConfig;
