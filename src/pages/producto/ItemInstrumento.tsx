import { useMemo, useState } from "react";
import { useCarrito } from "../../hooks/useCarrito";
import addCart from "../../assets/img/addCart.png";
import deleteCart from "../../assets/img/deleteCart.png";
import pdfIcon from "../../assets/img/pdf.png";
import { descargarPdf } from "../../service/PdfService";
import DetalleInstrumento from "../../Components/modal/ModalDetalle";
import Categoria from "../../entidades/Categoria";
import Instrumento from "../../entidades/Instrumento";
import { Card, Button, Modal, Typography, Col, Row } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

type InstrumentoParams = {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria?: Categoria;
    initialHayStock: boolean;
    isProductInCart?: boolean;
    instrumentoObject: Instrumento;
};

function ItemInstrumento(arg: InstrumentoParams) {
    const { addCarrito, removeCarrito, cart, removeItemCarrito } = useCarrito();
    const [visible, setVisible] = useState(false);
    const [currentInstrument, setCurrentInstrument] = useState<Instrumento | null>(null);
    const isPlatoInCarrito = useMemo(() => {
        for (let detalle of cart) {
            if (detalle.instrumento?.id === arg.instrumentoObject.id) {
                return true;
            }
        }
        return false;
    }, [cart, arg.instrumentoObject.id]);

    const handlePdfDownload = async (id: number, nombreInstrumento: string) => {
        try {
            await descargarPdf(id, nombreInstrumento);
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
        }
    };

    const handleOk = () => {
        setCurrentInstrument(arg.instrumentoObject);
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const renderCostoEnvio = () => {
        if (arg.costoEnvio === "G") {
            return "Envio gratis a todo el pais";
        } else {
            return `Costo de envio interior de Argentina: ${arg.costoEnvio}`;
        }
    };

    return (
        <>
            <Card style={{ width: 500, marginTop: 16, marginLeft: 'auto', marginRight: 'auto' }}>
                <Row>
                    <Col span={8}>
                        <img
                            src={'http://localhost:8080/images/' + arg.imagen}
                            alt={arg.instrumento}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Col>
                    <Col span={8}>
                        <Card.Meta
                            title={arg.instrumento}
                            description={
                                <>
                                    <Typography.Text> Precio: ${arg.precio} </Typography.Text>
                                    <Typography.Text> {renderCostoEnvio()} </Typography.Text>
                                    <Typography.Text> vendidos: {arg.cantidadVendida} </Typography.Text>
                                </>
                            }
                        />
                        <MinusOutlined key="minus" onClick={() => removeItemCarrito(arg.instrumentoObject)} />
                        <Button
                            onClick={() => {
                                isPlatoInCarrito
                                    ? removeCarrito(arg.instrumentoObject)
                                    : addCarrito(arg.instrumentoObject);
                            }}
                        >
                            {isPlatoInCarrito ? (
                                <img src={deleteCart} title="Quitar" style={{ width: '20px', height: '20px' }} />
                            ) : (
                                <img src={addCart} title="Comprar" style={{ width: '20px', height: '20px' }} />
                            )}
                        </Button>
                        <PlusOutlined key="plus" onClick={() => addCarrito(arg.instrumentoObject)} />
                    </Col>
                    <Col span={8}>
                        <img
                            src={pdfIcon}
                            alt="Descargar PDF"
                            onClick={() => handlePdfDownload(arg.id, arg.instrumento)}
                            style={{
                                cursor: "pointer",
                                width: "42px",
                                position: "absolute",
                                right: "30px",
                                top: "30px",
                            }}
                        />
                        <Button type="primary" onClick={handleOk} style={{ position: 'absolute', bottom: '20px', right: '30px' }}>Detalle</Button>
                    </Col>
                </Row>
            </Card >
            <DetalleInstrumento
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                instrumento={currentInstrument}
            />
        </>
    );
}
export default ItemInstrumento;