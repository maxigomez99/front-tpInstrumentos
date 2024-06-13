import { useEffect, useState } from "react";
import Instrumento from "../../entidades/Instrumento";
import Usuario from "../../entidades/Usuario";
import { Roles } from "../../entidades/Roles";
import ModalFormulario from "../modal/Formulario";
import { descargarExcel } from "../../service/ExcelService";
import ModalExcel from "../modal/ModalExcel";
import { Switch, Button, Table, Select, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Categoria from "../../entidades/Categoria";
import { cambiarEstadoInstrumento, traerTodosInstrumentos } from "../../service/InstrumentoService";
import { getCategoriasFetch } from "../../service/CategoriaService";

function GrillaInstrumento() {
  const [fechaInicio, setFechaInicio] = useState<string>("");
  const [fechaFin, setFechaFin] = useState<string>("");
  const [showModalExcel, setShowModalExcel] = useState(false);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [jsonUsuario] = useState<any>(localStorage.getItem("usuario"));
  const usuarioLogueado: Usuario = JSON.parse(jsonUsuario) as Usuario;
  const [showModal, setShowModal] = useState(false);
  const [selectedInstrumento, setSelectedInstrumento] =
    useState<Instrumento | null>(null);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getInstrumentos = async () => {
    const datos: Instrumento[] = await traerTodosInstrumentos();
    setInstrumentos(datos);
  };

  const fetchCategories = async () => {
    try {
      const categoriesData: Categoria[] = await getCategoriasFetch();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getInstrumentos();
    fetchCategories();
  }, []);

  const deleteInstrumento = async (id: number) => {
    await cambiarEstadoInstrumento(id).then(() => window.location.reload());
  };

  const toggleInstrumento = async (id: number) => {
    const instrumento = instrumentos.find(
      (instrumento) => instrumento.id === id
    );
    if (!instrumento) return;

    const nuevoEstado = !instrumento.eliminado;
    await deleteInstrumento(id);
    setInstrumentos(
      instrumentos.map((instrumento) =>
        instrumento.id === id
          ? { ...instrumento, eliminado: nuevoEstado }
          : instrumento
      )
    );
  };

  const handleOpenModal = (instrumento?: Instrumento) => {
    setSelectedInstrumento(instrumento || null);
    setShowModal(true);
  };

  const handleCloseModal = async () => {
    setSelectedInstrumento(null);
    setShowModal(false);
    await getInstrumentos(); // Recarga los instrumentos cuando se cierra el modal
  };

  const handleOpenModalExcel = () => {
    setShowModalExcel(true);
  };

  const handleCloseModalExcel = () => {
    setShowModalExcel(false);
  };

  const handleDescargarExcel = async () => {
    try {
      // Asegúrate de que las fechas de inicio y fin están establecidas
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

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredInstrumentos = selectedCategory
    ? instrumentos.filter(
      (instrumento) =>
        instrumento.categoria?.denominacion === selectedCategory
    )
    : instrumentos;

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: 'Imagen',
      dataIndex: 'imagen',
      key: 'imagen',
      render: (imagen: string) => (
        <img src={'http://localhost:8080/images/'+imagen} alt="Instrumento" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: "Instrumento",
      dataIndex: "instrumento",
      key: "instrumento",
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
      key: "categoria",
      render: (categoria: any) => categoria?.denominacion,
    },
    {
      title: "Cantidad Vendida",
      dataIndex: "cantidadVendida",
      key: "cantidadVendida",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio",
    },
    {
      title: "Modificar",
      key: "modificar",
      render: (text: any, record: Instrumento) => (
        <Button type="primary" size="small" onClick={() => handleOpenModal(record)}>
          Modificar
        </Button>
      ),
    },
    {
      title: "Eliminar",
      key: "eliminar",
      render: (text: any, record: Instrumento) =>
        usuarioLogueado.rol === Roles.ADMIN ? (
          <Switch
            checked={record.eliminado}
            onChange={() => toggleInstrumento(record.id)}
          />
        ) : null,
    },
  ];

  return (
    <>
      <div className="container-fluid text-center">
        <div className="container-fluid text-center">
          <br />
          <div className="d-flex justify-content-between mb-3">
            <Select
              placeholder="Seleccione una categoría"
              style={{ width: 200 }}
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <Select.Option value="">Todas</Select.Option>
              {categories.map((category) => (
                <Select.Option
                  key={category.id}
                  value={category.denominacion}
                >
                  {category.denominacion}
                </Select.Option>
              ))}
            </Select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Button
                className="btn-primary"
                onClick={() => handleOpenModal()}
              >
                Agregar Instrumento
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleOpenModalExcel}
                style={{ backgroundColor: 'green', borderColor: 'green' }}
              >
                Descargar Excel
              </Button>
            </div>
          </div>

          <Table
            dataSource={filteredInstrumentos}
            columns={columns}
            rowClassName={(record) =>
              record.eliminado ? "eliminado-row" : ""
            }
          />
        </div>
        {showModalExcel && (
          <ModalExcel
            fechaInicio={fechaInicio}
            fechaFin={fechaFin}
            setFechaInicio={setFechaInicio}
            setFechaFin={setFechaFin}
            onClose={handleCloseModalExcel}
            onDescargar={handleDescargarExcel}
            visible={showModalExcel} // Asegúrate de pasar `showModalExcel` como `visible`
          />
        )}
      </div>
      {showModal && (
        <ModalFormulario
          initialInstrumento={selectedInstrumento}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default GrillaInstrumento;
