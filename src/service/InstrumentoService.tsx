export interface Instrumento {
    id: string;
    instrumento: string;
    imagen: string;
    marca: string;
    modelo: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
  }
  
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
  