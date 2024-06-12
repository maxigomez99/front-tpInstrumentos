import Pedido from "../../entidades/Pedido";
import PedidoDetalle from "../../entidades/PedidoDetalle";
import { useCarrito } from "../../hooks/useCarrito";
import { realizarPedido } from "../../service/PedidoService";
import CheckoutMP from "../../Components/mercadoPago/checkoutMP";
import { useState } from "react";
import { createPreferenceMP } from "../../service/MpService";
import PreferenceMP from "../../entidades/mercadoPago/PreferenceMP";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, List, Typography, Image,Space, Row, Col } from 'antd';
import { ShoppingCartOutlined, ClearOutlined } from '@ant-design/icons';
function CartItem({ item }: { item: PedidoDetalle }) {
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Image width={50} src={`http://localhost:8080/images/${item.instrumento?.imagen}`} />}
          title={
            <Row>
              <Col span={24}>
                <strong>{item.instrumento?.instrumento}</strong> - $
                {item.instrumento?.precio}
              </Col>
              <Col span={24}>
                <Typography.Text>
                  {item.cantidad} {item.cantidad === 1 ? "unidad" : "unidades"}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Text strong>
                  Subtotal: ${item.cantidad * (item.instrumento?.precio || 0)}
                </Typography.Text>
              </Col>
            </Row>
          }
        />
      </List.Item>
    );
  }

export function Carrito() {
  const { cart, limpiarCarrito } = useCarrito();
  const [data, setData] = useState<Pedido>(new Pedido());
  const [pedidoRealizado, setPedidoRealizado] = useState(false);

  const total = cart.reduce((sum, detalle) => {
    return sum + detalle.cantidad * (detalle.instrumento?.precio || 0);
  }, 0);

  const comprar = async () => {
    if (cart.length === 0) {
      toast.error(
        "El carrito está vacío. Agrega al menos un producto al carrito antes de realizar el pedido."
      );
      return;
    }

    try {
      const pedido = new Pedido();
      pedido.pedidoDetalle = cart;
      // Aquí puedes agregar más propiedades al pedido si es necesario
      pedido.titulo = "Pedido de Instrumentos";
      const data = await realizarPedido(pedido);
      setData(data);
      setPedidoRealizado(true);
      console.log(data);
      // Aquí puedes manejar la respuesta del servidor después de realizar el pedido

      if (data) {
        getPreferenceMP(data.id);
      }
      // Limpia el carrito y muestra un mensaje de éxito

      toast.success("El pedido se realizo con exito");
    } catch (error) {
      console.error(error);
      // Aquí puedes manejar los errores que puedan ocurrir al realizar el pedido
    }
  };

  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const getPreferenceMP = async (pedidoId: number) => {
    if (total > 0 && pedidoId > 0) {
      const response: PreferenceMP = await createPreferenceMP({
        id: pedidoId,
        titulo: "MUSICAL HENDRIX",
        totalPedido: total,
        fecha: data.fecha,
        pedidoDetalle: data.pedidoDetalle,
      });
      console.log("Preference id: " + response.id);
      if (response) {
        setPreferenceId(response.id);
        // Redirige al usuario a la página de pago de MercadoPago
        // window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${response.id}`;
      }
    } else {
      toast.error("Agregue al menos un producto al carrito");
    }
  };

  return (
    <Card
      title="Items del Pedido"
      style={{ margin: "10px", width: "230px", minWidth: "100px", maxWidth: "300px" }}
    >
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item: PedidoDetalle, index) => <CartItem key={index} item={item} />}
      />
      <Typography.Text strong>Total: ${total}</Typography.Text>
      {!pedidoRealizado && (
        <>
          <Button icon={<ClearOutlined />} onClick={limpiarCarrito} title="Limpiar Todo" />
          <Button type="primary" icon={<ShoppingCartOutlined />} onClick={comprar}>Realizar pedido</Button>
        </>
      )}
      {preferenceId && (
        <CheckoutMP preferenceId={preferenceId}></CheckoutMP>
      )}
    </Card>
  );
}
