import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';

const ITEMS = [
  {
    id: '1',
    label: 'Electronics',
    children: [
      { id: '1.1', label: 'Wireless Mouse' },
      { id: '1.2', label: 'Bluetooth Keyboard' },
      { id: '1.3', label: '27" Monitor' },
      { id: '1.4', label: 'LED Desk Lamp' },
    ],
  },
  {
    id: '2',
    label: 'Furniture',
    children: [
      { id: '2.1', label: 'Office Chair' },
      { id: '2.2', label: 'Standing Desk' },
      { id: '2.3', label: 'Filing Cabinet' },
    ],
  },
  {
    id: '3',
    label: 'Stationery',
    children: [
      { id: '3.1', label: 'A4 Paper Ream' },
      { id: '3.2', label: 'Gel Pen Pack' },
      { id: '3.3', label: 'Whiteboard Markers' },
    ],
  },
  { id: '4', label: 'Accessories' },
];

export function CategoryTreeView() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Product Categories
        </Typography>
        <RichTreeView
          items={ITEMS}
          aria-label="product categories"
          defaultExpandedItems={['1']}
          sx={{ m: '0 -8px', pb: '8px', height: 'fit-content', flexGrow: 1, overflowY: 'auto' }}
        />
      </CardContent>
    </Card>
  );
}
