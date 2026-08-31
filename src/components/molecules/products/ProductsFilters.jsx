import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { fieldSx } from './styles';
import { returnableFilterOptions, searchFieldOptions } from '../../../data/productsTableData';
import { categoryOptions } from '../../../data/productFormOptions';

export function ProductsFilters({ filters, onChange }) {
  function setField(key) {
    return (value) => onChange({ ...filters, [key]: value });
  }

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2.5 }}>
      <TextField
        select
        label="Search by"
        value={filters.searchField}
        onChange={(event) => setField('searchField')(event.target.value)}
        size="small"
        sx={{ ...fieldSx, minWidth: 170 }}
      >
        {searchFieldOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Search"
        value={filters.searchValue}
        onChange={(event) => setField('searchValue')(event.target.value)}
        fullWidth
        size="small"
        sx={{ ...fieldSx, flex: 1.6 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select
        label="Category"
        value={filters.category}
        onChange={(event) => setField('category')(event.target.value)}
        size="small"
        sx={{ ...fieldSx, minWidth: 180 }}
      >
        <MenuItem value="">All categories</MenuItem>
        {categoryOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Returnable item"
        value={filters.returnable}
        onChange={(event) => setField('returnable')(event.target.value)}
        size="small"
        sx={{ ...fieldSx, minWidth: 180 }}
      >
        {returnableFilterOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
