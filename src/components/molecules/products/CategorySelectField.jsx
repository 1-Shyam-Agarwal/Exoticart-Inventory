import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ManageOptionsModal } from './ManageOptionsModal';
import { ProductSelectField } from './ProductSelectField';
import { createCategory, deleteCategory, listCategories, updateCategory } from '../../../services/dropdownOptions';

const categoryModalDetails = {
  title: "Manage Categories",
  addButtonLabel: "New Category",
  listLabel: "CATEGORIES",
  itemPlaceholder: "Category name",
  emptyText: "No categories added yet.",
}

export function CategorySelectField() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { id: organizationId } = useParams();
  const queryClient = useQueryClient();

  const [isModal, setIsModal] = useState(false);

  const {data} = useQuery({
    queryKey: ['categories', organizationId],
    queryFn: () => listCategories(organizationId),
    enabled: Boolean(organizationId),
  });

  const categories = data?.categories ?? [];

  const createCategoryMutation = useMutation({
    mutationFn: (categoryName) => createCategory({ organizationId, category: categoryName }),
    onSuccess: (result, categoryName) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not add category');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['categories', organizationId] });
      setValue('category', categoryName, { shouldValidate: true });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: ({ id }) => deleteCategory(id),
    onSuccess: (result, { name }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not delete category');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['categories', organizationId] });
      if (getValues('category') === name) {
        setValue('category', '', { shouldValidate: true });
      }
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, category }) => updateCategory({ id, category }),
    onSuccess: (result, { oldName, category }) => {
      if (!result.success) {
        toast.error(result.message ?? 'Could not update category');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['categories', organizationId] });
      if (getValues('category') === oldName) {
        setValue('category', category, { shouldValidate: true });
      }
    },
    onError: () => {
      toast.error('Could not update category');
    },
  });

  function onAddCategoryHandler(categoryName) {
    createCategoryMutation.mutate(categoryName);
  }

  function handleDeleteCategory(categoryName) {
    const target = categories.find((item) => item.category === categoryName);
    if (!target) return;
    deleteCategoryMutation.mutate({ id: target.id, name: categoryName });
  }

  function onEditCategoryHandler(oldName, newName) {
    const target = categories.find((item) => item.category === oldName);
    if (!target) return;
    updateCategoryMutation.mutate({ id: target.id, category: newName, oldName });
  }

  function onCloseHandler() {
    setIsModal(false);
  }

  return (
    <>
      <ProductSelectField
        control={control}
        name="category"
        htmlFor="product-category"
        label="Category"
        error={errors.category?.message}
        placeholder="Select a category"
        options={categories.map((option) => ({ value: option.category, label: option.category }))}
        manageOption={{ label: 'Add / Manage categories', onSelectHandler: () => setIsModal(true) }}
      />

      <ManageOptionsModal
        open={isModal}
        modalDetails={categoryModalDetails}
        items={categories.map((option) => option.category)}
        onCloseHandler={onCloseHandler}
        onAddItemHandler={onAddCategoryHandler}
        onEditItemHandler={onEditCategoryHandler}
        onDeleteItem={handleDeleteCategory}
      />
    </>
  );
}
