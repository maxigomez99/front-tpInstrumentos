import { FC } from "react";
import { Modal, Button } from "antd";

interface ModalExcelProps {
  visible: boolean;
  fechaInicio: string;
  fechaFin: string;
  setFechaInicio: (fecha: string) => void;
  setFechaFin: (fecha: string) => void;
  onClose: () => void;
  onDescargar: () => void;
}

const ModalExcel: FC<ModalExcelProps> = ({
  visible,
  fechaInicio,
  fechaFin,
  setFechaInicio,
  setFechaFin,
  onClose,
  onDescargar,
}) => {
  return (
    <Modal
      title="Descargar Excel"
      visible={visible} // Aquí usamos la prop visible
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cerrar
        </Button>,
        <Button key="submit" type="primary" onClick={onDescargar}>
          Descargar
        </Button>,
      ]}
    >
      <label>
        Fecha de inicio:
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </label>
      <label>
        Fecha de fin:
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
      </label>
    </Modal>
  );
};

export default ModalExcel;
