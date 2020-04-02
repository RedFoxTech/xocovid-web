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
import React from "react";

import { createUser } from '../../services/user';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();




  function handleSubmit(e) {

    e.preventDefault();
    const data = {
      name,
      age,
      email,
      password
    }
    createUser(data)
      .then(() => history.push('/auth/login'))
      .catch(() => alert('Ocorreu um erro', 'Verifique os dados ou tente mais tarde'))

  }

  return (
    <div style={{ backgroundColor: 'rgba(196, 196, 196, 0.2' }} className="register-page">
      <Container >
        <Row style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col lg="4" md="6">
            <Card style={{
              boxShadow: '0 6px 10px -4px rgba(0, 0, 0, 0.15)'
            }} className="card-signup text-center">
              <CardHeader>
                <CardTitle tag="h4">Cadastro</CardTitle>
                <img src={require('../../assets/img/logo.png')} width="150" alt="logo xocovid" />
                <p className="p-3 pb-0" style={{ textAlign: 'center', color: "#74848B", marginBottom: '-15px' }}>O aplicativo para você visualizar a situação do coronavírus na sua cidade </p>

              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit} className="form" method="" >
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite seu nome completo"
                      onChange={e => setName(e.target.value)}
                      value={name}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Digite sua idade"
                      onChange={e => setAge(e.target.value)}
                      type="number"
                      value={age}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-email-85" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="nc-icon nc-key-25" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Senha" type="password"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                    />
                  </InputGroup>
                  <FormGroup check className="text-left">
                    <Label check>
                      <Input defaultChecked type="checkbox" />
                      <span className="form-check-sign" />Eu concordo com{" "}
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        termos e condições
                        </a>
                        .
                      </Label>
                  </FormGroup>

                  <CardFooter>
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      type="submit"
                    >
                      Enviar
                  </Button>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require("assets/img/bg/jan-sendereks.jpg")})`
        }}
      />
    </div>
  );
}


export default Register;
