import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/Api';

export default function FormCheckout() {
  const redirect = useNavigate();
  const [endereco, setEndereco] = useState('');
  const [numero, setNumber] = useState(0);
  const seller = JSON.parse(localStorage.getItem('seller'));
  const user = JSON.parse(localStorage.getItem('user'));
  const total = localStorage.getItem('total');

  const handleInput = (target) => {
    const { name, value } = target;
    switch (name) {
    case 'endereco':
      setEndereco(value);
      console.log(endereco);
      break;
    case 'numero':
      setNumber(value);
      console.log(numero);
      break;
    default:
    }
  };

  const setSaleStorage = () => {
    const products = JSON.parse(localStorage.getItem('checkoutProducts'));
    return {
      userId: user.id,
      sellerId: seller.id,
      totalPrice: total,
      deliveryAddress: endereco,
      deliveryNumber: numero,
      status: 'Pendente',
      products,
    };
  };

  async function handleClick() {
    const userToken = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: userToken.token,
      },
    };
    const sale = setSaleStorage();
    try {
      const product = await api.post('/customer/orders', sale, config);
      redirect(`/customer/orders/${product.data.id}`);
    } catch (error) {
      throw new Error();
    }
  }

  // pegar valor dos inputs
  // salvar tudo como uma chave no localStorage

  return (
    <div>
      <form>
        <label htmlFor="seller">
          Vendedor responsável
          <select
            name="seller"
            data-testid="customer_checkout__select-seller"
          >
            <option value="2">{ seller.name }</option>
          </select>
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            name="endereco"
            data-testid="customer_checkout__input-address"
            onChange={ (e) => handleInput(e.target) }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="number"
            name="numero"
            data-testid="customer_checkout__input-address-number"
            onChange={ (e) => handleInput(e.target) }
          />
        </label>
      </form>
      <div>
        <button
          type="button"
          onClick={ handleClick }
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
}
