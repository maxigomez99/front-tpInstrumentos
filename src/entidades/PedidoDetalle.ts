import Instrumento from "./Instrumento";
import Pedido from "./Pedido";

export default class PedidoDetalle {
  id: number = 0;
  cantidad: number = 0;
  subtotal: number = 0;
  pedido?: Pedido;
  instrumento?: Instrumento;
}
