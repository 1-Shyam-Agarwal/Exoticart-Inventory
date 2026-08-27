import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

import { fieldSx } from './styles';

export function ManageOptionsModal({
  open,
  modalDetails,
  items,
  onCloseHandler,
  onAddItemHandler,
  onEditItemHandler,
  onDeleteItem,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  function resetAddState() {
    setIsAdding(false);
    setNewItemName('');
  }

  function cancelEditing() {
    setEditingItem(null);
    setEditValue('');
  }

  function handleClose() {
    resetAddState();
    cancelEditing();
    onCloseHandler();
  }

  function handleAddItem() {
    const trimmed = newItemName.trim();
    if (!trimmed) return;
    onAddItemHandler(trimmed);
    resetAddState();
  }

  function startEditing(item) {
    setEditingItem(item);
    setEditValue(item);
  }

  function saveEditing() {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === editingItem) {
      cancelEditing();
      return;
    }
    onEditItemHandler(editingItem, trimmed);
    cancelEditing();
  }

  const hasItems = Boolean(items?.length);

  const addForm = (
    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
      <TextField
        autoFocus
        size="small"
        fullWidth
        placeholder={modalDetails.itemPlaceholder}
        value={newItemName}
        onChange={(event) => setNewItemName(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleAddItem();
          }
        }}
        sx={fieldSx}
      />
      <Button
        variant="contained"
        size="small"
        onClick={handleAddItem}
        sx={{ textTransform: 'none', borderRadius: 1, flexShrink: 0 }}
      >
        Add
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={resetAddState}
        sx={{ textTransform: 'none', borderRadius: 1, flexShrink: 0 }}
      >
        Cancel
      </Button>
    </Stack>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 1.5 } } }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          bgcolor: 'background.paper',
        }}
      >
        <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.primary' }}>
          {modalDetails.title}
        </Typography>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'error.main' }}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: 0.5, color: 'text.secondary' }}>
            {modalDetails.listLabel}
          </Typography>

          {hasItems && !isAdding && (
            <Button
              size="small"
              startIcon={<AddCircleRoundedIcon fontSize="small" />}
              onClick={() => setIsAdding(true)}
              sx={{ textTransform: 'none', fontSize: '0.8rem', color: 'primary.main', minWidth: 0, px: 0.5 }}
            >
              {modalDetails.addButtonLabel}
            </Button>
          )}
        </Stack>

        {hasItems && isAdding && <Box sx={{ mt: 1.5 }}>{addForm}</Box>}

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', mt: 1.5 }} />

        {hasItems ? (
          <List sx={{ maxHeight: 240, overflowY: 'auto', px: 0, py: 0.5 }}>
            {items.map((item) => {
              const isEditing = editingItem === item;

              const rowSx = {
                px: 0,
                py: 1,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                '&:last-of-type': { borderBottom: 'none' },
              };

              if (isEditing) {
                return (
                  <ListItem key={item} dense disableGutters sx={rowSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      <FolderOutlinedIcon fontSize="small" sx={{ color: 'primary.main', flexShrink: 0 }} />
                      <TextField
                        autoFocus
                        size="small"
                        fullWidth
                        value={editValue}
                        onChange={(event) => setEditValue(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            saveEditing();
                          }
                          if (event.key === 'Escape') {
                            cancelEditing();
                          }
                        }}
                        sx={fieldSx}
                      />
                      <IconButton
                        size="small"
                        onClick={saveEditing}
                        sx={{ color: 'success.main', flexShrink: 0 }}
                        aria-label={`Save ${item}`}
                      >
                        <CheckRoundedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={cancelEditing}
                        sx={{ color: 'text.secondary', flexShrink: 0 }}
                        aria-label="Cancel edit"
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                );
              }

              return (
                <ListItem
                  key={item}
                  dense
                  secondaryAction={
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => startEditing(item)}
                        sx={{ color: 'text.secondary' }}
                        aria-label={`Edit ${item}`}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => onDeleteItem(item)}
                        sx={{ color: 'text.secondary' }}
                        aria-label={`Delete ${item}`}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                  sx={rowSx}
                >
                  <FolderOutlinedIcon fontSize="small" sx={{ color: 'primary.main', mr: 1.5 }} />
                  <ListItemText
                    primary={item}
                    slotProps={{ primary: { sx: { fontSize: '0.85rem', color: 'text.primary' } } }}
                  />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', py: 4 }}>
            {isAdding ? (
              addForm
            ) : (
              <>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                  {modalDetails.emptyText}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setIsAdding(true)}
                  sx={{ textTransform: 'none', borderRadius: 1, px: 2.5 }}
                >
                  {modalDetails.addButtonLabel}
                </Button>
              </>
            )}
          </Stack>
        )}
      </Box>

      <Box sx={{ px: 2.5, pb: 2, pt: 0.5 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleClose}
          sx={{ textTransform: 'none', borderRadius: 1, borderColor: 'rgba(255, 255, 255, 0.16)', color: 'text.primary' }}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
}
