import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Loader } from '@googlemaps/js-api-loader';
import MAPS_KEY from '../API_KEY.js';
import MapContainer from './Map.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Random Location Generator + Tracker</h1>
        <div>Click anywhere on the map to jump to a new, randomly generated location in the world. If you like where you end up, click the marker pin to save the name and coordinates of that place for future reference!</div>
        <br/>
        <MapContainer />
        <div id="map"></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));