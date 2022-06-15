import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row, Typography, Divider, Button, InputNumber, Carousel, Image, notification} from 'antd';
import axios from 'axios';

const { Title,Text } = Typography;

export default function ProductsList(props) {
    const [products, setProducts] = useState();

    const [quantity, setQuantity] = useState();
    const [totalPaid, setTotalPaid] = useState(0);
    const [colorSelected, setColor] = useState();
    const [sizeSelected, setSizeSelected] = useState();
    const navigate = useNavigate();
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

    const onChange = (quantity) => {
        let total = products.price * quantity;
        formatter.format(total);
        setQuantity(quantity);
        setTotalPaid(total);
    };

    const onFinish =()=>{
        let data = []

        data.push({
            key: products.id,
            name: products.title,
            quantity:quantity,
            price: totalPaid,
            color: colorSelected,
            size: sizeSelected,
        });

        props.setData(data);

        notification.open({
            message: 'Datos registrados en tu Carrito',
            description: 'Serás redirigido a tu carrito para observar tus productos',
        });
        setTimeout(() => {
            navigate('/cart');
        }, 2000);        

    }

    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginTop:'50px'}}>
                <Col className="gutter-row" span={12}>
                <Carousel autoplay>
                    <div>
                        <Image height={'auto'} width={'100%'} src={products && products.featured_image}/>                        
                    </div>                    
                        {
                            products && products.images.map((img)=>(
                                <div>                                    
                                    <Image height={'auto'} width={'100%'} src={img}/>
                                </div>
                            ))   
                        }                    
                </Carousel>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Title>{products && products.title}</Title>
                    <Title>{products && formatter.format(products.price)} <Text style={{color:'gray'}} delete>{products && formatter.format(products.compare_at_price)}</Text></Title>
                    <Divider />
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={32}>
                            <Title level={3}>Color: </Title>
                        </Col>
                        <Col className="gutter-row" span={32}>
                        {
                            products && products.options.map((options)=>(
                                options.name === 'Color' && (
                                    options.values.map((color)=>(
                                        <div style={{display:'inline'}} onClick={()=>setColor(color)}>
                                            <input type="color" value={color === 'Red' ? '#ff0000' : '#000000'} name="color" id={colorSelected === color ? "color-selected" : "color"} disabled />                                         
                                        </div>
                                    ))
                                )
                            ))
                        }
                        </Col>
                    </Row>                    

                    <Divider />
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={32}>
                            <Title level={3}>Talla:</Title> 
                        </Col>
                        <Col className="gutter-row" span={32}>
                        {
                            products && products.options.map((options)=>(
                                options.name === 'Size' && (
                                    options.values.map((size)=>(
                                        <>
                                            <Button size="medium" className="btn-size" onClick={()=>setSizeSelected(size)}>{size}</Button>
                                        </>                                    
                                    ))
                                )
                            ))
                        }
                        </Col>
                    </Row>   
                    <Divider/>  
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={32}>
                            <Text style={{color:'gray'}}>Cantidad: <InputNumber size='middle' style={{ width: '60%' }} min={1} defaultValue={1} onChange={onChange} /></Text>
                        </Col>
                        <Col className="gutter-row" span={32}>
                            <Text style={{color:'gray'}}>Total a Pagar: </Text><strong>{formatter.format(totalPaid)}</strong>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{marginTop:'10px'}}>
                        <Col className="gutter-row" span={32}>
                            <Button style={{backgroundColor:'gray', color:'black'}}>Agregar a Favorito</Button>
                        </Col>
                        <Col className="gutter-row" span={32}>
                            <Button style={{backgroundColor:'black', color:'white'}} onClick={onFinish}>Agregar al Carrito</Button>
                        </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={32}>
                            <p dangerouslySetInnerHTML={{__html: products && products.description}}></p>                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}