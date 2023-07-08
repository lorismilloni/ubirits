import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Card, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';
import api from '../../services/Api';
import NavBarSeller from './NavBarSeller';

export default function SellerOrders() {
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
      return error;
    }
  };

  const handleButton = async (target) => {
    const { name } = target;
    const { id } = params;
    switch (name) {
    case 'preparando':
      try {
        await api.put(`/customer/orders/${id}`, { status: 'Preparando' });
        console.log('isso ae');
        setReload(0);
      } catch (error) {
        return error;
      }
      break;
    case 'emTransito':
      try {
        await api.put(`/customer/orders/${id}`, { status: 'Em Trânsito' });
        console.log('isso ai');
        setReload(1);
      } catch (error) {
        return error;
      }
      break;
    default:
    }
  };

  useEffect(() => {
    handleFetch();
  }, [reload]);

  return (
    <main>
      <NavBarSeller />
      <h3>Detalhe do Pedido</h3>
      {
        details.map((item, index) => {
          const { id, saleDate, status, seller, products } = item;
          const pageName = 'seller_order_details__';
          return (
            <section key={ index }>
              <div>
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
                    `${pageName}element-order-details-label-delivery-status`
                  }
                >
                  {status}
                </p>
                <button
                  type="button"
                  name="preparando"
                  data-testid={
                    `${pageName}button-preparing-check`
                  }
                  disabled={ status !== 'Pendente' }
                  onClick={ (e) => handleButton(e.target) }
                >
                  Preparando pedidos
                </button>
                <button
                  type="button"
                  name="emTransito"
                  disabled={ status !== 'Preparando' }
                  data-testid={ `${pageName}button-dispatch-check` }
                  onClick={ (e) => handleButton(e.target) }
                >
                  Em Trânsito
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
