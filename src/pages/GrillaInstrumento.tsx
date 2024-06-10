import React, { useState } from 'react';
import { Button } from 'antd';
import ModalAgregarInstrumento from '../Components/modal/ModalAgregarInstrumento';
import Tabla from '../Components/tabla/Tabla';

const GrillaInstrumento: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <Button type="primary" onClick={showModal}>
          Agregar Instrumento
        </Button>
      </div>
      <ModalAgregarInstrumento visible={modalVisible} onCancel={handleCancel} />
      <div>
        <Tabla/>
      </div>
    </div>
  );
}

export default GrillaInstrumento;