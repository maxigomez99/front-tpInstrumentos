// ModalDetalle.tsx
import React from 'react';
import { Modal, Button, Grid, Box, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Instrumento } from '../../service/InstrumentoService';

interface ModalDetalleProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    instrumento: Instrumento | null; // Añadimos el tipo Instrumento para las props del instrumento
}

const ModalDetalle: React.FC<ModalDetalleProps> = ({ visible, onOk, onCancel, instrumento }) => {
    if (!instrumento) return null;

    return (
        <Modal
            open={visible}
            onClose={onCancel}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24, maxWidth: '800px', margin: 'auto' }}>
                <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                    Detalle del Instrumento
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={`src/assets/img/${instrumento.imagen}`}
                            alt={instrumento.instrumento}
                            style={{ width: '100%', borderRadius: '6px' }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            {instrumento.descripcion}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Typography variant="body1">
                            Cantidad vendida: {instrumento.cantidadVendida}
                        </Typography>
                        <Typography variant="body1">
                            Instrumento: {instrumento.instrumento}
                        </Typography>
                        
                        <Typography variant="body1">
                            Precio: ${instrumento.precio}
                        </Typography>
                        <Typography variant="body1">
                            Marca: {instrumento.marca}
                        </Typography>
                        <Typography variant="body1">
                            Modelo: {instrumento.modelo}
                        </Typography>
                        <Typography variant="body1" style={{ color: instrumento.costoEnvio === 'G' ? 'green' : 'red' }}>
                            {instrumento.costoEnvio === 'G' ?
                                <Box component="span" display="flex" alignItems="center">
                                    <LocalShippingIcon style={{ marginRight: '10px' }} />
                                    <span>Envío gratis a todo el país</span>
                                </Box>
                                :
                                `Costo de envío: $${instrumento.costoEnvio}`
                            }
                        </Typography>
                        
                    </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" onClick={onOk}>
                        OK
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onCancel} sx={{ ml: 2 }}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalDetalle;
