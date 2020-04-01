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
import { useHistory } from 'react-router-dom'

import { findLocation } from '../../services/geolocation'
import { updateOrCreateUserStatus } from '../../services/userStatus'
import { findPoints } from '../../services/points'

import { Button, View } from 'reactstrap'
// // react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

// reactstrap components
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";




class GoogleMaps extends React.Component {

  RegularMap = withScriptjs(

    withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) }}
        defaultOptions={{
          scrollwheel: false
        }}
      >
        <Marker position={{ lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) }} />
        <Marker
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >

          {this.state.points ? this.state.points.map((marker, i) => (
            <Marker
              key={i}
              position={{ lat: marker.coordinates[0], lng: marker.coordinates[1] }}
            >
            </Marker>
          )) : null}
        </Marker>

      </GoogleMap>
    ))
  );


  state = {
    location: false,
    errorMessage: null,
    points: []
  }
  async componentDidMount() {

    // try {
    const location = await findLocation()

    const latitude = localStorage.getItem('lat');
    const longitude = localStorage.getItem('lng');

    location = { latitude, longitude }
    this.setState({ location })

    const { data: points } = await findPoints({ ...location })
    this.setState({ points })

  }


  userStatus = async () => {
    alert("registrando")
    try {
      await updateOrCreateUserStatus({
        probability: 0,
        symptoms: [],
        point: [this.state.location.lat, this.state.location.lng]
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
            <Row style={{width:'100vh', padding: 8, borderRadius: 8, marginTop: 16, flexDirection: 'row' }}>

              <Col style={{ flexDirection: 'column', marginTop: 16, justifyContent: 'center', display: 'flex' }}>
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
              <Col style={{ flexDirection: 'column', marginTop: 16, justifyContent: 'center', display: 'flex' }}>
                <p> 2 casos confirmados na sua região </p>

              </Col>
            </Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <this.RegularMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRkU_fs2PEkgQpl9VaH4RjIbwBpng1X4Y"
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
