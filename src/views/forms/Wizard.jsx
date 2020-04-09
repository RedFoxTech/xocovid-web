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
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col, Button, Modal } from "reactstrap";

import './style.css';

// wizard steps
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";
import Step5 from "./WizardSteps/Step5.jsx";
import Step6 from "./WizardSteps/Step6.jsx";
import Step7 from "./WizardSteps/Step7.jsx";

import { updateOrCreateUserStatus } from '../../services/userStatus'

var steps = [
  {
    stepName: "1",
    stepIcon: "fas fa-stethoscope",
    component: Step1
  },
  {
    stepName: "2",
    stepIcon: "fas fa-dna",
    component: Step2
  },
  {
    stepName: "3",
    stepIcon: "fas fa-heart",
    component: Step3
  },
  {
    stepName: "4",
    stepIcon: "fas fa-lungs",
    component: Step4
  },
  {
    stepName: "5",
    stepIcon: "fas fa-notes-medical",
    component: Step5
  },
  {
    stepName: "6",
    stepIcon: "fas fa-viruses",
    component: Step6
  },
  {
    stepName: "7",
    stepIcon: "fas fa-hospital-symbol",
    component: Step7
  }
];

class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInit: false,
      modalFinish: false
    };
  }

  componentDidMount = () => {
    this.toggleModalInit()
  }

  toggleModalInit = () => {
    this.setState({
      modalInit: !this.state.modalInit
    });
  };
  toggleModalFinish = () => {
    this.setState({
      modalFinish: !this.state.modalFinish
    });
  };

  requestUserStatus = params => {
    updateOrCreateUserStatus({
      ...params,
      point: [localStorage.getItem('lat'), localStorage.getItem('lng')]
    })

    this.toggleModalFinish()

  }
  finishButtonClick = (e) => {
    const casesConfirmed = e[6].casesConfirmed;
    const yourCaseConfirmed = e[7].yourCaseConfirmed;
    const symptoms = e[1].symptoms.filter(item => item.selected).map(i => i.text);
    const chronic = e[2].chronic.filter(item => item.selected).map(i => i.text);
    const heart = e[3].heart.filter(item => item.selected).map(i => i.text);
    const respiratory = e[4].respiratory.filter(item => item.selected).map(i => i.text);
    const immunological = e[5].immunological.filter(item => item.selected).map(i => i.text);

    if (symptoms.length === 0 && !this.state.casesConfirmed && !this.state.yourCaseConfirmed){
      this.res = 'Baseado em suas respostas, as chances contaminação pelo coronavírus 2019 são baixas. No entanto, isto não se trata de um dignóstico. A orientação é que você procure atendimento em uma unidade de saúde mais próxima para avaliação médica'
      return this.requestUserStatus({ probability: 0 })
    }
      // .then(window.location.href = '/admin/google-maps');

    this.res = 'Baseado em suas respostas, é possível que esta situação se enquadre como caso suspeito ou provável de doença pelo coronavírus 2019 (covid-19). No entanto, isto não se trata de um dignóstico. A orientação é que você procure atendimento em uma unidade de saúde mais próxima para avaliação médica'

    return this.requestUserStatus({ symptoms, chronic, heart, respiratory, immunological,           probability: 1, casesConfirmed, yourCaseConfirmed })
    // .then(window.location.href = '/admin/google-maps');

  }
  render() {
    return (
      <>
        <div className="content" style={{ padding: '0px' }}>
          <Modal
            className="modal-sm"
            isOpen={this.state.modalInit}
            toggle={this.toggleModalInit}
          >
            <div className="modal-header justify-content-center">
              <div className="modal-profile ml-auto mr-auto">
                <i className="nc-icon nc-bulb-63" />
              </div>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: 'center' }}>Olá, Você está prestes a fazer uma triagem de possibilidade de contaminação por Covid-19. O objetivo é mapear casos suspeitos e confirmados próximos a você, não se desespere, estamos juntos nessa!</p>
            </div>
            <div className="modal-footer">
              <Button
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={this.toggleModalInit}
              >
                Fechar </Button>

            </div>
          </Modal>
          <Col className="form-symptoms mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              title=""
              description=""
              headerTextCenter
              finishButtonClasses="symptoms-button"
              nextButtonClasses="symptoms-button"
              previousButtonClasses="symptoms-button"
              finishButtonText="Finalizar"
              nextButtonText="Próximo"
              previousButtonText="Anterior"
              finishButtonClick={this.finishButtonClick}
            />
          </Col>
          <Modal
            className="modal-md"
            isOpen={this.state.modalFinish}
          >
            <div className="modal-header justify-content-center">
              <div className="modal-profile ml-auto mr-auto">
                <i className="nc-icon nc-alert-circle-i" />
              </div>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: 'center' }}>{this.res}</p>
            </div>
            <div className="modal-footer">
              <Button
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => window.location.href='/admin/google-maps'}
              >
                Entendi </Button>

            </div>
          </Modal>
        </div>
      </>
    );
  }
}
export default Wizard;