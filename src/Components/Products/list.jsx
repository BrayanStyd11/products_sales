import React, { useState, useEffect } from 'react';
import { Col, Row, Typography, Divider, Button, InputNumber } from 'antd';
import axios from 'axios';

const { Title,Text } = Typography;

export default function ProductsList() {
    const [products, setProducts] = useState();
    const [totalPaid, setTotalPaid] = useState(0);

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = () => {        
        axios.get('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js').then((res) => {
            setProducts(res.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const contentStyle = {        
        height: '140px',
        width: '123px',
        marginTop: '5px',
        marginLeft: '5px',
    };

    const onChange = (quantity) => {
        let total = products.price * quantity;
        setTotalPaid(total);
    };

    return (
        <>
            <Row style={{marginTop:'50px'}}>
                <Col span={10}>
                    <img alt='img' style={{width:'90%', height: '76%', marginLeft:'5px'}} src={products && products.featured_image}/>
                    {
                        products && products.images.map((img)=>(
                            <img alt='img' style={contentStyle} src={img}/>                                
                        ))   
                    }                    
                </Col>
                <Col span={12}>
                    <Title>{products && products.title}</Title>
                    <Title>{products && formatter.format(products.price)} <Text style={{color:'gray'}} delete>{products && formatter.format(products.compare_at_price)}</Text></Title>
                    <Divider />
                    <Title level={3}>Color: 
                    
                    </Title>

                    <Divider />
                    <Row>
                        <Col span={4}>
                            <Title level={3}>Talla:</Title> 
                        </Col>
                        <Col>
                        {
                            products && products.options.map((options)=>(
                                options.name === 'Size' && (
                                    options.values.map((size)=>(
                                        <>
                                            <Button size="medium" className="btn-size">{size}</Button>
                                        </>                                    
                                    ))
                                )
                            ))
                        }
                        </Col>
                    </Row>   
                    <Divider/>  
                    <Row>
                        <Col span={12}>
                            <Text style={{color:'gray'}}>Cantidad: <InputNumber size='middle' style={{ width: '60%' }} min={1} max={10} defaultValue={1} onChange={onChange} /></Text>
                        </Col>
                        <Col span={12}> 
                            <Text style={{color:'gray'}}>Total a Pagar: </Text><strong>{formatter.format(totalPaid)}</strong>
                        </Col>
                    </Row>

                    <Row style={{marginTop:'10px'}}>
                        <Col span={12}>
                            <Button style={{backgroundColor:'gray', color:'black'}} block>Agregar a Favorito</Button>
                        </Col>
                        <Col span={12}>
                            <Button style={{backgroundColor:'black', color:'white'}} block>Agregar al Carrito</Button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p dangerouslySetInnerHTML={{__html: products && products.description}}></p>                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}