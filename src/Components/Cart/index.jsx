import React from 'react';
import { Row, Table, Card, Button, Form, Input, Select, notification } from 'antd';

const { Option } = Select;

export default function Cart(props) {    

    const onFinish = (values) => {
        console.log('Data:', values);

        notification.open({
            message: 'Datos Obtenidos',
            description: 'Los datos han sido obtenidos correctamente',            
        });
    };

    const columns = [
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'name',            
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Talla',
            dataIndex: 'size',
            key: 'size',
            responsive: ['md'],
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
        }
    ];
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '50px' }}>
                <Card title="Facturación" style={{ width: '100%', margin: '3% 3% 3%' }}>
                    <Table dataSource={props.data} columns={columns} />

                    <Form name="basic" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish}  autoComplete="off">
                        <Form.Item label="Nombres Completos" name="names">
                            <Input placeholder="Ingresa tu nombre Completo" />
                        </Form.Item>
                        <Form.Item label="Cedula" name="document">
                            <Input placeholder="Ingresa Tu Cedula" />
                        </Form.Item>
                        <Form.Item label="Dirección"  name="address">
                            <Input placeholder="Ingresa Tu Dirección" />
                        </Form.Item>
                        <Form.Item label="Celular"  name="phone">
                            <Input placeholder="Ingresa Tu Celular" />
                        </Form.Item>
                        <Form.Item label="Metodo de Pago"  name="payment_method">
                            <Select defaultValue="PSE" style={{ width: '100%' }}>
                                <Option value="PSE">PSE</Option>                                
                                <Option value="Credito">Tarjeta Credito</Option>
                                <Option value="Debito">Tarjeta Debito</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item  wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">Continuar con metodo de Pago</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        </>
    )
}