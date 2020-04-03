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
import { Row, Col } from "reactstrap";

class Wizard extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            { text: 'Febre', selected: false },
            { text: 'Tosse', selected: false },
            { text: 'Nariz entupido', selected: false },
            { text: 'Dor de garganta', selected: false },
            { text: 'Coriza', selected: false },
            { text: 'Falta de ar', selected: false}
        ]

        this.state = {
            symptoms: this.data
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
                <h5 className="info-text">Quais sintomas apresentou?</h5>
                <Row className="justify-content-center">
                    <Col lg="10">
                        <Row style={{ paddin: '5px', justifyContent:'center' }}>
                            {
                                this.data.map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className={`${classnames("choice", {
                                                active: item.selected
                                            })} check ${item.selected ? "check-symptoms-active" : "check-symptoms"}`}
                                            data-toggle="wizard-checkbox"
                                            onClick={this.setSelected(this.data)(item)}
                                        >
                                            <input
                                                defaultValue={item.text}
                                                name="jobb"
                                                type="checkbox"
                                                defaultChecked={item.selected}
                                            />
                                            <h6>{item.text}</h6>
                                        </div>
                                    )
                                })
                            }
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
export default Wizard;