import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { SampleAppCard } from '../molecules/showOrganisation/SampleAppCard';

export function SampleAppsSection() {
  return (
    <Box component="section" sx={{ mt: 8 , mx: 2.5}}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1.5, fontWeight: 400 }}
      >
        Try out a sample app
      </Typography>

      <Stack spacing={1.5}>
        <SampleAppCard
          title="Import Existing Inventory"
          description="Import products and stock using CSV or Excel templates."
          icon={GridOnOutlinedIcon}
        />
        <SampleAppCard
          title="Explore Demo Organization"
          description="Browse a preconfigured organization to understand Smart Inventory."
          icon={AutoAwesomeOutlinedIcon}
        />
      </Stack>
    </Box>
  );
}
