export async function descargarPdf(id: number, nombreInstrumento: string) {
    const randomQueryParameter = new Date().getTime();
    const urlServer = `http://localhost:8080/PDF/descarga/${id}?rand=${randomQueryParameter}`;
    const response = await fetch(urlServer, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al descargar el PDF");
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fecha = new Date();
    const fechaFormateada = `${fecha.getDate()}-${
      fecha.getMonth() + 1
    }-${fecha.getFullYear()}`;
    link.setAttribute("download", `${nombreInstrumento}(${fechaFormateada}).pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }