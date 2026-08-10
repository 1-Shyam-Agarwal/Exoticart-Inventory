import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import logo from '../../../../public/assets/company_logo.png';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Button from '@mui/material/Button';

function AppHeader() {
    return (
        <AppBar position="static" sx={{ 
            boxShadow:0 ,
            backgroundColor: 'background.main',
            padding: '0.8rem',
        }}>
            <Stack 
                direction="row" 
                spacing={1}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Container disableGutters>
                    <Stack direction="row" spacing={1}>
                        <img src={logo} alt="logo" className="size-10 object-contain"/>
                        <Typography     
                            variant="h2" 
                            sx={{ 
                                fontFamily: 'typography.main',
                                fontSize: '1rem', 
                                fontWeight: 400,
                                letterSpacing: '0.05rem',
                                color: 'primary.main',
                                alignSelf: 'center',
                            }}

                        >
                                EXOTICART INVENTORY
                        </Typography>
                    </Stack>
                </Container>

                <Button variant="text" >
                        <DarkModeOutlinedIcon sx={{ color: 'black' , fontSize: '1.5rem'}} />
                </Button>
            </Stack>
        </AppBar>
    )
}

export default AppHeader;