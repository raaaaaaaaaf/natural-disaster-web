import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDateTime } from 'src/utils/format-time';

import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PostCard({ post, index }) {
  const { about, dateNtime, disasterName, typeDisaster, latitude, longitude } = post;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle2"
      underline="hover"
      sx={{
        height: 44,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {disasterName}
    </Link>
  );

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
    // Add cases for other types of disasters here
    default:
      imageSrc = '/assets/disaster/default.jpg'; // Default image path
  }

  const renderCover = (
    <Box
      component="img"
      alt={disasterName}
      src={imageSrc}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
    
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
        color: 'text.disabled',
        ...((latestPostLarge || latestPost) && {
          opacity: 0.48,
          color: 'common.white',
        }),
      }}
    >
      {fDateTime(dateNtime)}
    </Typography>
  );


  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card>
        
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          

          {/* {renderAvatar} */}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          
          {renderDate}

          {renderTitle}

          {/* {renderInfo} */}
        </Box>
      </Card>
    </Grid>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};
