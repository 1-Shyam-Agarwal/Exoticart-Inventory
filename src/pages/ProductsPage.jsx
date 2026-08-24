import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ReplayIcon from '@mui/icons-material/Replay';

import { NavbarBreadcrumbs } from '../components/atoms/dashboard/NavbarBreadcrumbs';
import { ProductsSection } from '../components/organisms/products/ProductsSection';

import { listOrganizations } from '../services/organization';

function ProductsPage() {
  const { id } = useParams();

  const { isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['organizations'],
    queryFn: listOrganizations,
  });

  const breadcrumbItems = [
    ['Home', '/'],
    ['Products', `/org/active/${id}/products`],
  ];

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', mx: 3, py: 4 }}>

      {/* Loading state */}
      {isLoading && (
        <Stack spacing={1.5} sx={{ minHeight: '80vh', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={28} aria-label="Loading…" />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Loading products…
          </Typography>
        </Stack>
      )}

      {/* error state */}
      {isError && (
        <Stack spacing={1.5} sx={{ minHeight: '80vh', alignItems: 'center', justifyContent: 'center' }}>
          <WarningAmberIcon sx={{ fontSize: 28, color: 'error.main' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {error?.message || "Something went wrong"}
          </Typography>
          <Button
            onClick={() => refetch()}
            variant="outlined"
            size="small"
            startIcon={
              <ReplayIcon
                fontSize="small"
                sx={{
                  animation: isFetching ? 'spin 0.7s linear infinite' : 'none',
                  '@keyframes spin': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(-360deg)' },
                  },
                }}
              />
            }
            sx={{
              textTransform: 'none',
              borderRadius: 1,
              borderColor: 'border.main',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'background.muted',
              },
            }}
          >
            Reload
          </Button>
        </Stack>
      )}

      {/* Normal state */}
      {!isLoading && !isError && (
        <>
          <NavbarBreadcrumbs breadcrumbItems={breadcrumbItems} />
          <ProductsSection />
        </>
      )}
    </Stack>
  );
}

export default ProductsPage;
