import { Box } from "@mui/material";
import Header from "./header/Header"
import "./Layout.css"
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',          // Equivalente a d-flex de Bootstrap
        flexDirection: 'column',  // Equivalente a flex-column de Bootstrap
        minHeight: '100vh',       // Equivalente a min-vh-100 de Bootstrap
      }}
    >
      <Header />
      <Box
        component="main" // Semánticamente es el contenido principal
        sx={{
          flexGrow: 1,
          padding: 0,
        }}
      >
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </Box>
    </Box>
  );
}