import { Box, Container } from "@mui/material";
import Header from "./header/Header"
import "./Layout.css"
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-full"
    >
      <Header />
      <Container
        component="main" // Semánticamente es el contenido principal
        
      >
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </Container>
      {/* Podrías agregar un Footer aquí si lo necesitas */}
      {/* <Box component="footer" sx={{ p: 2, backgroundColor: 'grey.200' }}>
          Mi Footer
        </Box> */}
    </div>
  );
}