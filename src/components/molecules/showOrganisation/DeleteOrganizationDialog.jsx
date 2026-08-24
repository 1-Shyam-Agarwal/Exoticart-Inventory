import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DeleteOrganizationDialog({
  open,
  organizationName,
  isDeleting,
  errorMessage,
  onCancel,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 600 ,py:2 }}>Delete organization</DialogTitle>

      <DialogContent sx={{py:0.5}}>
        <DialogContentText sx={{ color: 'text.secondary' }}>
          Are you sure you want to delete{' '}
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 500 }}>
            {organizationName}
          </Box>
         {' '} ?
        </DialogContentText>

        <DialogContentText sx={{ color: 'text.secondary' }}>
          This action cannot be undone.
        </DialogContentText>

        {errorMessage && (
          <DialogContentText sx={{ color: 'error.main', mt: 1.5 }}>
            {errorMessage}
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onCancel}
          disabled={isDeleting}
          sx={{ textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant="contained"
          sx={{ textTransform: 'none' , color:"white" ,bgcolor:"red"}}
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
