import { useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { FieldHint } from '../../atoms/products/FieldHint';

const MAX_IMAGES = 3;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }
      reject(new Error('Unable to read file.'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Unable to read file.'));
    reader.readAsDataURL(file);
  });
}

export function ProductImagesUpload({ error }) {
  const { setValue, watch } = useFormContext();
  const images = watch('images') || [];

  async function handleFiles(event) {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;

    const remainingSlots = MAX_IMAGES - images.length;
    const nextFiles = files.slice(0, remainingSlots);
    if (!nextFiles.length) return;

    const dataUrls = await Promise.all(nextFiles.map(readFileAsDataUrl));
    setValue('images', [...images, ...dataUrls], { shouldDirty: true, shouldValidate: true });
  }

  function handleRemove(index) {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
      { shouldDirty: true, shouldValidate: true },
    );
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
        Images
      </Typography>

      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap' }}>
        {images.map((src, index) => (
          <Box
            key={src.slice(0, 32) + index}
            sx={{
              position: 'relative',
              width: 72,
              height: 72,
              borderRadius: 1,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'border.main',
            }}
          >
            <Box
              component="img"
              src={src}
              alt={`Product image ${index + 1}`}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />

            <IconButton
              size="small"
              onClick={() => handleRemove(index)}
              aria-label={`Remove image ${index + 1}`}
              sx={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 20,
                height: 20,
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                color: 'common.white',
                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>

            {index === 0 && (
              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  py: 0.25,
                  textAlign: 'center',
                  fontSize: '0.6rem',
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  color: 'common.white',
                }}
              >
                Cover
              </Typography>
            )}
          </Box>
        ))}

        {images.length < MAX_IMAGES && (
          <Box
            component="label"
            sx={{
              position: 'relative',
              display: 'grid',
              placeItems: 'center',
              width: 72,
              height: 72,
              borderRadius: 1,
              border: '1px dashed',
              borderColor: error ? 'error.main' : 'border.main',
              bgcolor: 'background.muted',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box
              component="input"
              type="file"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              multiple
              onChange={(event) => {
                void handleFiles(event);
              }}
              sx={{
                position: 'absolute',
                width: 1,
                height: 1,
                p: 0,
                m: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                border: 0,
              }}
            />
            <Stack spacing={0.25} sx={{ alignItems: 'center' }}>
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>Upload</Typography>
            </Stack>
          </Box>
        )}
      </Stack>

      <FieldHint>Up to 3 images · PNG or JPG · first image is the cover.</FieldHint>

      {error && (
        <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: 'error.main' }}>{error}</Typography>
      )}
    </Box>
  );
}
