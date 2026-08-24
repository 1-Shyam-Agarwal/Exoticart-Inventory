import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', { month: 'short' });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        color="#8AB4F8"
        xAxis={{ scaleType: 'band', data }}
      />
    </div>
  );
}

const STATUS_COLORS = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'error',
};

function renderStatus(status) {
  return <Chip label={status} color={STATUS_COLORS[status]} size="small" />;
}

export function renderAvatar(params) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: '24px',
        height: '24px',
        fontSize: '0.85rem',
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: 'itemName', headerName: 'Item', flex: 1.5, minWidth: 200 },
  { field: 'category', headerName: 'Category', flex: 1, minWidth: 140 },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.8,
    minWidth: 110,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    headerAlign: 'right',
    align: 'right',
    flex: 0.6,
    minWidth: 90,
  },
  {
    field: 'unitPrice',
    headerName: 'Unit Price',
    headerAlign: 'right',
    align: 'right',
    flex: 0.7,
    minWidth: 100,
  },
  {
    field: 'stockTrend',
    headerName: '30-Day Trend',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
];

export const rows = [
  {
    id: 1,
    itemName: 'Wireless Mouse',
    category: 'Electronics',
    status: 'In Stock',
    quantity: 420,
    unitPrice: '₹599',
    stockTrend: [180, 220, 260, 240, 280, 300, 340, 360, 320, 380, 400, 420],
  },
  {
    id: 2,
    itemName: 'Bluetooth Keyboard',
    category: 'Electronics',
    status: 'In Stock',
    quantity: 310,
    unitPrice: '₹1,299',
    stockTrend: [260, 250, 270, 290, 300, 280, 310, 320, 300, 315, 305, 310],
  },
  {
    id: 3,
    itemName: 'USB-C Cable 1m',
    category: 'Accessories',
    status: 'Low Stock',
    quantity: 38,
    unitPrice: '₹199',
    stockTrend: [200, 180, 160, 140, 120, 100, 90, 70, 60, 50, 42, 38],
  },
  {
    id: 4,
    itemName: '20000mAh Power Bank',
    category: 'Electronics',
    status: 'Low Stock',
    quantity: 22,
    unitPrice: '₹1,899',
    stockTrend: [140, 130, 110, 100, 90, 80, 70, 60, 45, 35, 28, 22],
  },
  {
    id: 5,
    itemName: 'Office Chair',
    category: 'Furniture',
    status: 'In Stock',
    quantity: 65,
    unitPrice: '₹6,499',
    stockTrend: [40, 45, 50, 48, 55, 60, 58, 62, 60, 63, 64, 65],
  },
  {
    id: 6,
    itemName: 'Standing Desk',
    category: 'Furniture',
    status: 'Out of Stock',
    quantity: 0,
    unitPrice: '₹12,999',
    stockTrend: [30, 25, 20, 18, 12, 8, 5, 3, 1, 0, 0, 0],
  },
  {
    id: 7,
    itemName: 'A4 Paper Ream',
    category: 'Stationery',
    status: 'In Stock',
    quantity: 890,
    unitPrice: '₹249',
    stockTrend: [600, 650, 700, 680, 720, 760, 800, 820, 850, 860, 875, 890],
  },
  {
    id: 8,
    itemName: 'Gel Pen Pack',
    category: 'Stationery',
    status: 'In Stock',
    quantity: 540,
    unitPrice: '₹120',
    stockTrend: [400, 420, 450, 470, 460, 480, 500, 510, 520, 525, 530, 540],
  },
  {
    id: 9,
    itemName: 'LED Desk Lamp',
    category: 'Electronics',
    status: 'Low Stock',
    quantity: 15,
    unitPrice: '₹899',
    stockTrend: [90, 85, 78, 70, 65, 55, 48, 40, 32, 25, 18, 15],
  },
  {
    id: 10,
    itemName: 'Whiteboard Markers',
    category: 'Stationery',
    status: 'In Stock',
    quantity: 310,
    unitPrice: '₹89',
    stockTrend: [220, 240, 250, 260, 270, 280, 290, 295, 300, 305, 308, 310],
  },
  {
    id: 11,
    itemName: 'Filing Cabinet',
    category: 'Furniture',
    status: 'Out of Stock',
    quantity: 0,
    unitPrice: '₹8,299',
    stockTrend: [12, 10, 8, 6, 5, 4, 3, 2, 1, 0, 0, 0],
  },
  {
    id: 12,
    itemName: '27" Monitor',
    category: 'Electronics',
    status: 'In Stock',
    quantity: 48,
    unitPrice: '₹15,999',
    stockTrend: [20, 24, 28, 30, 34, 36, 38, 40, 42, 44, 46, 48],
  },
];
