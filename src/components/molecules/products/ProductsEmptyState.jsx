import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

export function ProductsEmptyState({ onNewItem }) {
  return (
    <Box sx={{ px: 2 }}>
      <Stack sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Inventory2RoundedIcon sx={{ fontSize: 64, color: 'text.secondary' }} />

        <Stack sx={{ alignItems: 'center', mt: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 400, fontSize: '1.125rem', color: 'text.primary' }}>
            Add new Products
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', maxWidth: 380, fontSize: '0.8rem', lineHeight: 1.5 }}
          >
           Add products, track stock levels, and stay on top of your inventory.
          </Typography>
        </Stack>

        <Button
          type="button"
          variant="contained"
          onClick={onNewItem}
          sx={{ textTransform: 'none', mt: 3, borderRadius: 0.5, fontWeight: 400}}
        >
          New Item
        </Button>
      </Stack>
    </Box>
  );
}
