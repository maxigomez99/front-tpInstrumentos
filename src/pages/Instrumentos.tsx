import { useEffect, useState } from 'react';
import { getInstrumentoJSONFetch, Instrumento } from '../service/InstrumentoService';
import Tarjeta from '../Components/tarjeta/Tarjeta';
import { Box, Grid, Button } from '@mui/material';
import { Modal } from 'antd';
import ModalDetalle from '../Components/modal/ModalDetalle';
const Instrumentos = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const [currentInstrument, setCurrentInstrument] = useState<Instrumento | null>(null);

    useEffect(() => {
        getInstrumentoJSONFetch()
            .then((data) => {
                console.log('Data fetched:', data);
                setInstrumentos(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching instrumentos:', error);
                setError('Failed to load instrumentos.');
                setLoading(false);
            });
    }, []);

    const showModal = (instrumento: Instrumento) => {
        setCurrentInstrument(instrumento);
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!Array.isArray(instrumentos) || instrumentos.length === 0) {
        return <p>No se encontraron instrumentos.</p>;
    }

    return (
        <>
            <Grid container direction="column" alignItems="center" spacing={2}>
                {instrumentos.map((instrumento) => (
                    <Grid item xs={12} key={instrumento.id}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ maxWidth: '800px', width: '100%' }}>
                                <Tarjeta
                                    altText={instrumento.instrumento}
                                    src={`src/assets/img/${instrumento.imagen}`}
                                    instrumento={instrumento.instrumento}
                                    precio={`$${instrumento.precio}`}
                                    costoEnvio={instrumento.costoEnvio}
                                    cantidadVendida={instrumento.cantidadVendida}
                                    marca={instrumento.marca}
                                    modelo={instrumento.modelo}
                                    descripcion={instrumento.descripcion}
                                    buttonId={`detalle-button-${instrumento.id}`}
                                >
                                    <Button variant="contained" color="primary" onClick={() => showModal(instrumento)}>
                                        Detalle
                                    </Button>
                                </Tarjeta>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <ModalDetalle
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                instrumento={currentInstrument}
            />
        </>
    );
};

export default Instrumentos;
