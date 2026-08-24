import { useState } from 'react';
import Box from '@mui/material/Box';
import { ProductsToolbar } from '../../molecules/products/ProductsToolbar';
import { ProductsEmptyState } from '../../molecules/products/ProductsEmptyState';

export function ProductsSection() {
  const [view, setView] = useState('list');

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <ProductsToolbar view={view} onViewChange={setView} />

      <Box
        sx={{
          bgcolor: 'transparent',
          borderRadius: 1,
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ProductsEmptyState />
      </Box>
    </Box>
  );
}
