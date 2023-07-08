export const totalPrice = (subTotals) => {
  const values = Object.values(subTotals);
  let totalValue = 0;
  values.forEach((value) => {
    totalValue += value;
  });
  const total = totalValue.toFixed(2);
  localStorage.setItem('total', total);
  return total;
};

export const makeObj = (nomeTarget, product, productQnt, subTotal) => {
  const { name, id, price } = product;
  switch (nomeTarget) {
  case 'mais':
    return { name, id, price, quantity: productQnt, subTotal: subTotal[name] };
  case 'menos':
    return { name, id, price, quantity: productQnt - 1, subTotal: subTotal[name] };
  default:
  }
};
