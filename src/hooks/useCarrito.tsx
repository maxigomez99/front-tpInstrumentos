import { useContext } from "react";
import { CarContext } from "../context/CarritoContext";

export const useCarrito = () => {
  const context = useContext(CarContext);
  if (context === undefined) {
    throw new Error(
      "useCarrito debe ser usado dentro del ambito de un CartProvider"
    );
  }
  return context;
};
