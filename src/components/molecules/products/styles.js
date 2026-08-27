export const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1,
    fontSize: '0.85rem',
  },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.28)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.46)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
  '& .MuiInputLabel-root': { color: 'text.secondary', fontSize: '0.85rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
  '& .MuiOutlinedInput-input': { color: 'text.primary' },
};

export const selectMenuPaperSx = {
  bgcolor: 'background.paper',
  border: '1px solid',
  borderColor: 'rgba(255, 255, 255, 0.28)',
};

export const checkMenuItemSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1,
  fontSize: '0.8rem',
  minHeight: 32,
  py: 0.5,
  '&.Mui-selected': {
    bgcolor: 'background.muted',
  },
  '&.Mui-selected:hover': {
    bgcolor: 'background.muted',
  },
};

export const toggleGroupSx = {
  width: '100%',
  '& .MuiToggleButtonGroup-grouped': {
    flex: 1,
    py: 0.5,
    textTransform: 'none',
    fontSize: '0.8rem',
    color: 'text.secondary',
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: 1,
  },
  '& .Mui-selected': {
    bgcolor: 'background.muted',
    color: 'text.primary !important',
  },
};

export const switchRowSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
};
