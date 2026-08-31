import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

import FieldError from '../../atoms/setupOrganisation/FieldError';
import { checkMenuItemSx, fieldSx, selectMenuPaperSx } from './styles';

export function ProductSelectField({
  control,
  name,
  label,
  labelId,
  required = false,
  error,
  options,
  manageOption,
  onValueChange,
  sx,
}) {

  return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {

          function handleChange(event) {
            if (event.target.value === 'manage') {
              manageOption.onSelectHandler();
              return;
            }
            field.onChange(event);
            onValueChange?.(event.target.value);
          }
          
          return (
            <>
              <FormControl fullWidth required={required} error={Boolean(error)} sx={fieldSx}>
                <InputLabel labelId={labelId}>{label}</InputLabel>
                <Select
                  label={label}
                  labelId={labelId}
                  value={field.value}
                  onChange={handleChange}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  renderValue = {
                    (value)=> (value.charAt(0).toUpperCase() + value.slice(1))
                  }
                >

                  {/* Default value */}
                  <MenuItem value='' sx={checkMenuItemSx}>Select a {label}</MenuItem>

                  {/* Actual Values */}
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value} sx={checkMenuItemSx}>
                      <Box component="span" sx={{ textTransform: 'capitalize' }} >{option.value}</Box>
                    </MenuItem>
                  ))}

                  {/* Manage options */}
                  {manageOption && [
                    <Divider key="manage-divider" sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />,
                    <MenuItem
                      key="manage-option"
                      value={'manage'}
                      sx={{ ...checkMenuItemSx, color: 'primary.main', justifyContent: 'flex-start', gap: 1 }}
                    >
                      <AddRoundedIcon fontSize="small" />
                      <Box component="span">{manageOption.label}</Box>
                    </MenuItem>,
                  ]}
                </Select>
              </FormControl>
              {error && <FieldError message={error} />}
            </>
          );
        }}
      />
  );
}
