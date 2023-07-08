import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert, Container } from 'reactstrap';
import UserContext from '../../context/user/context';
import api from '../../services/Api';
import logo from '../../images/logo_temporaria.png';
import { validateLogin } from '../../services/validateLogin';

export default function LoginForm() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setError] = useState(false);

  const warning = (
    <Alert
      className="alert"
      data-testid="common_login__element-invalid-email"
      color="danger"
    >
      Usuário ou senha incorretos!
    </Alert>);

  const redirect = useNavigate();
  function redirectUser(user) {
    switch (user.role) {
    case 'customer':
      redirect('/customer/products');
      break;
    case 'seller':
      redirect('/seller/orders');
      break;
    case 'administrator':
      redirect('/admin/manage');
      break;
    default:
      redirect('notFound');
    }
  }
  const handleSubmit = async () => {
    try {
      const login = await api.post('/login', { email, password });
      const seller = await api.get('/login');
      setUser(login);
      // console.log(login.data);
      localStorage.setItem('user', JSON.stringify(login.data));
      localStorage.setItem('seller', JSON.stringify(seller.data));
      redirectUser(login.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('user'));
    if (usuario) redirectUser(usuario);
  }, []);

  return (
    <main
      className="loginMain row col-xs-12 col-sm-12 col-md-12 col-lg-12"
    >
      <div className="titleDiv">
        <img className="logoBeer" src={ logo } alt="logo do app" />
        <h1 className="title">Ubiritis</h1>
      </div>
      <Container className="container text-center  bg-light border">
        <Form>
          <FormGroup>
            <Label for="common_login__input-email">
              Email
            </Label>
            <Input
              required
              data-testid="common_login__input-email"
              onChange={ ({ target: { value } }) => setEmail(value) }
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="common_login__input-password">
              Password
            </Label>
            <Input
              required
              data-testid="common_login__input-password"
              onChange={ ({ target: { value } }) => setPassword(value) }
              name="password"
              placeholder="Password"
              type="password"
            />
          </FormGroup>
          <div className="row">
            <Button
              className="col align-self-start"
              color="success"
              data-testid="common_login__button-login"
              disabled={ validateLogin(email, password) }
              onClick={ handleSubmit }
              type="button"
            >
              Login
            </Button>
            <Button
              outline
              className="col align-self-center"
              color="success"
              data-testid="common_login__button-register"
              onClick={ () => { redirect('/register'); } }
            >
              Ainda não tenho conta
            </Button>
          </div>
        </Form>
      </Container>
      { showError ? warning : null }
    </main>
  );
}
