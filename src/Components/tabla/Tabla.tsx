import React, { useEffect, useState } from 'react';
import { Space, Table, Select, message, Button, Switch } from 'antd';
import type { TableProps } from 'antd';
import {  traerTodosInstrumentos } from '../../service/InstrumentoService';
import { getCategoriasFetch } from '../../service/CategoriaService';
import ModalAgregarInstrumento from '../modal/ModalAgregarInstrumento';
import Instrumento from '../../entidades/Instrumento';
import ModalExcel from '../modal/ModalExcel';
import { descargarExcel } from '../../service/ExcelService'; // Make sure to import cambiarEstadoInstrumento
import { DownloadOutlined } from '@ant-design/icons';
import {cambiarEstadoInstrumento}  from '../../service/InstrumentoService';
import Instrumentos from "../../entidades/Instrumento";
const { Option } = Select;

type ColumnsType<T extends object> = TableProps<T>['columns'];

interface Categoria {
  id: number;
  denominacion: string;
}

interface DataType {
  eliminado: boolean;
  key: string;
  instrumento: string;
  imagen: string;
  precio: number;
  envio: string;
  marca: string;
  modelo: string;
  cantidadVendida: number;
  categoria: Categoria | string;
  descripcion: string;
}

interface Props {
  datos: Instrumentos[];
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<DataType | null>(null);
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [showModalExcel, setShowModalExcel] = useState(false);
  const [instrumentos, setInstrumentos] = useState<Instrumentos[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Instrumento[] = await traerTodosInstrumentos();
        const formattedData: DataType[] = result.map((item) => ({
          key: item.id.toString(),
          instrumento: item.instrumento,
          imagen: item.imagen,
          precio: item.precio,
          envio: item.costoEnvio === 'G' ? 'Gratis' : `$${item.costoEnvio}`,
          marca: item.marca,
          modelo: item.modelo,
          cantidadVendida: item.cantidadVendida,
          categoria: item.categoria?.id ? item.categoria : 'Sin categoria',
          descripcion: item.descripcion,
          eliminado: item.eliminado || false
        }));
        setData(formattedData);
        setFilteredData(formattedData);
      } catch (error) {
        console.error('Failed to fetch instruments:', error);
        message.error('Failed to fetch instruments');
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesData: Categoria[] = await getCategoriasFetch();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        message.error('Failed to fetch categories');
      }
    };

    fetchData();
    fetchCategories();
  }, []);

  const handleEdit = (record: DataType) => {
    console.log('Editing record:', record);
    setSelectedInstrument(record);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedInstrument(null);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => {
        if (typeof item.categoria === 'object' && item.categoria !== null) {
          return item.categoria.denominacion === value;
        }
        return false;
      });
      setFilteredData(filtered);
    }
  };

  const handleOpenModalExcel = () => {
    setShowModalExcel(true);
  };

  const handleCloseModalExcel = () => {
    setShowModalExcel(false);
  };

  const handleDescargarExcel = async () => {
    try {
      if (!fechaInicio || !fechaFin) {
        console.error("Las fechas de inicio y fin deben estar establecidas");
        return;
      }

      await descargarExcel(fechaInicio, fechaFin);
      handleCloseModalExcel();
    } catch (error) {
      console.error("Error al descargar Excel: ", error);
    }
  };

  const deleteInstrumento = async (id: number) => {
    try {
      await cambiarEstadoInstrumento(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al cambiar el estado del instrumento:", error);
      message.error('Failed to change instrument state');
    }
  };

  const handleSwitchChange = async (id: number) => {
    const instrumento = instrumentos.find((inst) => inst.id === id);
    if (!instrumento) return;

    const nuevoEstado = !instrumento.eliminado;

    await cambiarEstadoInstrumento(id);

    setInstrumentos(
      instrumentos.map((inst) =>
        inst.id === id ? { ...inst, eliminado: nuevoEstado } : inst
      )
    );
  };


  const columns: ColumnsType<DataType> = [
    {
      title: 'Instrumento',
      dataIndex: 'instrumento',
      key: 'instrumento',
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (text: string) => <img src={"http://localhost:8080/images/" + text} alt={text} style={{ width: '50px', height: '50px' }} />
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
      key: 'precio',
    },
    {
      title: 'Envio',
      dataIndex: 'envio',
      key: 'envio',
    },
    {
      title: 'Marca',
      dataIndex: 'marca',
      key: 'marca',
    },
    {
      title: 'Modelo',
      dataIndex: 'modelo',
      key: 'modelo',
    },
    {
      title: 'Cantidad Vendida',
      dataIndex: 'cantidadVendida',
      key: 'cantidadVendida',
    },
    {
      title: 'Categoria',
      dataIndex: ['categoria', 'denominacion'],
      key: 'categoria',
      render: (denominacion: string) => denominacion,
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Editar',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)} style={{ cursor: 'pointer' }}>Editar</a>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
           <Switch
            checked={record.eliminado}
            onChange={() => handleSwitchChange(Number(record.key))}
            style={{ backgroundColor: record.eliminado ? 'red' : '' }}
          />

        </Space>
      ),
    },
  ];

  return (
    <div>
      <Select
        placeholder="Seleccione una categoría"
        style={{ width: 200, marginBottom: 20 }}
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <Option value="">Todas</Option>
        {categories.map(category => (
          <Option key={category.id} value={category.denominacion}>{category.denominacion}</Option>
        ))}
      </Select>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleOpenModalExcel}
        style={{ marginBottom: 30, float: 'right',marginTop:'10px', backgroundColor: 'green', borderColor: 'green' }} // Add backgroundColor and borderColor to change the color to green
      >
        Descargar Excel
      </Button>
      <Table
        columns={columns}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 6
        }}
        dataSource={filteredData}
      />
      <ModalAgregarInstrumento
        visible={visible}
        onCancel={handleCancel}
        instrumento={selectedInstrument}
      />
      <ModalExcel
        visible={showModalExcel} // Add this line to control visibility
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        setFechaInicio={setFechaInicio}
        setFechaFin={setFechaFin}
        onClose={handleCloseModalExcel}
        onDescargar={handleDescargarExcel}
      />
    </div>
  );
};

export default App;
