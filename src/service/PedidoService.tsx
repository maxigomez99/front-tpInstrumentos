import Pedido from "../entidades/Pedido";

export async function realizarPedido(pedido: Pedido) {
    try {
      const response = await fetch("http://localhost:8080/Pedido/cargar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });
  
      if (!response.ok) {
        throw new Error("Error al realizar el pedido");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }