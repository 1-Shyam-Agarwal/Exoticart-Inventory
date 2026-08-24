import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import Typography from '@mui/material/Typography';

export function ProductsToolbar({ view = 'list', onViewChange}) {
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', justifyContent: 'space-between', pb: 2 }}
    >

      <Typography
            sx={{textTransform: 'none', color: 'text.primary', fontWeight: 400, fontSize: '1.5rem' }}  
      >
        All Products
      </Typography>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          size="small"
          onChange={(_event, value) => onViewChange(value)}
          sx={{ '& .MuiToggleButton-root': { border: '1px solid', borderColor: 'border.soft' , borderRadius:0.5 } }}
        >
          <ToggleButton value="list" aria-label="List view">
            <ViewListRoundedIcon fontSize="small" />
          </ToggleButton>

          <ToggleButton value="grid" aria-label="Grid view">
            <ViewModuleRoundedIcon fontSize="small" />
          </ToggleButton>

        </ToggleButtonGroup>

        <Button
          type="button"
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 200,
            minWidth: 0,
            width: 32,
            height: 32,
            borderRadius: 0.5,
            color: 'black',
          }}
        >
          <AddRoundedIcon fontSize="small" sx={{ color: 'common.black' }} />
        </Button>
      </Stack>
    </Stack>
  );
}
