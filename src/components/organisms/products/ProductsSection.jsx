import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { ProductsToolbar } from '../../molecules/products/ProductsToolbar';
import { ProductsFilters } from '../../molecules/products/ProductsFilters';
import { ProductsDataGrid } from '../../molecules/products/ProductsDataGrid';
import { DeleteProductDialog } from '../../molecules/products/DeleteProductDialog';
import { ProductFormDrawer } from './ProductFormDrawer';
import {
  applyProductFormValues,
  defaultProductFilters,
  filterProductRows,
  rows as initialRows,
  toProductFormValues,
} from '../../../data/productsTableData';

export function ProductsSection() {
  const [view, setView] = useState('list');
  const [productRows, setProductRows] = useState(initialRows);
  const [filters, setFilters] = useState(defaultProductFilters);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredRows = useMemo(() => filterProductRows(productRows, filters), [productRows, filters]);

  function handleOpenDrawer() {
    console.time('drawer-open'); // TEMP: measuring open latency, remove after
    setIsDrawerOpen(true);
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  }

  function handleConfirmDelete(product) {
    setProductRows((prev) => prev.filter((row) => row.id !== product.id));
    setDeleteTarget(null);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <ProductsToolbar view={view} onViewChange={setView} clickHandler={handleOpenDrawer} />

      <ProductsFilters filters={filters} onChange={setFilters} />

      <ProductsDataGrid rows={filteredRows} onEdit={handleEdit} onDelete={setDeleteTarget} />

      {/* Rendered unconditionally so the Drawer's slide-out transition can run.
          A temporary Drawer keeps its children unmounted while closed anyway. */}
      <ProductFormDrawer
        closeHandler={handleCloseDrawer}
        isDrawerOpen={isDrawerOpen}
      />
    </Box>
  );
}
