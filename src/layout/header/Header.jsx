import { red } from "@mui/material/colors";
import "./Header.css";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router";

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
                <Typography
                 variant="h6" 
                 component="div"
                 sx={{ flexGrow: 1, fontFamily: 'TanMonCheri, sans-serif', fontWeight: 'bold' }}
                >
                    Uniblog
                </Typography>
            <Button
                variant="contained"
                disableElevation
                sx={{
                    backgroundColor: 'black', // Fondo negro
                    color: 'white',           // Letra blanca
                    borderRadius: '20px',     // Bordes redondeados (ajusta el valor a tu gusto)
                    padding: '6px 16px',      // Un poco de padding para que se vea mejor
                    textTransform: 'none',    // Para que "Inicia" no se ponga en mayúsculas automáticamente
                    fontWeight: 'bold',       // Letra en negrita
                    '&:hover': {              // Estilo al pasar el mouse por encima
                        backgroundColor: 'grey.800', // Un gris oscuro, un poco más claro que el negro
                    },
                }}
            >
                Inicia
            </Button>
            <Button variant="text">
                <Link to="/perfil" >
                    Perfil
                </Link>
            </Button>

            </Toolbar>

        </AppBar>
    )
}