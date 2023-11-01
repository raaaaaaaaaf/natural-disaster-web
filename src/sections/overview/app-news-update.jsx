import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function AppNewsUpdate({ list }) {
  

  return (
    <Card>
      <CardHeader title="New Natural Disaster"  />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.slice(0, 5).map((news) => (
            <NewsItem key={news.id} news={news} image={getDisasterImage(news.typeDisaster)} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

// ----------------------------------------------------------------------

function NewsItem({ news, image }) {
  const { about, dateNtime, disasterName, typeDisaster } = news;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={disasterName}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {typeDisaster}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {about}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      {fToNow(new Date(dateNtime.seconds * 1000))}
      </Typography>
    </Stack>
  );
}

function getDisasterImage(typeDisaster) {
  let imageSrc;

  switch (typeDisaster) {
    case 'Tsunami':
      imageSrc = '/assets/disaster/tsunami.jpg';
      break;
    case 'Tropical cyclone':
      imageSrc = '/assets/disaster/tropical.jpg';
      break;
    case 'Typhoon':
      imageSrc = '/assets/disaster/typhoon.jpg';
      break;
    case 'Earthquake':
      imageSrc = '/assets/disaster/earthquake.jpg';
      break;
    case 'Landslide':
      imageSrc = '/assets/disaster/landslide.jpg';
      break;
    case 'Flash flood':
      imageSrc = '/assets/disaster/flood.jpg';
      break;
    case 'Volcanic eruption':
      imageSrc = '/assets/disaster/volcanic.jpg';
      break;
    default:
      imageSrc = '/assets/disaster/default.jpg'; // Default image path
  }

  return imageSrc;
}

NewsItem.propTypes = {
  news: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
  }),
};
