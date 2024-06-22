import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchTypes, fetchBrands, fetchProducts } from '../http/productAPI';
import ProductList from '../components/ProductList';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import { Container, Row, Col } from 'react-bootstrap';
import { toJS } from 'mobx';

const Shop = observer(() => {
    const { product } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTypes().then(data => product.setTypes(data));
                await fetchBrands().then(data => product.setBrands(data));
                const brand = toJS(product.selectedBrand);
                const type = toJS(product.selectedType);
                let brandId = brand ? brand._id : null;
                let typeId = type ? type._id : null;
                await fetchProducts(typeId, brandId, 1, 20).then(data => {
                    product.setProducts(data.rows);
                    product.setTotalCount(data.count);
                });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [product.selectedType, product.selectedBrand]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <ProductList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
