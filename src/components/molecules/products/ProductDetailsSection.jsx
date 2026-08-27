import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FieldError from '../../atoms/setupOrganisation/FieldError';

import FormField from '../setupOrganisation/FormField';
import { BrandSelectField } from './BrandSelectField';
import { CategorySelectField } from './CategorySelectField';
import { ManufacturerSelectField } from './ManufacturerSelectField';
import { ProductFormSectionHeader } from './ProductFormSectionHeader';
import { ProductImagesUpload } from './ProductImagesUpload';
import { fieldSx, toggleGroupSx } from './styles';
import FieldLabel from '../../atoms/setupOrganisation/FieldLabel';

export function
ProductDetailsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <ProductFormSectionHeader title="Product details"/>

      <Grid container spacing={3}>
        <Grid size={12}>
            <TextField
              id="product-name"
              label="Product name"
              fullWidth
              placeholder="K-600 Cage"
              error={Boolean(errors.name)}
              sx={fieldSx}
              {...register('name')}
            />
            {errors.name?.message && <FieldError message={errors.name?.message}/>}
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <CategorySelectField />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <BrandSelectField />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <ManufacturerSelectField />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <FieldLabel required>Type</FieldLabel>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <ToggleButtonGroup
                  value={field.value}
                  exclusive
                  fullWidth
                  size="small"
                  onChange={(_event, value) => value && field.onChange(value)}
                  sx={toggleGroupSx}
                >
                  <ToggleButton value="goods" sx={{mr:1}}>Goods</ToggleButton>
                  <ToggleButton value="service">Service</ToggleButton>
                </ToggleButtonGroup>
              )}
            />
          {errors.type?.message && <FieldError message={errors.type?.message}/>}
        </Grid>

        <Grid size={12}>
          <ProductImagesUpload error={errors.images?.message} />
        </Grid>
      </Grid>
    </Box>
  );
}
