import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import logo from '../../../../public/assets/company_logo.png';
import Stack from '@mui/material/Stack';

function AppHeader() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "background.main",
                height: 64,
                justifyContent: 'center',
                px: { xs: 2, sm: 4, lg: 4 },
            }}
        >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <img src={logo} alt="logo" className="size-10 object-contain"/>
                <Typography
                    sx={{
                        fontFamily: 'typography.main',
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '0.0625rem',
                        color: 'text.secondary',
                    }}

                >
                        EXOTICART INVENTORY
                </Typography>
            </Stack>
        </AppBar>
    )
}

export default AppHeader;