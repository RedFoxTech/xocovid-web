/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";

import { loginUser } from '../../services/user'
import { saveToken, getToken } from '../../services/authenticate'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  localStorage.setItem('name', '');

  const authenticateUser = (data) => {
    localStorage.setItem('name', data.user.name)
    saveToken(data.token)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password
    }

    loginUser(data)
      .then(({ data }) => authenticateUser(data))
      .then(() => history.push('/admin/google-maps'));

  }


  useEffect(() => {
    getToken().then(data => data ? history.push('/auth/login/') : null)
  }, [getToken])

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Form onSubmit={handleSubmit} className="form" method="">
              <Card className="card-login">
                <CardHeader>
                  <CardHeader>
                    <h3 className="header text-center">Login</h3>
                  </CardHeader>
                </CardHeader>
                <CardBody>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type="password"
                      autoComplete="off"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round mb-3 mt-3"
                    color="warning"
                    type="submit"
                  >
                    Entrar
                  </Button>
                  <Button
                    block
                    className="btn-round mb-3"
                    color="primary"
                    onClick={() => history.push('/auth/Register')}
                  >
                    Cadastrar
                  </Button>
                </CardBody>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require("assets/img/bg/fabio-mangione.jpg")})`
        }}
      />
    </div>
  );
}

export default Login;

