import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const BrandBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <ListGroup>
            {product.brands.map(brand =>
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={brand._id === product.selectedBrand?._id}
                    onClick={() => product.setSelectedBrand(brand)}
                    key={brand._id}
                >
                    {brand.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default BrandBar;
