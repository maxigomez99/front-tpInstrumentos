import { createContext, ReactNode, useState } from "react";
import Instrumento from "../entidades/Instrumento";
import PedidoDetalle from "../entidades/PedidoDetalle";

interface CartContextType {
  cart: PedidoDetalle[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
  totalPedido?: number;
}

export const CarContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
  totalPedido: 0,
});

export function CarritoContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<PedidoDetalle[]>([]);
  const [totalPedido, setTotalPedido] = useState<number>(0);

  const addCarrito = async (product: Instrumento) => {
    let cartCopy = [...cart];
    let detalleExistente = cartCopy.find(
      (detalle) => detalle.instrumento?.id === product.id
    );

    if (detalleExistente) {
      console.log("YA EXISTE");
      detalleExistente.cantidad += 1;
    } else {
      console.log("NO EXISTE");
      const nuevoDetalle = new PedidoDetalle();
      nuevoDetalle.instrumento = product;
      nuevoDetalle.cantidad = 1;
      cartCopy.push(nuevoDetalle);
    }
    calcularTotalCarrito();
    setCart(cartCopy);
  };

  const removeCarrito = async (product: Instrumento) => {
    setCart((prevCart) =>
      prevCart.filter((detalle) => detalle.instrumento?.id !== product.id)
    );
  };

  const removeItemCarrito = async (product: Instrumento) => {
    let cartCopy = [...cart];
    let detalleExistente = cartCopy.find(
      (detalle) => detalle.instrumento?.id === product.id
    );

    if (detalleExistente) {
      console.log("EXISTE");
      if (detalleExistente.cantidad > 1) {
        detalleExistente.cantidad -= 1;
      } else {
        // Eliminar el detalle del carrito si la cantidad es 1
        cartCopy = cartCopy.filter(
          (detalle) => detalle.instrumento?.id !== product.id
        );
      }
    }
    calcularTotalCarrito();
    setCart(cartCopy);
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  const calcularTotalCarrito = async () => {
    let total: number = 0;
    cart.forEach(async (element: PedidoDetalle) => {
      total += element.cantidad * (element.instrumento?.precio || 0);
    });
    await setTotalPedido(total);
  };

  return (
    <CarContext.Provider
      value={{
        cart,
        addCarrito,
        limpiarCarrito,
        removeCarrito,
        removeItemCarrito,
        totalPedido,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}
