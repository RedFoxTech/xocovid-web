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
import { Col } from "reactstrap";

import './style.css';

// wizard steps
import Step1 from "./WizardSteps/Step1.jsx";
import Step2 from "./WizardSteps/Step2.jsx";
import Step3 from "./WizardSteps/Step3.jsx";
import Step4 from "./WizardSteps/Step4.jsx";
import Step5 from "./WizardSteps/Step5.jsx";

import { findLocation } from '../../services/geolocation'
import { updateOrCreateUserStatus } from '../../services/userStatus'

var steps = [
  {
    stepName: "1",
    stepIcon: "nc-icon nc-single-02",
    component: Step1
  },
  {
    stepName: "2",
    stepIcon: "nc-icon nc-touch-id",
    component: Step2
  },
  {
    stepName: "3",
    stepIcon: "nc-icon nc-pin-3",
    component: Step3
  },
  {
    stepName: "4",
    stepIcon: "nc-icon nc-pin-3",
    component: Step4
  },
  {
    stepName: "5",
    stepIcon: "nc-icon nc-pin-3",
    component: Step5
  }
];

class Wizard extends React.Component {
  requestUserStatus = params => {
    updateOrCreateUserStatus({
      ...params,
      point: [localStorage.getItem('lat'), localStorage.getItem('lng')]
    })
  }
  finishButtonClick = (e) => {
    console.log(e)
    const symptoms = e[1].symptoms.filter(item => item.selected).map(i => i.text)

    findLocation()
      .then(this.requestUserStatus({ symptoms, probability: 1, ...this.state }))
      .then(this.setState({ visibleModal: true }))
      .then(window.location.href = '/admin/google-maps')
  }
  render() {
    return (
      <>
        <div className="content" >
          <Col className="form-symptoms mr-auto ml-auto" md="10">
            <ReactWizard
              steps={steps}
              navSteps
              validate
              title=""
              description=""
              headerTextCenter
              finishButtonClasses="symptoms-button"
              nextButtonClasses="symptoms-button"
              previousButtonClasses="symptoms-button"
              finishButtonClick={this.finishButtonClick}
            />
          </Col>
        </div>
      </>
    );
  }
}
export default Wizard;