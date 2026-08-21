import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TextField from '@mui/material/TextField';

export function OrganizationsSearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search organizations"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: 'background.paper',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            height: 44,
          },
        },
      }}
      sx={{
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'border.soft' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
      }}
    />
  );
}
