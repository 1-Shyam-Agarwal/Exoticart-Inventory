import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../atoms/dashboard/Copyright';
import { StockByCategoryChart } from '../../molecules/dashboard/StockByCategoryChart';
import { CategoryTreeView } from '../../molecules/dashboard/CategoryTreeView';
import { InventoryDataGrid } from '../../molecules/dashboard/InventoryDataGrid';
import { HighlightedCard } from '../../molecules/dashboard/HighlightedCard';
import { OrdersBarChart } from '../../molecules/dashboard/OrdersBarChart';
import { InventoryTrendChart } from '../../molecules/dashboard/InventoryTrendChart';
import { StatCard } from '../../molecules/dashboard/StatCard';

const overviewCards = [
  {
    title: 'Total Stock Value',
    value: '₹14.2L',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420,
      400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Low Stock Items',
    value: '18',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380,
      740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Orders Today',
    value: '42',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520,
      610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

export function DashboardMainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
        {overviewCards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InventoryTrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <OrdersBarChart />
        </Grid>
      </Grid>

      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <InventoryDataGrid />
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row', lg: 'column' }} sx={{ gap: 2 }}>
            <CategoryTreeView />
            <StockByCategoryChart />
          </Stack>
        </Grid>
      </Grid>

      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
