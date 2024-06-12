import Pedido from "../entidades/Pedido";
import PreferenceMP from "../entidades/mercadoPago/PreferenceMP";
export async function createPreferenceMP(pedido?: Pedido) {
    let urlServer = "http://localhost:8080/MercadoPago/crear_preference_mp";
    let method: string = "POST";
    const response = await fetch(urlServer, {
      method: method,
      body: JSON.stringify(pedido),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as PreferenceMP;
  }