import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import FormField from '../setupOrganisation/FormField';
import { ProductFormSectionHeader } from './ProductFormSectionHeader';
import { ProductSelectField } from './ProductSelectField';
import { dimensionUnitOptions, weightUnitOptions } from '../../../data/productFormOptions';
import { fieldSx } from './styles';
import FieldError from '../../atoms/setupOrganisation/FieldError';

export function DimensionsSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box>
      <ProductFormSectionHeader title="Dimensions & weight" />

      <Grid container spacing={3}>
        <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Length"
              fullWidth
              type="number"
              error={Boolean(errors.length)}
              sx={fieldSx}
              {...register('length', { valueAsNumber: true })}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          {errors.length?.message && <FieldError message={errors.length?.message}/>}
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Width"
              fullWidth
              type="number"
              error={Boolean(errors.width)}
              sx={fieldSx}
              {...register('width', { valueAsNumber: true })}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          {errors.width?.message && <FieldError message={errors.width?.message}/>}
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Height"
              fullWidth
              type="number"
              error={Boolean(errors.height)}
              sx={fieldSx}
              {...register('height', { valueAsNumber: true })}
              slotProps={{ htmlInput: { min: 0 } }}
            />
          {errors.height?.message && <FieldError message={errors.height?.message}/>}
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <ProductSelectField
            control={control}
            name="dimensionUnit"
            htmlFor="product-dimension-unit"
            label="Dimension unit"
            error={errors.dimensionUnit?.message}
            options={dimensionUnitOptions.map((option) => ({ value: option, label: option }))}
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Weight"
              fullWidth
              type="number"
              error={Boolean(errors.weight)}
              sx={fieldSx}
              {...register('weight', { valueAsNumber: true })}
              slotProps={{ htmlInput: { min: 0 } }}
            />
            {errors.weight?.message && <FieldError message={errors.weight?.message}/>}
        </Grid>

        <Grid size={{ xs: 6, sm: 3 }}>
          <ProductSelectField
            control={control}
            name="weightUnit"
            htmlFor="product-weight-unit"
            label="Weight unit"
            error={errors.weightUnit?.message}
            options={weightUnitOptions.map((option) => ({ value: option, label: option }))}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
