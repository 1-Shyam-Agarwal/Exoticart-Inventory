import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DeleteProductDialog({ product, onCancel, onConfirm }) {
  return (
    <Dialog open={Boolean(product)} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: '1rem', fontWeight: 500 }}>Delete product</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ fontSize: '0.875rem' }}>
          Are you sure you want to delete{' '}
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
            {product?.productName}
          </Box>
          ? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none', borderRadius: 1, borderColor: 'border.main', color: 'text.primary' }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(product)}
          variant="contained"
          color="error"
          size="small"
          sx={{ textTransform: 'none', borderRadius: 1 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
