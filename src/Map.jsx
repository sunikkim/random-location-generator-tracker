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
      coordinatesList: []
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.saveData = this.saveData.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
    this.clearLocations = this.clearLocations.bind(this);
  }

  componentDidMount() {
    this.getAddress();
    this.getSavedData();
  }

  getSavedData() {
    axios.get(`http://localhost:5000/data`)
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
    axios.post('http://localhost:5000/data', { location: this.state.currLocation, coordinates: this.state.currCoordinates })
      .then((res) => {
        this.getSavedData();

        window.alert('Successfully saved this location!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onMarkerClick() {
    if (this.state.currLocation) {
      let loc = this.state.currLocation;
      let output = {}

      output[loc] = { lat: this.state.lat, lng: this.state.lng };

      this.setState({
        currCoordinates: output[loc]
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
          window.alert('No results found.');
        }
      })
      .catch((err) => console.log(err));
  }

  clearLocations(e) {
    e.preventDefault();

    axios.get('http://localhost:5000/clearData')
      .then(() => {
        this.getSavedData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const style = {
      width: '60%',
      height: '60%'
    };

    return(
    <div>
      <b>Your current location: </b>
      <div>{this.state.currLocation}</div>
      <br/>
      <b>Your saved locations + coordinates:</b>
      <br/>
      <button onClick={this.clearLocations}>Clear saved locations</button>
      <div id="list">
      {this.state.coordinatesList.map((loc, i) => {
        return(
          <div key={i}>{loc.location} — Latitude: {loc.lat} — Longitude: {loc.lng}</div>
        );
      })}
      </div>
      <br/>
      <Map
        google={window.google}
        zoom={this.state.zoom}
        initialCenter={{lat: this.state.lat, lng: this.state.lng}}
        onClick={this.onMapClick}
        style={style}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
        />
      </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(MapContainer)