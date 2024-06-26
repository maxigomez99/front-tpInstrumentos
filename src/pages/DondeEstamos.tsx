export default function DondeEstamos() {
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Donde Estamos</h1>
        <div className="mapa" style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                height: 'calc(70vh - 50px)', // Ajusta la altura para que sea menos vertical
                margin: '20px 0' // Margen superior e inferior para separar del header
            }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2737.174151333051!2d-68.84038326886582!3d-32.886329568371785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1713741597017!5m2!1ses!2sar" 
                    style={{ border: '0', width: '80%', height: '100%' }} // Ancho más grande, altura ajustada al contenedor
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
      </>
    )
  }
  