import { Map, InfoWindow, Marker, GoogleApiWrapper, Circle, Geocoder } from 'google-maps-react';
import React from 'react';
import ReactDOM from 'react-dom';
import MAPS_KEY from '../API_KEY.js';
import axios from 'axios';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 5,
      lng: 5,
      defaultZoom: 3,
      latRange: 90,
      lngRange: 180,
      currLocation: '',
      currCoordinates: {},
      coordinatesList: []
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.saveData = this.saveData.bind(this);
    this.getSavedData = this.getSavedData.bind(this);
    this.clearLocations = this.clearLocations.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.randCoord = this.randCoord.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentDidMount() {
    this.getAddress();
    this.getSavedData();
    this.setRandCoords();
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

  randCoord(input) {
    let result;

    if (input === 'lat') {
      result = (Math.random() * this.state.latRange) * (Math.round(Math.random()) ? 1 : -1);
    } else if (input === 'lng') {
      result = (Math.random() * this.state.lngRange) * (Math.round(Math.random()) ? 1 : -1);
    }

    return result;
  }

  setRandCoords() {
    const lat = this.randCoord('lat');
    const lng = this.randCoord('lng');

    this.setState({
      lat,
      lng
    });
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
    this.setRandCoords();
    this.getAddress();
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

  deleteItem(e) {
    const id = e.target.id;

    axios.put('http://localhost:5000/deleteItem', { id })
      .then(() => {
        this.getSavedData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onTextChange(e) {
    const input = e.target.id;

    if (input === 'zoom') {
      this.setState({
        defaultZoom: Number(e.target.value)
      });
    } else if (input === 'lat-range') {
      this.setState({
        latRange: Number(e.target.value)
      });
    } else if (input === 'lng-range') {
      this.setState({
        lngRange: Number(e.target.value)
      });
    }
  }

  render() {
    const style = {
      width: '75%',
      height: '75%'
    };

    return(
    <div>
      <b>Your current location: </b>
      <div>{this.state.currLocation}</div>
      <br/>
      <b>Your saved locations + coordinates:</b>
      <br/>
      <button id="clear" onClick={this.clearLocations}>Clear saved locations</button>
      <div id="list">
      {this.state.coordinatesList.map((loc, i) => {
        return(
          <div key={i}><span id={loc._id} className="delete" onClick={this.deleteItem}>X</span> {loc.location} (Latitude {loc.lat}, Longitude {loc.lng})</div>
        );
      })}
      </div>
      <br></br>
      <div id="input">
        <label htmlFor="zoom">Default Zoom:</label>
        <input type="text" id="zoom" name="zoom" onChange={this.onTextChange} value={this.state.defaultZoom}/>
        <label htmlFor="lat-range">Latitude Range (0-90):</label>
        <input type="text" id="lat-range" name="lat-range" onChange={this.onTextChange} value={this.state.latRange}/>
        <label htmlFor="lng-range">Longitude Range (0-180):</label>
        <input type="text" id="lng-range" name="lng-range" onChange={this.onTextChange} value={this.state.lngRange}/>
      </div>
      <br></br>
      <Map
        google={window.google}
        zoom={this.state.defaultZoom}
        center={{lat: this.state.lat, lng: this.state.lng}}
        onClick={this.onMapClick}
        style={style}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={{lat: this.state.lat, lng: this.state.lng}}
        />
      </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(MapContainer)