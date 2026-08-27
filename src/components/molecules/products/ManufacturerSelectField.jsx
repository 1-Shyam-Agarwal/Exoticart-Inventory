import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ManageOptionsModal } from './ManageOptionsModal';
import { ProductSelectField } from './ProductSelectField';
import { createManufacturer, deleteManufacturer, listManufacturers, updateManufacturer } from '../../../services/dropdownOptions';

const manufacturerModalDetails = {
  title: "Manage Manufacturers",
  addButtonLabel: "New Manufacturer",
  listLabel: "MANUFACTURERS",
  itemPlaceholder: "Manufacturer name",
  emptyText: "No manufacturers added yet.",
}

export function ManufacturerSelectField() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);

  const manufacturersQuery = useQuery({
    queryKey: ['manufacturers', organizationId],
    queryFn: () => listManufacturers(organizationId),
    enabled: Boolean(organizationId),
  });

  const manufacturers = manufacturersQuery.data?.manufacturers ?? [];

  const createManufacturerMutation = useMutation({
    mutationFn: (manufacturerName) => createManufacturer({ organizationId, manufacturer: manufacturerName }),
    onSuccess: (result, manufacturerName) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not add manufacturer');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['manufacturers', organizationId] });
      setValue('manufacturer', manufacturerName, { shouldValidate: true });
    },
  });

  const deleteManufacturerMutation = useMutation({
    mutationFn: ({ id }) => deleteManufacturer(id),
    onSuccess: (result, { name }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not delete manufacturer');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['manufacturers', organizationId] });
      if (getValues('manufacturer') === name) {
        setValue('manufacturer', '', { shouldValidate: true });
      }
    },
  });

  const updateManufacturerMutation = useMutation({
    mutationFn: ({ id, manufacturer }) => updateManufacturer({ id, manufacturer }),
    onSuccess: (result, { oldName, manufacturer }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not update manufacturer');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['manufacturers', organizationId] });
      if (getValues('manufacturer') === oldName) {
        setValue('manufacturer', manufacturer, { shouldValidate: true });
      }
    },
    onError: () => {
      toast.error('Could not update manufacturer');
    },
  });

  function onAddManufacturerHandler(manufacturerName) {
    createManufacturerMutation.mutate(manufacturerName);
  }

  function handleDeleteManufacturer(manufacturerName) {
    const target = manufacturers.find((item) => item.manufacturer === manufacturerName);
    if (!target) return;
    deleteManufacturerMutation.mutate({ id: target.id, name: manufacturerName });
  }

  function onEditManufacturerHandler(oldName, newName) {
    const target = manufacturers.find((item) => item.manufacturer === oldName);
    if (!target) return;
    updateManufacturerMutation.mutate({ id: target.id, manufacturer: newName, oldName });
  }

  function onCloseHandler() {
    setIsModal(false);
  }

  return (
    <>
      <ProductSelectField
        control={control}
        name="manufacturer"
        htmlFor="product-manufacturer"
        label="Manufacturer"
        error={errors.manufacturer?.message}
        placeholder="Select or Add Manufacturer"
        options={manufacturers.map((option) => ({ value: option.manufacturer, label: option.manufacturer }))}
        manageOption={{ label: 'Add / Manage manufacturers', onSelectHandler: () => setIsModal(true) }}
      />

      <ManageOptionsModal
        open={isModal}
        modalDetails={manufacturerModalDetails}
        items={manufacturers.map((option) => option.manufacturer)}
        onCloseHandler={onCloseHandler}
        onAddItemHandler={onAddManufacturerHandler}
        onEditItemHandler={onEditManufacturerHandler}
        onDeleteItem={handleDeleteManufacturer}
      />
    </>
  );
}
