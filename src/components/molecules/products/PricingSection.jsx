import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { ProductFormSectionHeader } from './ProductFormSectionHeader';
import { ProductSelectField } from './ProductSelectField';
import { currencyOptions } from '../../../data/productFormOptions';
import { fieldSx, switchRowSx } from './styles';
import FormField from '../setupOrganisation/FormField';
import FieldError from '../../atoms/setupOrganisation/FieldError';

export function PricingSection() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const currencyCode = watch('currency');
  const currencySymbol = currencyOptions.find((option) => option.code === currencyCode)?.symbol ?? '';

  return (
    <Box>
      <ProductFormSectionHeader title="Pricing" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ProductSelectField
            control={control}
            name="currency"
            htmlFor="product-currency"
            label="Currency"
            error={errors.currency?.message}
            options={currencyOptions.map((option) => ({ value: option.code, label: option.label }))}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Selling price"
              fullWidth
              type="number"
              error={Boolean(errors.sellingPrice)}
              sx={fieldSx}
              {...register('sellingPrice', { valueAsNumber: true })}
              slotProps={{
                htmlInput: { min: 0, step: '1' },
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                },
              }}
            />
          {errors.sellingPrice?.message && <FieldError message={errors.sellingPrice?.message}/>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Cost price"
              fullWidth
              type="number"
              error={Boolean(errors.costPrice)}
              sx={fieldSx}
              {...register('costPrice', { valueAsNumber: true })}
              slotProps={{
                htmlInput: { min: 0, step: '0.01' },
                input: {
                  startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
                },
              }}
            />
          {errors.costPrice?.message && <FieldError message={errors.costPrice?.message}/>}
        </Grid>

        <Grid size={12}>
          <Box sx={switchRowSx}>
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 500, color: 'text.primary' }}>
                Returnable item
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                Allow customers to return this item within your policy window.
              </Typography>
            </Box>

            <Controller
              name="returnable"
              control={control}
              render={({ field }) => (
                <Switch
                  size="small"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
