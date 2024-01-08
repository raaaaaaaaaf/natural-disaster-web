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
    title: 'Natural Disaster Management',
    path: '/disaster',
    icon: <Iconify icon={'fluent:weather-rain-48-regular'} />,
  },
  {
    title: 'Prone Areas',
    path: '/prone',
    icon: <Iconify icon={'el:warning-sign'} />,
  },
  {
    title: 'History',
    path: '/history',
    icon: <Iconify icon={'material-symbols-light:history'} />,
  },
  {
    title: 'Map',
    path: '/map',
    icon: <Iconify icon={'carbon:map'} />,
  },


];

export default navConfig;
