import { Map, InfoWindow, Marker, GoogleApiWrapper, Circle, Geocoder } from 'google-maps-react';
import React from 'react';
import ReactDOM from 'react-dom';
import MAPS_KEY from '../API_KEY.js';
import axios from 'axios';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: this.randCoord(90),
      lng: this.randCoord(180),
      zoom: 3,
      currLocation: '',
      currCoordinates: {},
      coordinatesList: {}
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.saveData = this.saveData.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
  }

  componentDidMount() {
    this.getAddress();
    this.getSavedData();
  }

  getSavedData() {
    axios.get('http://localhost:5000/data')
      .then((res) => {
        this.setState({
          coordinatesList: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  randCoord(range) {
    const result = Math.ceil(Math.random() * range) * (Math.round(Math.random()) ? 1 : -1);

    return result;
  }

  saveData() {
    axios.post('http://localhost:5000/saveData', { location: this.state.currLocation, coordinates: this.state.currCoordinates })
      .then((res) => {
        this.setState({
          coordinatesList: res.data
        });

        window.alert('Successfully saved this location!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onMarkerClick() {
    if (this.state.currLocation && !this.state.coordinatesList[this.state.currLocation]) {
      let loc = this.state.currLocation;
      let obj = this.state.coordinatesList;

      obj[loc] = {lat: this.state.lat, lng: this.state.lng};

      this.setState({
        coordinatesList: obj,
        currCoordinates: obj[loc]
      });

      this.saveData();
    }
  }

  onMapClick() {
    this.setState({
      lat: this.randCoord(90),
      lng: this.randCoord(180)
    });
    window.location.reload();
  }

  getAddress() {
    const geocoder = new google.maps.Geocoder();

    geocoder
      .geocode({ location: {
        lat: this.state.lat,
        lng: this.state.lng
      } })
      .then((response) => {
        if (response.results[0]) {
          const address = response.results[0].formatted_address;

          this.setState({
            currLocation: address
          });
        } else {
          console.log('no results found');
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return(
    <div>
      <b>Your current location: </b>
      <div>{this.state.currLocation}</div>
      <br/>
      <b>Your saved locations + coordinates:</b>
      <div><pre>{JSON.stringify(this.state.coordinatesList, null, 2) }</pre></div>
      <Map google={window.google} zoom={this.state.zoom} initialCenter={{lat: this.state.lat, lng: this.state.lng}} onClick={this.onMapClick}>
        <Marker onClick={this.onMarkerClick} name={'Current location'}/>
      </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(MapContainer)