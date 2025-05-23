import React, { useState } from "react";
import {
    Box,
    Avatar,
    Button,
    TextField,
    Typography,
    Stack,
} from "@mui/material";

const Perfil = () => {
    const [nombre, setNombre] = useState("Nombre de Usuario");
    const [correo, setCorreo] = useState("usuario@email.com");
    const [foto, setFoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para guardar los cambios
        alert("Perfil actualizado");
    };

    return (
        <Box
            maxWidth={400}
            mx="auto"
            mt={5}
            p={3}
            boxShadow={3}
            borderRadius={2}
            component="form"
            onSubmit={handleSubmit}
        >
            <Typography variant="h5" mb={2} align="center">
                Editar Perfil
            </Typography>
            <Stack alignItems="center" spacing={2} mb={2}>
                <Avatar
                    src={preview || "https://i.pravatar.cc/150?img=3"}
                    sx={{ width: 80, height: 80 }}
                />
                <Button variant="contained" component="label">
                    Cambiar Foto
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFotoChange}
                    />
                </Button>
            </Stack>
            <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
                label="Correo"
                fullWidth
                margin="normal"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Guardar Cambios
            </Button>
        </Box>
    );
};

export default Perfil;