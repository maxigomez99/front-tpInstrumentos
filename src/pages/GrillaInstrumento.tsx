import React, { useState } from 'react';

import ModalAgregarInstrumento from '../Components/modal/ModalAgregarInstrumento';
import Tabla from '../Components/tabla/Tabla';

const GrillaInstrumento: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);



  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>

      </div>
      <ModalAgregarInstrumento visible={modalVisible} onCancel={handleCancel} />
      <div>
        <Tabla />
      </div>
    </div>
  );
}

export default GrillaInstrumento;