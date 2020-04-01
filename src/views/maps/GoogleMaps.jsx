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

import axios from 'axios';

import iconCase from '../../assets/img/record.svg'

import { findLocation } from '../../services/geolocation'
import { updateOrCreateUserStatus } from '../../services/userStatus'
import { findPoints } from '../../services/points'

import { Button } from 'reactstrap'
// // react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import './style.css';

// reactstrap components
import { Card, CardBody, Row, Col } from "reactstrap";




class GoogleMaps extends React.Component {

  RegularMap = withScriptjs(

    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{ lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) }}
        defaultOptions={{
          scrollwheel: false
        }}
      >
        <Marker position={{ lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) }} />


        {this.state.points.map((marker, i) => (
          <Marker
            icon={iconCase}
            
            key={i}
            position={{ lat: marker.coordinates[0] + 4 * i, lng: marker.coordinates[1] + 10 }}
          />
        ))}

      </GoogleMap >
    ))
  );


  state = {
    location: false,
    errorMessage: null,
    points: []
  }

  address = '';

  async componentDidMount() {

    // try {
    await findLocation()

    const latitude = localStorage.getItem('lat');
    const longitude = localStorage.getItem('lng');

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + localStorage.getItem('lat') + ',' + localStorage.getItem('lng') + '&key=AIzaSyAC92EYBp1y9ok0hdO1myGrT8ODoy8-F30').then((response) => (this.address = (response.data.results[0].formatted_address)))

    const latlng = { latitude, longitude }
    this.setState({ latlng })

    const { data: points } = await findPoints({ ...latlng })
    this.setState({ points })

  }


  userStatus = async () => {
    alert("registrando")
    try {
      await updateOrCreateUserStatus({
        probability: 0,
        symptoms: [],
        point: [this.state.location.latitude, this.state.location.longitude]
      })
    } catch (err) {
      alert("ocorreu um erro")
    }
  }




  render() {
    return (
      <>
        <div className="content">
          <Row style={{ justifyContent: 'center' }}>

            <Col className="colInfoMap">
              <p>Como você está se sentindo? </p>
              <div style={{ display: 'flex', flexDirection: 'colums' }}>
                <Button
                  color='success' onClick={this.userStatus}
                >Bem</Button>
                <Button
                  color='danger'
                  onClick={() => window.location.href = '/admin/regular-forms'}
                >Mal</Button>
              </div>

            </Col>
            <Col className="colInfoMap" style={{ alignItems: 'flex-start' }}>
              <p>Detalhes da região</p>
              <p style={{ color: '#FF8F39' }}>
                <i className="nc-icon nc-alert-circle-i mr-2" />
                {this.state.points.length + 1} casos na sua região </p>

              <p style={{ color: '#74848B' }}>
                <i className="nc-icon nc-pin-3 mr-2" />
                {this.address}
              </p>

            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <this.RegularMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAC92EYBp1y9ok0hdO1myGrT8ODoy8-F30"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    defaultCenter={{ lat: 40, lng: 50 }}
                  >,
                    {this.state.points ? [...this.state.points.map((item, i) => <Marker
                    key={i}
                    coordinate={{
                      latitude: item.coordinates[0],
                      longitude: item.coordinates[1]
                    }} />)] : null}

                  </this.RegularMap>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </>
    );
  }
}

export default GoogleMaps;
