import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import TextField from '@mui/material/TextField';

export function OrganizationsSearchBar({ value, onChange }) {
  return (
    <TextField
      fullWidth
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
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            height: 44,
          },
        },
      }}
      sx={{
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
      }}
    />
  );
}
