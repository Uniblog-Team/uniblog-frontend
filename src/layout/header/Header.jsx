import { red } from "@mui/material/colors";
import "./Header.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
    
    const lightred = red[100];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: lightred,
                borderBottom: '2px solid black',
                color: 'black',
            }}    
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Uniblog
                </Typography>
            </Toolbar>
        </AppBar>
    )
}