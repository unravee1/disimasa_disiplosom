import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
    const { product } = useContext(Context);

    return (
        <ListGroup>
            {product.types.map(type =>
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={type._id === product.selectedType?._id}
                    onClick={() => product.setSelectedType(type)}
                    key={type._id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
