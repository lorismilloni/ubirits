import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import api from '../../services/Api';

export default function CustomOrders() {
  const [orders, setOrders] = useState([]);

  const handleFetch = async () => {
    try {
      const ordersList = await api.get('/seller/orders');
      console.log(ordersList.data);
      setOrders(ordersList.data);
    } catch (error) {
      throw new Error('teste');
    }
  };
  const saveId = (target) => localStorage.setItem('id', JSON.stringify(target.id));

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <main>
      <NavBar />
      {
        orders.map((item, index) => (
          <Link
            key={ index }
            id={ item.id }
            onClick={ (e) => saveId(e.target) }
            to={ `/customer/orders/${item.id}` }
          >
            <p
              data-testid={ `customer_orders__element-order-id-${item.id}` }
            >
              {item.id}

            </p>
            <p
              data-testid={ `customer_orders__element-delivery-status-${item.id}` }
            >
              {item.status}
            </p>
            <p
              data-testid={ `customer_orders__element-order-date-${item.id}` }
            >
              {item.saleDate.split('T')[0].split('-').reverse().join('/')}

            </p>
            <p
              data-testid={ `customer_orders__element-card-price-${item.id}` }
            >
              {item.totalPrice.replace('.', ',')}

            </p>
          </Link>

        ))
      }
    </main>
  );
}
