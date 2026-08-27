import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ManageOptionsModal } from './ManageOptionsModal';
import { ProductSelectField } from './ProductSelectField';
import { createBrand, deleteBrand, listBrands, updateBrand } from '../../../services/dropdownOptions';

const brandModalDetails = {
  title: "Manage Brands",
  addButtonLabel: "New Brand",
  listLabel: "BRANDS",
  itemPlaceholder: "Brand name",
  emptyText: "No brands added yet.",
}

export function BrandSelectField() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);

  // fetch exisiting brands 
  const {
    data
  } = useQuery({
    queryKey: ['brands', organizationId],
    queryFn: () => listBrands(organizationId),
    enabled: Boolean(organizationId),
  });

  let brands = data?.brands ?? [];

  // create new brand in the db
  const createBrandMutation = useMutation({
    mutationFn: (brandName) => createBrand({ organizationId, brand: brandName }),
    onSuccess: (result, brandName) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not add brand');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['brands', organizationId] });
      setValue('brand', brandName, { shouldValidate: true });
    },
  });

  // delete a exisitng brand 
  const deleteBrandMutation = useMutation({
    mutationFn: ({ id }) => deleteBrand(id),
    onSuccess: (result, { name }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not delete brand');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['brands', organizationId] });
      if (getValues('brand') === name) {
        setValue('brand', '', { shouldValidate: true });
      }
    },
  });

  const updateBrandMutation = useMutation({
    mutationFn: ({ id, brand }) => updateBrand({ id, brand }),
    onSuccess: (result, { oldName, brand }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not update brand');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['brands', organizationId] });
      if (getValues('brand') === oldName) {
        setValue('brand', brand, { shouldValidate: true });
      }
    },
    onError: () => {
      toast.error('Could not update brand');
    },
  });

  function onAddBrandHandler(brandName) {
    createBrandMutation.mutate(brandName);
  }

  function handleDeleteBrand(brandName) {
    const target = brands?.find((item) => item.brand === brandName);
    if (!target) return;
    deleteBrandMutation.mutate({ id: target.id, name: brandName });
  }

  function onEditBrandHandler(oldName, newName) {
    const target = brands?.find((item) => item.brand === oldName);
    if (!target) return;
    updateBrandMutation.mutate({ id: target.id, brand: newName, oldName });
  }

  function onCloseHandler(){
    setIsModal(false);
  }

  return (
    <>
      <ProductSelectField
        control={control}
        name="brand"
        label="Brand"
        labelId='product-brands'
        error={errors.brand?.message}
        options={brands?.map((option) => ({ value: option.brand, label: option.brand }))}
        manageOption={{ label: 'Add / Manage brands', onSelectHandler: () => setIsModal(true) }}
      />

      <ManageOptionsModal
        open={isModal}
        modalDetails={brandModalDetails}
        items={brands?.map((option) => option.brand)}
        onCloseHandler={onCloseHandler}
        onAddItemHandler={onAddBrandHandler}
        onEditItemHandler={onEditBrandHandler}
        onDeleteItem={handleDeleteBrand}
      />
    </>
  );
}
