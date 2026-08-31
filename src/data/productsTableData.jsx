import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

const AVATAR_COLORS = ['#8AB4F8', '#81C995', '#FDD663', '#F28B82', '#C58AF9'];

export function renderProductImage(params) {
  const index = params.id % AVATAR_COLORS.length;

  return (
    <Avatar
      variant="rounded"
      sx={{
        width: 44,
        height: 44,
        bgcolor: AVATAR_COLORS[index],
        color: '#202124',
      }}
    >
      <Inventory2RoundedIcon sx={{ fontSize: 24 }} />
    </Avatar>
  );
}

function renderReturnable(value) {
  return (
    <Chip
      label={value ? 'Yes' : 'No'}
      color={value ? 'success' : 'default'}
      size="small"
      variant={value ? 'filled' : 'outlined'}
    />
  );
}

export const columns = [
  { field: 'images', headerName: 'Image', width: 96, sortable: false, renderCell: renderProductImage },
  { field: 'productName', headerName: 'Product Name', flex: 1.4, minWidth: 200 },
  { field: 'brand', headerName: 'Brand', flex: 0.9, minWidth: 130 },
  { field: 'manufacturer', headerName: 'Manufacturer', flex: 1.2, minWidth: 180 },
  { field: 'category', headerName: 'Category', flex: 0.9, minWidth: 140 },
  {
    field: 'reorderStock',
    headerName: 'Reorder Stock',
    headerAlign: 'right',
    align: 'right',
    flex: 0.7,
    minWidth: 120,
  },
  {
    field: 'availableStock',
    headerName: 'Available / Reorder Stock',
    headerAlign: 'right',
    align: 'right',
    flex: 0.9,
    minWidth: 170,
    renderCell: (params) => `${params.value}/${params.row.reorderStock}`,
  },
  {
    field: 'sellingPrice',
    headerName: 'Selling Price',
    headerAlign: 'right',
    align: 'right',
    flex: 0.8,
    minWidth: 120,
    renderCell: (params) => formatCurrency(params.value),
  },
  {
    field: 'purchasePrice',
    headerName: 'Purchase Price',
    headerAlign: 'right',
    align: 'right',
    flex: 0.8,
    minWidth: 130,
    renderCell: (params) => formatCurrency(params.value),
  },
  {
    field: 'returnable',
    headerName: 'Returnable Item',
    flex: 0.8,
    minWidth: 130,
    renderCell: (params) => renderReturnable(params.value),
  },
];

const PRODUCT_TEMPLATES = [
  { name: 'Stainless Steel Water Bottle 1L', brand: 'Acme', manufacturer: 'Acme Industries Pvt Ltd', category: 'Home & Kitchen', selling: 499, purchase: 320 },
  { name: 'Wireless Mouse', brand: 'Logitech', manufacturer: 'Logitech India Pvt Ltd', category: 'Electronics', selling: 799, purchase: 550 },
  { name: 'Office Chair', brand: 'ErgoComfort', manufacturer: 'ErgoComfort Furnishings', category: 'Other', selling: 6499, purchase: 4200 },
  { name: 'A4 Paper Ream', brand: 'PaperPro', manufacturer: 'PaperPro Mills Ltd', category: 'Stationery', selling: 249, purchase: 180 },
  { name: 'LED Desk Lamp', brand: 'Philips', manufacturer: 'Philips Lighting Pvt Ltd', category: 'Home & Kitchen', selling: 899, purchase: 610 },
  { name: 'Bluetooth Keyboard', brand: 'Logitech', manufacturer: 'Logitech India Pvt Ltd', category: 'Electronics', selling: 1299, purchase: 900 },
  { name: 'Standing Desk', brand: 'ErgoComfort', manufacturer: 'ErgoComfort Furnishings', category: 'Other', selling: 12999, purchase: 9500 },
  { name: 'Gel Pen Pack', brand: 'PaperPro', manufacturer: 'PaperPro Mills Ltd', category: 'Stationery', selling: 120, purchase: 80 },
  { name: '20000mAh Power Bank', brand: 'Acme', manufacturer: 'Acme Industries Pvt Ltd', category: 'Electronics', selling: 1899, purchase: 1300 },
  { name: '27" Monitor', brand: 'Philips', manufacturer: 'Philips Lighting Pvt Ltd', category: 'Electronics', selling: 15999, purchase: 11200 },
];

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

const PRODUCT_COUNT = 100;

export const rows = Array.from({ length: PRODUCT_COUNT }, (_, index) => {
  const template = PRODUCT_TEMPLATES[index % PRODUCT_TEMPLATES.length];
  const batch = Math.floor(index / PRODUCT_TEMPLATES.length) + 1;
  const variance = (index * 37) % 50;

  return {
    id: index + 1,
    productName: batch > 1 ? `${template.name} - Batch ${batch}` : template.name,
    brand: template.brand,
    manufacturer: template.manufacturer,
    category: template.category,
    reorderStock: 5 + (index % 10) * 5,
    availableStock: variance,
    sellingPrice: template.selling + variance * 2,
    purchasePrice: template.purchase + variance,
    returnable: index % 3 !== 0,
  };
});

export const searchFieldOptions = [
  { value: 'productName', label: 'Product Name' },
  { value: 'brand', label: 'Brand' },
  { value: 'manufacturer', label: 'Manufacturer' },
  { value: 'category', label: 'Category' },
];

export const returnableFilterOptions = [
  { value: '', label: 'All items' },
  { value: 'yes', label: 'Returnable' },
  { value: 'no', label: 'Not returnable' },
];

export const defaultProductFilters = {
  searchField: 'productName',
  searchValue: '',
  category: '',
  returnable: '',
};

export function filterProductRows(sourceRows, filters) {
  const searchValue = filters.searchValue.trim().toLowerCase();

  return sourceRows.filter((row) => {
    if (searchValue) {
      const fieldValue = String(row[filters.searchField] ?? '').toLowerCase();
      if (!fieldValue.includes(searchValue)) return false;
    }

    if (filters.category && row.category !== filters.category) return false;
    if (filters.returnable === 'yes' && !row.returnable) return false;
    if (filters.returnable === 'no' && row.returnable) return false;

    return true;
  });
}

export function toProductFormValues(row) {
  return {
    name: row.productName,
    brand: row.brand,
    manufacturer: row.manufacturer,
    category: row.category,
    reorderPoint: row.reorderStock,
    initialAmount: row.availableStock,
    sellingPrice: row.sellingPrice,
    costPrice: row.purchasePrice,
    returnable: row.returnable,
  };
}

export function applyProductFormValues(row, values) {
  return {
    ...row,
    productName: values.name,
    brand: values.brand,
    manufacturer: values.manufacturer,
    category: values.category,
    reorderStock: values.reorderPoint,
    availableStock: values.initialAmount,
    sellingPrice: values.sellingPrice,
    purchasePrice: values.costPrice,
    returnable: values.returnable,
  };
}
