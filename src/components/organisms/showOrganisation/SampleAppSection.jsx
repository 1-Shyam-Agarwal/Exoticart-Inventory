import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { ActionCard } from '../../molecules/showOrganisation/ActionCard';
import { useNavigate } from 'react-router-dom';

export function SampleAppsSection() {

  const navigate = useNavigate()
  
  return (
    <Box component="section" sx={{ mt: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1.5, fontWeight: 500 }}
      >
        Try out a sample app
      </Typography>

      <Stack spacing={1.5}>
        <ActionCard
          title="Import Existing Inventory"
          description="Import products and stock using CSV or Excel templates."
          icon={GridOnOutlinedIcon}
          onClickHandler={() => navigate('/org/setup')}
        />
        <ActionCard
          title="Explore Demo Organization"
          description="Browse a preconfigured organization to understand Smart Inventory."
          icon={AutoAwesomeOutlinedIcon}
          onClickHandler={() => navigate('/org/setup')}
        />
      </Stack>
    </Box>
  );
}
