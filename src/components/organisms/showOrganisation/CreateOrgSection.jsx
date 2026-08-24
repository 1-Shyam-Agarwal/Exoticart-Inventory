import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import developerLogo from '../../../../public/assets/developer_logo.png';
import { ActionCard } from '../../molecules/showOrganisation/ActionCard';

export function CreateOrgSection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="subtitle2"
        sx={{ mb: 1.5, fontWeight: 500 }}
      >
        Get started
      </Typography>

      <ActionCard
          title="Set up your organization"
          description="Integrate Smart Inventory to super-charge your business."
          image={developerLogo}
          onClickHandler={() => navigate('/org/setup')}
      />
    </Box>
  );
}
