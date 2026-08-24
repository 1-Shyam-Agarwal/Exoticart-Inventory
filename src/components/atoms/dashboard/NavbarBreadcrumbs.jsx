import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.text.secondary,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export function NavbarBreadcrumbs({ breadcrumbItems }) {
  const navigate = useNavigate();

  return (
    <StyledBreadcrumbs
      sx={{ alignSelf: 'flex-start'}}
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {
        breadcrumbItems?.map((item)=>(
          <Typography
            key={item[1]}
            variant="body1"
            onClick={() => navigate(item[1])}
            sx={{
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': { color: 'text.primary' },
            }}
          >
            {item[0]}
          </Typography>
        ))
      }
    </StyledBreadcrumbs>
  );
}
