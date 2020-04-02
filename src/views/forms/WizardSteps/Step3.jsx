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
import classnames from "classnames";

import '../style.css';

// reactstrap components
import { Row, Col, Button } from "reactstrap";

class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            casesConfirmed: null
        }
    }

    setSelected() {
        return item => () => {
            item.selected = !item.selected
            this.forceUpdate()
        }
    }

    render() {
        return (
            <>
                <h5 className="info-text">Teve contato com alguma pessoa com caso confirmado nos ultimos 15 dias?</h5>
                <Row className="justify-content-center">
                    <Col lg="10">
                        <Row style={{ paddin: '5px', justifyContent: 'center' }}>
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
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
export default Wizard;