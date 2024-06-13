interface Categoria {
    id: number;
    denominacion: string;
    codigo: number;
  }

export const getCategoriasFetch = async (): Promise<Categoria[]> => {
    try {
      const response = await fetch('http://localhost:8080/Categoria/traer-lista');
      const data = await response.json();
      return data; // Suponiendo que el JSON devuelto ya está en el formato de un array de objetos Categoria
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  export async function getCategoriaxIdFetch(id: number) {
    const urlServer = "http://localhost:8080/Categoria/traer/" + id;
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: "cors",
    });
    return (await response.json()) as Categoria;
  }
  
  export async function getCategoriaDataBaseJson() {
    const urlServer = "http://localhost:8080/Categoria/traer-lista";
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
  