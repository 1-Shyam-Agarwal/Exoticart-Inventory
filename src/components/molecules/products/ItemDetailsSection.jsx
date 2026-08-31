import { Controller, useFormContext } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import { FieldHint } from '../../atoms/products/FieldHint';
import { BoxTypeSelectField } from './BoxTypeSelectField';
import { ProductFormSectionHeader } from './ProductFormSectionHeader';
import { unitOptions } from '../../../data/productFormOptions';
import { fieldSx } from './styles';
import FieldError from '../../atoms/setupOrganisation/FieldError';

export function ItemDetailsSection() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const unit = watch('unit');

  return (
    <Box>
      <ProductFormSectionHeader title="Item details" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={unitOptions}
                getOptionLabel={(option) => option.label}
                value={unitOptions.find((opt) => opt.value === field.value) || null}
                onChange={(_event, newValue) => field.onChange(newValue?.value ?? '')}
                onBlur={field.onBlur}
                autoHighlight
                openOnFocus
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Unit *"
                    inputRef={field.ref}
                    error={Boolean(errors.unit)}
                    sx={fieldSx}
                  />
                )}
              />
            )}
          />
          {errors.unit?.message && <FieldError message={errors.unit?.message} />}
        </Grid>

        {unit === 'box' && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <BoxTypeSelectField />
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="SKU"
              fullWidth
              placeholder="K-600-108"
              error={Boolean(errors.sku)}
              sx={fieldSx}
              {...register('sku')}
            />
            {errors.sku?.message && <FieldError message={errors.sku?.message}/>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Reorder point *"
              fullWidth
              error={Boolean(errors.reorderPoint)}
              sx={fieldSx}
              {...register('reorderPoint',  { valueAsNumber: true })}
              slotProps={{
                htmlInput: { min: 0 },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <NotificationsActiveOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            {errors.reorderPoint?.message && <FieldError message={errors.reorderPoint?.message}/>}
          <FieldHint>Alert when stock falls below this.</FieldHint>
        </Grid>

        <Grid size={12}>
            <TextField
              label="Item description"
              fullWidth
              multiline
              rows={3}
              placeholder="Materials, specifications, usage notes…"
              error={Boolean(errors.description)}
              sx={fieldSx}
              {...register('description')}
            />
            {errors.description?.message && <FieldError message={errors.description?.message}/>}
        </Grid>
      </Grid>
    </Box>
  );
}
