import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';
import api from '../../services/Api';
import CarShop from './components/CarShop';
import NavBar from './components/NavBar';
import { totalPrice } from '../../services/totalPrice';

export default function CustomProducts() {
  const [products, setProducts] = useState([]);
  const [showError, setError] = useState(false);
  const [valueState, setValue] = useState({});
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState({});

  const validadeButton = (target, prod) => {
    const { name, id, price } = prod;
    const product = JSON.parse(localStorage.getItem('products'));
    let productQnt = product[name].quantity;
    let sub;
    switch (target.name) {
    case 'mais':
      (productQnt) += 1;
      setSubTotal({ ...subTotal, [name]: productQnt * price });
      sub = productQnt * price;
      setValue({ ...product,
        [name]:
        { name, id, price, quantity: productQnt, subTotal: sub } });
      localStorage.setItem('products', JSON.stringify({ ...product,
        [name]:
          { name, id, price, quantity: productQnt, subTotal: sub,
          } }));
      // console.log(id);
      break;
    case 'menos':
      if (productQnt > 0) {
        setSubTotal({ ...subTotal, [name]: subTotal[name] - price });
        sub = subTotal[name] - price;
        localStorage.setItem('products', JSON.stringify({ ...product,
          [name]:
          { name, id, price, quantity: productQnt - 1, subTotal: sub,
          } }));
        setValue({ ...product,
          [name]:
          { name, id, price, quantity: productQnt - 1, subTotal: subTotal[name],
          } });
      }
      break;
    default:
    }
  };

  const inputOnFocus = (target) => {
    target.value = '';
  };

  const inputOnBlur = (target, product) => {
    target.value = valueState[product.name].quantity;
  };

  const inputHandle = (target, product) => {
    const { value } = target;
    const { name, id, price } = product;
    const productStorage = JSON.parse(localStorage.getItem('products'));
    const sub = value * price;
    setValue({ ...productStorage,
      [name]:
      { name, id, price, quantity: Number(value), subTotal: sub,
      } });
    setSubTotal({ ...subTotal, [name]: value * price });

    localStorage.setItem('products', JSON.stringify({ ...productStorage,
      [name]: { name, id, price, quantity: value, subTotal: sub,
      } }));
  };

  function makeProducts(product, index) {
    const { name, id, urlImage, price } = product;
    return (
      <Card
        key={ index }
        style={ {
          width: '18rem',
        } }
      >
        <img
          alt={ name }
          src={ urlImage }
          className="img-responsive imgSize img-fluid img-thumbnail"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <CardBody className="bodyCard">
          <CardTitle
            tag="h5"
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </CardTitle>
          <CardText
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            { price.replace('.', ',') }
          </CardText>
          <div className="cardButton">
            <Button
              color="success"
              name="menos"
              data-testid={ `customer_products__button-card-rm-item-${id}` }
              onClick={ (e) => validadeButton(e.target, product) }
            >
              -
            </Button>
            <Input
              type="text"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              placeholder="0"
              value={ valueState[name] ? valueState[name].quantity : 0 }
              onChange={ (e) => inputHandle(e.target, product) }
              onFocus={ (e) => inputOnFocus(e.target) }
              onBlur={ (e) => inputOnBlur(e.target, product) }
            />
            <Button
              color="success"
              name="mais"
              id={ name }
              onClick={ (e) => validadeButton(e.target, product) }
              data-testid={ `customer_products__button-card-add-item-${id}` }
            >
              +
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  const handleFetch = async () => {
    try {
      const product = await api.get('/customer/products');
      console.log(product);
      setProducts(product.data);
      const nameMap = product.data.map(({ name, id, price }) => ({ name, id, price }))
        .reduce((acc, curr) => {
          acc[curr.name] = {
            name: curr.name,
            id: curr.id,
            price: curr.price,
            quantity: 0,
            subTotal: 0,
          };
          return acc;
        }, {});
      setValue(nameMap);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    setTotal(totalPrice(subTotal));
  }, [subTotal]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(valueState));
  }, [valueState]);

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main>
      <NavBar />
      { total ? <CarShop prop={ total } /> : null }
      <div className="cardGroup">
        { showError
          ? null
          : products && products.map((product, index) => makeProducts(product, index)) }
      </div>
    </main>
  );
}
