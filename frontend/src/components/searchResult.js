// ✅ CORRECT
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const SearchResults = () => {
  const { query } = useParams();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold">
        Search Results for: "{decodeURIComponent(query)}"
      </Typography>
    </Box>
  );
};

export default SearchResults; // ✅ THIS IS IMPORTANT
