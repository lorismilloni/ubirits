import { useState, useEffect } from 'react';
import NavBar from '../products/components/NavBar';
import FormCheckout from './FormCheckout';
import TableCheckout from './TableCheckout';

export default function Checkout() {
  const [seller, setSeller] = useState({});
  // pegar as duas chaves do local storage, uma da tabela ou do formulário
  // enviar aqui para a rota e fazer o redirect

  useEffect(() => {
    setSeller(localStorage.getItem('seller'));
  }, []);

  return (
    <main>
      <NavBar />
      <h3>Finalizar pedido</h3>
      <TableCheckout />
      <h4>Detalhes e Endereço para Entrega</h4>
      <FormCheckout props={ seller } />
    </main>
  );
}
