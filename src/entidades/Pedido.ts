import PedidoDetalle from "./PedidoDetalle";

export default class Pedido {
  id: number = 0;
  titulo: string = "";
  fecha: Date = new Date();
  totalPedido: number = 0;
  pedidoDetalle: PedidoDetalle[] = [];
}
