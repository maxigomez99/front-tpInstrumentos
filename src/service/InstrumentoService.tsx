import Categoria from "../entidades/Categoria";
import Instrumento from "../entidades/Instrumento";
import PreferenceMP from "../entidades/mercadoPago/PreferenceMP";
import Pedido from "../entidades/Pedido";


export async function getInstrumentoJSONFetch(): Promise<Instrumento[]> {
  const urlServer = "http://localhost:8080/Instrumento/traer-lista";

  try {
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch instrumentos:', error);
    throw error;
  }
}


export async function saveInstrumento(
  instrumento?: Instrumento,
  imagen?: File
) {
  let urlServer = "http://localhost:8080/Instrumento/guardar";
  let method: string = "POST";
  if (instrumento && instrumento.id > 0) {
    urlServer =
      "http://localhost:8080/Instrumento/actualizar/" + instrumento.id;
    method = "PUT";
  }

  const formData = new FormData();
  formData.append(
    "instrumento",
    JSON.stringify({
      id: instrumento?.id,
      instrumento: instrumento?.instrumento,
      marca: instrumento?.marca,
      modelo: instrumento?.modelo,
      descripcion: instrumento?.descripcion,
      precio: instrumento?.precio,
      costoEnvio: instrumento?.costoEnvio, // Use the correct field name here
      cantidadVendida: instrumento?.cantidadVendida,
      categoria: {
        id: instrumento?.categoria,
      },
    })
  );

  if (imagen) {
    formData.append("imagen", imagen);
  }

  const response = await fetch(urlServer, {
    method: method,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}