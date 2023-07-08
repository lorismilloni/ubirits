import { useState, useEffect } from 'react';

export default function TableCheckout() {
  const [products, setProducts] = useState([]);

  const getProductsStorage = () => {
    const productsStorage = JSON.parse(localStorage.getItem('products'));
    const arrayProducts = Object.values(productsStorage);
    return arrayProducts;
  };
  // pega os produtos dos local;

  const getTotalStorage = () => {
    const totalStorage = (JSON.parse(localStorage.getItem('total')));
    const parse = (totalStorage).toFixed(2).replace('.', ',');
    return parse;
  };
  // pega o valor total do local;

  const newTotalStorage = (subTotal) => {
    const totalStorage = JSON.parse(localStorage.getItem('total'));
    const total = (+(totalStorage) - +(subTotal)).toFixed(2);
    if (total <= 0) localStorage.setItem('total', 0);
    return localStorage.setItem('total', total);
  };
  // calcula o novo total

  const filterList = () => {
    const array = getProductsStorage();
    const validQuantity = (value) => value.quantity > 0;
    const filteredQuantity = array.filter(validQuantity);
    setProducts(filteredQuantity);
    localStorage.setItem('checkoutProducts', JSON.stringify(filteredQuantity));
  };
  // filtra o array de products colocando somente os produtos que tem quantidade

  const removeItem = (id, subTotal) => {
    const remove = (value) => value.id !== id;
    const deletedId = products.filter(remove);
    newTotalStorage(subTotal);
    setProducts(deletedId);
    localStorage.setItem('checkoutProducts', JSON.stringify(deletedId));
  };
  // filtra o array removendo o produto que teve o id clicado

  useEffect(() => {
    getTotalStorage();
  });

  useEffect(() => {
    getProductsStorage();
    filterList();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  { item.name }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { item.quantity }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  { (item.price).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { (item.subTotal).toFixed(2).replace('.', ',') }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  <button
                    type="button"
                    onClick={ () => removeItem(item.id, item.subTotal) }
                  >
                    Remover Item
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        Total: R$
        {' '}
        <div
          data-testid="customer_checkout__element-order-total-price"
        >
          {' '}
          { getTotalStorage() }
        </div>
      </div>
    </div>
  );
}
