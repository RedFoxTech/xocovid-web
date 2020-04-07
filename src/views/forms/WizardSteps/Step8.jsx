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

import '../style.css';

// reactstrap components
import { Row, Col } from "reactstrap";

class Wizard extends React.Component {


    render() {
        return (
            <>
                <Row className="justify-content-center">
                    <Col lg="10">
                        <Row style={{ paddin: '5px', justifyContent: 'center' }}>
                            <h5 className="info-text">Baseado em suas respostas, é possível que esta situação se enquadre como caso suspeito ou provável de doença pelo coronavírus 2019 (covid-19). No entanto, isto não se trata de um dignóstico. A orientação é que você procure atendimento em uma unidade de saúde mais próxima para avaliação médica</h5>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
export default Wizard;