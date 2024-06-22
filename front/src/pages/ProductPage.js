import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from "../http/productAPI";
import { Col, Container, Image, Row, Card, Button } from "react-bootstrap";
import { Context } from "../index";

const DevicePage = () => {
    const [product, setProduct] = useState({ info: [] });
    const { id } = useParams();
    const { basket } = useContext(Context);

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, []);

    const addToBasket = () => {
        basket.setItems([...basket.items, product]);
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image src={process.env.REACT_APP_API_URL + product.img} width={300} height={300} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{product.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            // style={{ background: `url(${star}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {product.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>Від: {product.price} грн.</h3>
                        <Button variant={"outline-dark"} onClick={addToBasket}>Додати в кошик</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {product.info.map((info, index) =>
                    <Row key={info._id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
