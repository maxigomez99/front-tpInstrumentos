// Tarjeta.tsx
import React from 'react';
import { Card, CardMedia, Typography, Box, CardActions } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface TarjetaProps {
    altText: string;
    src: string;
    instrumento: string;
    marca: string;
    modelo: string;
    precio: number | string;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    buttonId?: string;
    children?: React.ReactNode;
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
    buttonId,
    children,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '600px',
                height: '150px',
            }}
        >
            <CardMedia
                component="img"
                width="100"
                height="100"
                alt={altText}
                src={src}
                sx={{
                    borderRadius: '6px',
                    width: { xs: '100%', sm: 100 },
                }}
            />
            <Box sx={{ ml: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    {instrumento}
                </Typography>
                <Typography variant="body1">
                    Precio: {precio}
                </Typography>
                <Typography variant="body1" style={{ color: costoEnvio === 'G' ? 'green' : 'red' }}>
                    {costoEnvio === 'G' ?
                        <Box component="span" display="flex" alignItems="center">
                            <LocalShippingIcon style={{ marginRight: '10px' }} />
                            <span>Envío gratis a todo el país</span>
                        </Box>
                        :
                        `Costo de envío: $${costoEnvio}`
                    }
                </Typography>
                <Typography variant="body1">
                    Cantidad vendida: {cantidadVendida}
                </Typography>
                <CardActions>
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child) && buttonId) {
                            return React.cloneElement(child, { id: buttonId } as React.HTMLAttributes<HTMLElement>);
                        }
                        return child;
                    })}
                </CardActions>
            </Box>
        </Card>
    );
};

export default Tarjeta;
