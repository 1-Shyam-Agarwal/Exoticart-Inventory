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
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { fieldSx } from './styles';
import FieldError from '../../atoms/setupOrganisation/FieldError';

export function ManageBoxTypesModal({
  open,
  modalDetails,
  items,
  onCloseHandler,
  onAddItemHandler,
  onEditItemHandler,
  onDeleteItem,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [error , setError] = useState('')
  const [numberOfItems, setNumberOfItems] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editName, setEditName] = useState('');
  const [editNumberOfItems, setEditNumberOfItems] = useState('');

  function resetAddState() {
    setIsAdding(false);
    setName('');
    setNumberOfItems('');
  }

  function cancelEditing() {
    setEditingItem(null);
    setEditName('');
    setEditNumberOfItems('');
  }

  function handleClose() {
    resetAddState();
    cancelEditing();
    onCloseHandler();
  }

  function handleAddItem() {
    setError('');
    const trimmedName = name.trim();
    const count = Number(numberOfItems);
    if (!trimmedName || !Number.isFinite(count) || count <= 0) {
        setError("Name or count is invalid. Please check.")
        return;
    };
    onAddItemHandler({ name: trimmedName, numberOfItems: count });
    resetAddState();
  }

  function startEditing(item) {
    setEditingItem(item.name);
    setEditName(item.name);
    setEditNumberOfItems(String(item.numberOfItems));
  }

  function saveEditing() {
    const trimmedName = editName.trim();
    const count = Number(editNumberOfItems);
    if (!trimmedName || !Number.isFinite(count) || count <= 0) return;
    onEditItemHandler(editingItem, { name: trimmedName, numberOfItems: count });
    cancelEditing();
  }

  const hasItems = Boolean(items?.length);

  const addForm = (
    <Stack spacing={1.5} sx={{ width: '100%' }}>
    <Stack>
      <Stack direction="row" spacing={1}>
        <TextField
          autoFocus
          size="small"
          fullWidth
          placeholder={modalDetails.itemPlaceholder}
          value={name}
          onChange={(event) => setName(event.target.value)}
          sx={fieldSx}
        />
        <TextField
          size="small"
          type="number"
          placeholder="Items"
          value={numberOfItems}
          onChange={(event) => setNumberOfItems(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleAddItem();
            }
          }}
          slotProps={{ htmlInput: { min: 1 } }}
          sx={{ ...fieldSx, width: 110, flexShrink: 0 }}
        />
      </Stack>
      {error && <FieldError message={error}/>}
    </Stack>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={resetAddState}
          sx={{ textTransform: 'none', borderRadius: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddItem}
          sx={{ textTransform: 'none', borderRadius: 1 }}
        >
          Add
        </Button>
      </Stack>
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
              const isEditing = editingItem === item.name;

              const rowSx = {
                px: 0,
                py: 1,
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                '&:last-of-type': { borderBottom: 'none' },
              };

              if (isEditing) {
                return (
                  <ListItem key={item.name} dense disableGutters sx={rowSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                      <Inventory2OutlinedIcon fontSize="small" sx={{ color: 'primary.main', flexShrink: 0 }} />
                      <TextField
                        autoFocus
                        size="small"
                        fullWidth
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        sx={fieldSx}
                      />
                      <TextField
                        size="small"
                        type="number"
                        value={editNumberOfItems}
                        onChange={(event) => setEditNumberOfItems(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            saveEditing();
                          }
                          if (event.key === 'Escape') {
                            cancelEditing();
                          }
                        }}
                        slotProps={{ htmlInput: { min: 1 } }}
                        sx={{ ...fieldSx, width: 90, flexShrink: 0 }}
                      />
                      <IconButton
                        size="small"
                        onClick={saveEditing}
                        sx={{ color: 'success.main', flexShrink: 0 }}
                        aria-label={`Save ${item.name}`}
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
                  key={item.name}
                  dense
                  secondaryAction={
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() => startEditing(item)}
                        sx={{ color: 'text.secondary' }}
                        aria-label={`Edit ${item.name}`}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => onDeleteItem(item.name)}
                        sx={{ color: 'text.secondary' }}
                        aria-label={`Delete ${item.name}`}
                      >
                        <DeleteOutlineRoundedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                  sx={rowSx}
                >
                  <Inventory2OutlinedIcon fontSize="small" sx={{ color: 'primary.main', mr: 1.5 }} />
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.numberOfItems} items per box`}
                    slotProps={{
                      primary: { sx: { fontSize: '0.85rem', color: 'text.primary' } },
                      secondary: { sx: { fontSize: '0.75rem', color: 'text.secondary' } },
                    }}
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
