import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { FieldHint } from '../../atoms/products/FieldHint';
import { ManageBoxTypesModal } from './ManageBoxTypesModal';
import { ProductSelectField } from './ProductSelectField';
import { createBoxType, deleteBoxType, listBoxTypes, updateBoxType } from '../../../services/dropdownOptions';

const boxTypeModalDetails = {
  title: 'Manage Box Types',
  addButtonLabel: 'New Box Type',
  listLabel: 'BOX TYPES',
  itemPlaceholder: 'Box type name, e.g. Box of 12',
  emptyText: 'No box types added yet.',
};

export function BoxTypeSelectField() {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();

  const boxType = watch('boxType');
  const numberOfItems = watch('numberOfItems');

  const [isModal, setIsModal] = useState(false);

  const boxTypesQuery = useQuery({
    queryKey: ['boxTypes', organizationId],
    queryFn: () => listBoxTypes(organizationId),
    enabled: Boolean(organizationId),
  });

  const boxTypes = boxTypesQuery.data?.boxTypes ?? [];

  const createBoxTypeMutation = useMutation({
    mutationFn: ({ name, numberOfItems }) => createBoxType({ organizationId, name, numberOfItems }),
    onSuccess: (result, variables) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not add box type');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['boxTypes', organizationId] });
      setValue('boxType', variables.name, { shouldValidate: true });
      setValue('numberOfItems', variables.numberOfItems, { shouldValidate: true });
    },
  });

  const deleteBoxTypeMutation = useMutation({
    mutationFn: ({ id }) => deleteBoxType(id),
    onSuccess: (result, { name }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not delete box type');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['boxTypes', organizationId] });
      if (getValues('boxType') === name) {
        setValue('boxType', '', { shouldValidate: true });
        setValue('numberOfItems', '', { shouldValidate: true });
      }
    },
  });

  const updateBoxTypeMutation = useMutation({
    mutationFn: ({ id, name, numberOfItems }) => updateBoxType({ id, name, numberOfItems }),
    onSuccess: (result, { oldName, name, numberOfItems }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not update box type');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['boxTypes', organizationId] });
      if (getValues('boxType') === oldName) {
        setValue('boxType', name, { shouldValidate: true });
        setValue('numberOfItems', numberOfItems, { shouldValidate: true });
      }
    },
    onError: () => {
      toast.error('Could not update box type');
    },
  });

  function onAddBoxTypeHandler({ name, numberOfItems }) {
    createBoxTypeMutation.mutate({ name, numberOfItems });
  }

  function handleDeleteBoxType(name) {
    const target = boxTypes.find((item) => item.name === name);
    if (!target) return;
    deleteBoxTypeMutation.mutate({ id: target.id, name });
  }

  function onEditBoxTypeHandler(oldName, { name, numberOfItems }) {
    const target = boxTypes.find((item) => item.name === oldName);
    if (!target) return;
    updateBoxTypeMutation.mutate({ id: target.id, name, numberOfItems, oldName });
  }

  function handleSelectBoxType(selectedName) {
    const selected = boxTypes.find((item) => item.name === selectedName);
    setValue('numberOfItems', selected ? selected.numberOfItems : '', { shouldDirty: true, shouldValidate: true });
  }

  function onCloseHandler() {
    setIsModal(false);
  }

  return (
    <>
      <ProductSelectField
        control={control}
        name="boxType"
        htmlFor="product-box-type"
        label="Box type"
        error={errors.boxType?.message}
        placeholder="Select or Add Box Type"
        options={boxTypes.map((item) => ({ value: item.name, label: `${item.name} (${item.numberOfItems} items)` }))}
        manageOption={{ label: 'Add / Manage box types', onSelectHandler: () => setIsModal(true) }}
        onValueChange={handleSelectBoxType}
      />
      {boxType && <FieldHint>Contains {numberOfItems} items per box.</FieldHint>}

      <ManageBoxTypesModal
        open={isModal}
        modalDetails={boxTypeModalDetails}
        items={boxTypes}
        onCloseHandler={onCloseHandler}
        onAddItemHandler={onAddBoxTypeHandler}
        onEditItemHandler={onEditBoxTypeHandler}
        onDeleteItem={handleDeleteBoxType}
      />
    </>
  );
}
