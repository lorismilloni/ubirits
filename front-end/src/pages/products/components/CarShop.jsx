import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

export default function CarShop() {
  const [disable, setDisabled] = useState(true);
  const total = localStorage.getItem('total');
  const redirect = useNavigate();

  const handleClick = async () => redirect('/customer/checkout');

  const handleButton = (value) => {
    if (value > 0) setDisabled(false);
    if (value === 0) setDisabled(true);
  };

  useEffect(() => {
    handleButton(Number(total));
  }, [total]);

  const totalValue = total.replace('.', ',');

  return (
    <Button
      data-testid="customer_products__button-cart"
      disabled={ disable }
    >
      <Button
        type="button"
        color="success"
        data-testid="customer_products__checkout-bottom-value"
        disabled={ disable }
        onClick={ handleClick }
      >
        { totalValue }
      </Button>
    </Button>
  );
}
