import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function ActionCard({
  description,
  icon: Icon,
  title,
  image: Image,
  onClickHandler,
}) {
  return (
    <Card variant="outlined" sx={{ borderColor: 'border.soft' }}>
      <CardActionArea onClick={onClickHandler}>
        <CardContent>
          <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
            {Icon && <Icon sx={{ fontSize: 36, color: '#FF9100' }} />}
            {Image && (
              <Box
                component="img"
                src={Image}
                alt="Unable to load image"
                sx={{ width: 40, height: 56, objectFit: 'contain' }}
              />
            )}

            <Stack spacing={0.5} sx={{ alignItems: 'flex-start' }}>
              <Typography variant="body1" sx={{ fontWeight: 400, color: 'text.primary' }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.25, color: 'text.secondary' }}>
                {description}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
