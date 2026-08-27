import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { productDefaultValues, productSchema } from '../../../validation/productSchema';
import { ProductDetailsSection } from '../../molecules/products/ProductDetailsSection';
import { ItemDetailsSection } from '../../molecules/products/ItemDetailsSection';
import { PricingSection } from '../../molecules/products/PricingSection';
import { DimensionsSection } from '../../molecules/products/DimensionsSection';

function FormSectionDivider() {
  return (
    <Divider 
      sx={{
        borderStyle: 'dashed',
        borderColor: 'rgba(255, 255, 255, 0.28)',
        my: 4
      }} 
    />
  );
}

export function ProductFormDrawer({ isDrawerOpen, closeHandler }) {

  const methods = useForm({
    defaultValues: productDefaultValues,
    resolver: zodResolver(productSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  function handleClose() {
    reset();
    closeHandler();
  }

  const onSubmit = (values) => {
    console.log("values : " , values)
    handleClose()
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={closeHandler}
      slotProps={{
        paper: {
          sx: { width: { xs: '100%', sm: '40%' }, bgcolor: '#141416', backgroundImage: 'none' },
        },
      }}
    >
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Stack
            direction="row"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3.5,
              py:2,
              borderColor: 'rgba(255, 255, 255, 0.28)',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: 'text.primary' }}>
                New product
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                Add a new item to your Inventory.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button
                type="button"
                variant="outlined"
                size="small"
                onClick={handleClose}
                sx={{
                  textTransform: 'none',
                  borderRadius: 1,
                  borderColor: 'rgba(255, 255, 255, 0.28)',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'background.muted' },
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={isSubmitting}
                sx={{ textTransform: 'none', borderRadius: 1, fontWeight: 500 }}
              >
                Create
              </Button>
            </Stack>
          </Stack>

          <Box sx={{ px: 3.5, py: 3.5, overflowY: 'auto', flex: 1, minHeight: 0 }}>
            <ProductDetailsSection />
            <FormSectionDivider />
            <ItemDetailsSection />
            <FormSectionDivider />
            <PricingSection />
            <FormSectionDivider />
            <DimensionsSection />
          </Box>
        </Box>
      </FormProvider>
    </Drawer>
  );
}
