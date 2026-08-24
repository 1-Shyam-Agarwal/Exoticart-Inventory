import { Fragment } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const data = [
  { label: 'Electronics', value: 825 },
  { label: 'Furniture', value: 65 },
  { label: 'Stationery', value: 1740 },
  { label: 'Accessories', value: 60 },
];

const categories = [
  { name: 'Electronics', value: 32, color: 'hsl(220, 25%, 65%)' },
  { name: 'Furniture', value: 3, color: 'hsl(220, 25%, 45%)' },
  { name: 'Stationery', value: 63, color: 'hsl(220, 25%, 30%)' },
  { name: 'Accessories', value: 2, color: 'hsl(220, 25%, 20%)' },
];

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: theme.palette.text.secondary,
  variants: [
    { props: { variant: 'primary' }, style: { fontSize: theme.typography.h5.fontSize } },
    { props: ({ variant }) => variant !== 'primary', style: { fontSize: theme.typography.body2.fontSize } },
    { props: { variant: 'primary' }, style: { fontWeight: theme.typography.h5.fontWeight } },
    { props: ({ variant }) => variant !== 'primary', style: { fontWeight: theme.typography.body2.fontWeight } },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </Fragment>
  );
}

const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)'];

export function StockByCategoryChart() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Stock by Category
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            height={260}
            width={260}
            hideLegend
          >
            <PieCenterLabel primaryText="2.7K" secondaryText="Units" />
          </PieChart>
        </Box>
        {categories.map((category) => (
          <Stack key={category.name} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '2px',
                bgcolor: category.color,
                flexShrink: 0,
              }}
            />
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {category.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label={`Share of stock in ${category.name}`}
                value={category.value}
                sx={{ [`& .${linearProgressClasses.bar}`]: { backgroundColor: category.color } }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
