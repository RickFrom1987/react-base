import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Base from '../base';

import connectToStores from 'alt-utils/lib/connectToStores';
import LayoutStore from '../stores/layout-store';
import LayoutActions from '../actions/layout-actions';

import Button from './button';
import {WHITE} from '../constants/colors';
import {BACKGROUND_IMAGES} from '../assets/config';

class BackgroundMap extends Component {
  static propTypes = {}

  static defaultProps = {}

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({});
  }

  render() {
    const { width, height, ...props} = this.props;
    const mapStyle = {
      position: 'relative',
      width: width.value,
      height: height.value,
      zIndex: 1
    };
    const position = [51.505, -0.09];
    const map = (
      <Map center={position} zoom={13} style={mapStyle}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
    return (
      <div>
        {map}
      </div>
    );
  }
}

export default connectToStores(BackgroundMap);
