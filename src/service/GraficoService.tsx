export async function getPedidosPorMesAnio() {
    const response = await fetch("http://localhost:8080/Pedido/filtro-mes-anio");
    return await response.json();
  }
  
  export async function getPedidosPorInstrumento() {
    const response = await fetch(
      "http://localhost:8080/Pedido/filtro-instrumento"
    );
    return await response.json();
  }

  export async function getPedidosGroupedByWeek() {
    const urlServer = "http://localhost:8080/Pedido/grouped-by-week";
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    return await response.json();
  }