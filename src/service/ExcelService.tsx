export async function descargarExcel(fechaDesde: string, fechaHasta: string) {
    const urlServer = `http://localhost:8080/Excel/download/excel?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`;
  
    const response = await fetch(urlServer, {
      method: "GET",
    });
  
    if (!response.ok) {
      throw new Error("Error al descargar el archivo Excel");
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
  
    // Formatear las fechas en el formato dd-mm-yyyy
    const fechaDesdeFormateada = new Date(fechaDesde).toLocaleDateString("es-ES");
    const fechaHastaFormateada = new Date(fechaHasta).toLocaleDateString("es-ES");
  
    // Incluir las fechas en el nombre del archivo
    a.download = `pedidos(${fechaDesdeFormateada}-${fechaHastaFormateada}).xlsx`;
  
    document.body.appendChild(a); // Necesario para Firefox
    a.click();
    a.remove(); // Necesario para Firefox
  }