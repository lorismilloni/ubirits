import { useState, useEffect } from 'react';
/* import { Button, ListGroup, ListGroupItem, Table } from 'reactstrap'; */
import { useParams } from 'react-router-dom';
import NavBar from './components/NavBar';
import api from '../../services/Api';

export default function CustomOrdersDetails() {
  const [details, setDetails] = useState([]);
  const [reload, setReload] = useState();
  const params = useParams();

  const handleFetch = async () => {
    try {
      const detailsList = await api.get('/seller/orders');
      const sales = detailsList.data;
      const result = await sales.filter((sale) => sale.id === Number(params.id));
      console.log(result);
      setDetails(result);
    } catch (error) {
      throw new Error('teste');
    }
  };

  const handleButton = async () => {
    const { id } = params;
    try {
      await api.put(`/customer/orders/${id}`, { status: 'Entregue' });
      setReload(0);
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    handleFetch();
  }, [reload]);

  return (
    <main>
      <NavBar />
      <h3>Detalhe do Pedido</h3>
      {
        details.map((item, index) => {
          const { id, saleDate, status, seller, products } = item;
          const pageName = 'customer_order_details__';
          return (
            <section key={ index }>
              <div horizontal>
                <p
                  data-testid={ `${pageName}element-order-details-label-order-id` }
                >
                  {`Pedido: ${id}`}
                </p>
                <p
                  data-testid={ `${pageName}element-order-details-label-seller-name` }
                >
                  {`P.Vend: ${seller.name}` }
                </p>
                <p
                  data-testid={ `${pageName}element-order-details-label-order-date` }
                >
                  {saleDate.split('T')[0].split('-').reverse().join('/')}
                </p>
                <p
                  data-testid={
                    `${pageName}element-order-details-label-delivery-status-${id}`
                  }
                >
                  {status}
                </p>
                <button
                  disabled={ status !== 'Em Trânsito' }
                  type="button"
                  data-testid={ `${pageName}button-delivery-check` }
                  onClick={ handleButton }
                >
                  Marcar como Entregue
                </button>
              </div>
              <div key={ index } hover>
                <thead>
                  <tr>
                    <th>
                      Item
                    </th>
                    <th>
                      Descrição
                    </th>
                    <th>
                      Quantidade
                    </th>
                    <th>
                      Valor Unitario
                    </th>
                    <th>
                      Sub-total
                    </th>
                  </tr>
                </thead>
                { products.map((product, pIndex) => {
                  const preco = product.price * product.SaleProduct.quantity;
                  const subtotal = preco.toFixed(2).toString().replace('.', ',');
                  return (
                    <tbody key={ pIndex }>
                      <tr>
                        <th
                          scope="row"
                          data-testid={
                            `${pageName}element-order-table-item-number-${pIndex}`
                          }
                        >
                          { pIndex + 1 }
                        </th>
                        <td
                          data-testid={ `${pageName}element-order-table-name-${pIndex}` }
                        >
                          { product.name }
                        </td>
                        <td
                          data-testid={
                            `${pageName}element-order-table-quantity-${pIndex}`
                          }
                        >
                          { product.SaleProduct.quantity}
                        </td>
                        <td
                          data-testid={
                            `${pageName}element-order-table-unit-price-${pIndex}`
                          }
                        >
                          { product.price.replace('.', ',') }
                        </td>
                        <td
                          data-testid={
                            `${pageName}element-order-table-sub-total-${pIndex}`
                          }
                        >
                          { subtotal }
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </div>
              <div
                data-testid={ `${pageName}element-order-total-price` }
              >
                {item.totalPrice.replace('.', ',')}
              </div>
            </section>
          );
        })
      }
    </main>
  );
}
