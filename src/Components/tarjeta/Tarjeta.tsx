// Tarjeta.tsx
import React from 'react';
import { Card, CardMedia, Typography, Box } from '@mui/material';

interface TarjetaProps {
    altText: string;
    src: string;
    instrumento: string;
    marca: string;
    modelo: string;
    precio: number | string; // Update the type to accept both numbers and strings
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
}

const Tarjeta: React.FC<TarjetaProps> = ({
    altText,
    src,
    instrumento,
    marca,
    modelo,
    precio,
    costoEnvio,
    cantidadVendida,
    descripcion,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '600px', // Set a fixed width
                height: '100px', // Set a fixed height
            }}
        >
            <CardMedia
                component="img"
                width="100"
                height="100"
                alt={altText}
                src={`${src}`}
                sx={{
                    borderRadius: '6px',
                    width: { xs: '100%', sm: 100 },
                }}
            />
            <Box sx={{ ml: 2 ,margin: '50px'}}>
                <Typography variant="body2" color="text.secondary">
                    {instrumento}
                </Typography>

                <Typography variant="body1">
                    Precio: {precio}
                </Typography>
                <Typography variant="body1" style={{ color: costoEnvio === 'G' ? 'green' : 'red' }}>
                    Costo de envío: {costoEnvio === 'G' ? 'Envío gratis' : costoEnvio}
                </Typography>
                <Typography variant="body1">
                    Cantidad vendida: {cantidadVendida}
                </Typography>
                
            </Box>
        </Card>
    );
};

export default Tarjeta;