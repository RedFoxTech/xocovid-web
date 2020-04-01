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
import * as Yup from 'yup'

import ErrorMessages from '../../constants/ErrorMessages'
import { createUser } from '../../services/user';
import Pages from '../../constants/Pages'

import ReactBSAlert from "react-bootstrap-sweetalert";



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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(ErrorMessages.required),
    age: Yup.number()
      .required(ErrorMessages.required),
    email: Yup.string()
      .email(ErrorMessages.email)
      .required(ErrorMessages.required),
    password: Yup.string()
      .required(ErrorMessages.required)
  });

  const formatNumberMessage = message => message && typeof message === 'string' && /age must be a `number`/.test(message) && ErrorMessages.number;

  const [state, setState] = useState(null);

  function successAlert() {
    this.setState({
      alert: (
        <ReactBSAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Good job!"
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          You clicked the button!
        </ReactBSAlert>
      )
    });
  };

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
    <div className="register-page">
      <Container >
        <Row>
          <Col className="mr-auto" lg="4" md="6">
            <Card className="card-signup text-center">
              <CardHeader>
                <CardTitle tag="h4">Cadastro</CardTitle>
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
