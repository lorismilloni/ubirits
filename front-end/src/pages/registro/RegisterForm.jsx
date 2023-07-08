import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert, Container } from 'reactstrap';
import UserContext from '../../context/user/context';
import api from '../../services/Api';
import validateFields from '../../services/validateLogin';

function RegisterForm() {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setError] = useState(false);

  const redirect = useNavigate();

  const handleSubmit = async () => {
    try {
      const login = await api.post('/register', { name, email, password });
      setUser(login);
      localStorage.setItem('user', JSON.stringify(login.data));
      await redirect('/customer/products');
    } catch (error) {
      setError(true);
    }
  };
  const warning = (
    <Alert
      className="alert"
      data-testid="common_register__element-invalid_register"
      color="danger"
    >
      Usuario já existe
    </Alert>);
  return (
    <main
      className="loginMain row col-xs-12 col-sm-12 col-md-12 col-lg-12"
    >
      <div className="titleDiv">
        <h1 className="title">Cadastre-se</h1>
      </div>
      <Container className="container text-center bg-light border">
        <Form>
          <FormGroup>
            <Label for="common_register__input-name">
              Nome
            </Label>
            <Input
              data-testid="common_register__input-name"
              onChange={ ({ target: { value } }) => setName(value) }
              name="Name"
              placeholder="Nome"
              type="text"
            />
          </FormGroup>
          <FormGroup>
            <Label for="common_register__input-email">
              Email
            </Label>
            <Input
              data-testid="common_register__input-email"
              onChange={ ({ target: { value } }) => setEmail(value) }
              name="email"
              placeholder="Email"
              type="email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="common_register__input-password">
              Senha
            </Label>
            <Input
              data-testid="common_register__input-password"
              onChange={ ({ target: { value } }) => setPassword(value) }
              name="password"
              placeholder="Senha"
              type="password"
            />
          </FormGroup>
          <div className="row">
            <Button
              color="success"
              data-testid="common_register__button-register"
              disabled={ validateFields(name, email, password) }
              onClick={ handleSubmit }
              type="button"
            >
              Cadastrar
            </Button>
          </div>
        </Form>
      </Container>
      { showError ? warning : null }
    </main>
  );
}

export default RegisterForm;
