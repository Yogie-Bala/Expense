import React from 'react';
import { Box } from '@mui/material';

const BackgroundDesign = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
        background: 'linear-gradient(160deg, #0f2027, #203a43, #2c5364)', // Gradient blue/teal/dark
        overflow: 'hidden',
      }}
    >
      {/* Abstract Wave SVG */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%' }}
      >
        <path
          fill="#ffffff"
          fillOpacity="0.1"
          d="M0,160L40,165.3C80,171,160,181,240,192C320,203,400,213,480,197.3C560,181,640,139,720,117.3C800,96,880,96,960,122.7C1040,149,1120,203,1200,197.3C1280,192,1360,128,1400,96L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        />
      </svg>
    </Box>
  );
};

export default BackgroundDesign;
