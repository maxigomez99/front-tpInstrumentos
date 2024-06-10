import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { saveInstrumento } from '../../service/InstrumentoService';

interface Props {
  visible: boolean;
  onCancel: () => void;
  instrumento?: any; // Propiedad adicional para el instrumento a editar
}

interface Categoria {
  id: number;
  denominacion: string;
}

export const getCategoriasFetch = async (): Promise<Categoria[]> => {
  try {
    const response = await fetch('http://localhost:8080/categoria/mostrarLista');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch categories');
  }
};

const ModalAgregarInstrumento: React.FC<Props> = ({ visible, onCancel, instrumento }) => {
  const [form] = Form.useForm();
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
  getCategoriasFetch().then(setCategorias);

  if (instrumento) {
    let envioValue = instrumento.envio;
    if (envioValue === 'Gratis') {
      envioValue = 'G';
    } else if (envioValue.charAt(0) === '$') {
      envioValue = Number(envioValue.slice(1));
    }

    form.setFieldsValue({
      ...instrumento,
      imagenes: instrumento.imagenes?.map((url: string, index: number) => ({
        uid: index,
        name: `imagen${index}`,
        status: 'done',
        url,
      })),
      envio: envioValue,
      categoria: instrumento.categoria.id,
    });
  } else {
    form.resetFields();
  }
}, [instrumento, form]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    try {
      const image = values.imagenes?.[0]?.originFileObj;
      if (instrumento) {
        // If an instrument is provided, we are editing
        await saveInstrumento({ ...values, costoEnvio: values.envio, id: instrumento.id }, image);
      } else {
        // If no instrument is provided, we are creating
        await saveInstrumento({ ...values, costoEnvio: values.envio }, image);
      }
      onCancel();
    } catch (error) {
      console.error('Failed to save instrument:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title={instrumento ? "Editar Instrumento" : "Agregar Instrumento"}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Instrumento"
              name="instrumento"
              rules={[{ required: true, message: 'Por favor ingrese el nombre del instrumento!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Marca"
              name="marca"
              rules={[{ required: true, message: 'Por favor ingrese la marca!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Modelo"
              name="modelo"
              rules={[{ required: true, message: 'Por favor ingrese el modelo!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Precio"
              name="precio"
              rules={[{ required: true, message: 'Por favor ingrese el precio!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Costo Envío"
              name="envio"
              rules={[{ required: true, message: 'Por favor ingrese el costo de envío!' }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cantidad Vendida"
              name="cantidadVendida"
              rules={[{ required: true, message: 'Por favor ingrese la cantidad vendida!' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Descripción"
          name="descripcion"
          rules={[{ required: true, message: 'Por favor ingrese la descripción!' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Categoría"
          name="categoria"
          rules={[{ required: true, message: 'Por favor seleccione una categoría!' }]}
        >
          <Select placeholder="Seleccione una categoría">
            {categorias.map((categoria) => (
              <Select.Option key={categoria.id} value={categoria.id}>
                {categoria.denominacion}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="imagenes"
          label="Imágenes"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {instrumento ? "Guardar Cambios" : "Agregar Instrumento"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAgregarInstrumento;
