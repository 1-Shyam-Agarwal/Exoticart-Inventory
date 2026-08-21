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
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                bgcolor: "background.main",
                backgroundImage: "none",
                boxShadow: "none",
                height: 64,
                justifyContent: 'center',
                px: { xs: 2, sm: 4, lg: 4 },
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Container disableGutters maxWidth={false} sx={{ width: 'auto', m: 0, p: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <img src={logo} alt="logo" className="size-10 object-contain"/>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: 'typography.main',
                                fontSize: '1rem',
                                fontWeight: 400,
                                letterSpacing: '0.0625rem',
                                color: 'text.secondary',
                                alignSelf: 'center',
                            }}

                        >
                                EXOTICART INVENTORY
                        </Typography>
                    </Stack>
                </Container>

                <Button
                    variant="text"
                    sx={{
                        minWidth: 0,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        p: 0,
                    }}
                >
                        <DarkModeOutlinedIcon sx={{ color: 'text.primary' , fontSize: '1.5rem'}} />
                </Button>
            </Stack>
        </AppBar>
    )
}

export default AppHeader;