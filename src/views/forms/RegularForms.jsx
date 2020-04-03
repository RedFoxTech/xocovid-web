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

import './style.css';

import { findLocation } from '../../services/geolocation'
import { updateOrCreateUserStatus } from '../../services/userStatus'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class RegularForms extends React.Component {
  constructor(props) {
    super(props)
    this.setSelected = this.setSelected.bind(this)
  }
  state = {
    checked: false,
    visibleModal: false,
    suspiciousPeople: null,
    casesConfirmed: null,
    yourCaseConfirmed: null,
    traveled: null
  }
  onNextStep = () => this.forceUpdate()
  requestUserStatus = params => {
    updateOrCreateUserStatus({
      ...params,
      point: [localStorage.getItem('lat'), localStorage.getItem('lng')]
    })
  }
  onSubmitProgress = (e) => {
    const symptoms = this.data.filter(item => item.selected).map(i => i.text)

    findLocation()
      .then(this.requestUserStatus({ symptoms, probability: 1, ...this.state }))
      .then(this.setState({ visibleModal: true }))
  }
  data = [
    { text: 'Cansaço', selected: false },
    { text: 'Congestão nasal', selected: false },
    { text: 'Coriza', selected: false },
    { text: 'Dificuldade de respirar', selected: false },
    { text: 'Dor de cabeça', selected: false },
    { text: 'Dor de garganta', selected: false },
    { text: 'Dor no corpo', selected: false },
    { text: 'Febre', selected: false },
    { text: 'Tosse', selected: false },
    { text: 'Mal star em geral', selected: false },
  ];

  setSelected() {
    return item => () => {
      item.selected = !item.selected
      this.forceUpdate()
    }
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card >
                <CardHeader>
                  <CardTitle style={{ fontSize: '20px' }} tag="h4">O que voce está sentindo?</CardTitle>
                </CardHeader>
                <CardBody>
                  {
                    this.data.map((item, i) => {
                      return (
                        <Button
                          color="neutral"
                          style={item.selected === true ? { backgroundColor: "#FD0057!important" } : null}
                          className="btn-round btn_sintomas"
                          key={i}
                          onClick={this.setSelected(this.data)(item)}
                        >{item.text}</Button>)
                    })
                  }
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '20px' }} tag="h4">Teve contato com alguma pessoa com caso suspeito?</CardTitle>
                </CardHeader>
                <CardBody>
                  <Button className="btn_contato" color="neutral"
                    onClick={() => this.setState({ suspiciousPeople: true })}
                  >Sim</Button>
                  <Button className="btn_contato" color="neutral"
                    onClick={() => this.setState({ suspiciousPeople: false })}
                  >Não</Button>

                </CardBody>

              </Card>
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '20px' }} tag="h4">Teve contato com alguma pessoa com caso confirmado nos ultimos 15 dias?</CardTitle>
                </CardHeader>
                <CardBody>
                  <Button
                    color="neutral"
                    className="btn_contato"
                    onClick={() => this.setState({ casesConfirmed: true })}
                  >Sim</Button>
                  <Button
                    className="btn_contato"
                    color="neutral"
                    onClick={() => this.setState({ casesConfirmed: false })}
                  >Não</Button>

                </CardBody>

              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '20px' }} tag="h4">Você testou positivo para o covid-19?</CardTitle>
                </CardHeader>
                <CardBody>
                  <Button
                    className="btn_contato"
                    color="neutral"
                    onClick={() => this.setState({ yourCaseConfirmed: true })}
                  >Sim</Button>
                  <Button
                    className="btn_contato"
                    color="neutral"
                    onClick={() => this.setState({ yourCaseConfirmed: false })}
                  >Não</Button>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle style={{ fontSize: '20px' }} tag="h4">Esteve em algum outro pais nos ultimos 14 dias?</CardTitle>
                </CardHeader>
                <CardBody>
                  <Button
                    className="btn_contato"
                    color="neutral"
                    onClick={() => this.setState({ traveled: true })}
                  >Sim</Button>
                  <Button
                    className="btn_contato"
                    color="neutral"
                    onClick={() => this.setState({ traveled: false })}
                  >Não</Button>
                </CardBody>
              </Card>
              <Button
                block
                style={{ boxShadow: 'rgba(65, 74, 78, 0.15) 5px 5px 20px 0px' }}
                className="btn_sintomas btn-round"
                color="neutral"
                onClick={this.onSubmitProgress}>Enviar</Button>
            </Col>

          </Row>


        </div>
      </>
    );
  }
}
export default RegularForms;