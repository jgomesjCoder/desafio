import React, { useState} from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import Geocode from "react-geocode";
import {Container} from 'reactstrap';
require('dotenv').config()


const apiKey = process.env.REACT_APP_MAPS_API_KEY;

const Maps = (props) => {
  const [addresss, setAddresss] = useState(props.address);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const[loaded, setLoaded] = useState(false)
  Geocode.setApiKey(apiKey);

  // Get latidude & longitude from address.
  const { address, number, city, state, country } = addresss
  const text = "" + address + ", " + number + ", " + city + ", " + state + ", " + country
  Geocode.fromAddress(text).then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setLoaded(true)
    },
    error => {
      console.error(error);
    }
  );
  const containerStyle = {  
    width: '50%',
  }
  return (
    <>
    <Container className="md-8">
    {loaded?(<Map
      google={props.google}
      initialCenter={{ lat, lng }}
      zoom={14}
      style={containerStyle}>
      
      <Marker
        position={{ lat, lng}} />
    </Map>): null}
    </Container>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: (apiKey)
})(Maps)