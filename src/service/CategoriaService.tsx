interface Categoria {
    id: number;
    denominacion: string;
    codigo: number;
  }

export const getCategoriasFetch = async (): Promise<Categoria[]> => {
    try {
      const response = await fetch('http://localhost:8080/categoria/mostrarLista');
      const data = await response.json();
      return data; // Suponiendo que el JSON devuelto ya está en el formato de un array de objetos Categoria
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch categories');
    }
  }