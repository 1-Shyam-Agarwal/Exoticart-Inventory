import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

export function ProductsToolbar({ view = 'list', onViewChange, clickHandler }) {
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
          onClick={clickHandler}
          sx={{
            textTransform: 'none',
            minWidth: 0,
            borderRadius: 0.5,
            color: 'black',
            fontWeight: 400,
          }}
        >
          Add <AddIcon fontSize="small" sx={{ color: 'black', fontWeight: 200 }} />
        </Button>
      </Stack>
    </Stack>
  );
}
