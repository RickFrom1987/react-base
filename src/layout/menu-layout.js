import React, {Component} from 'react';
import {Link} from 'react-router';
import View from 'react-flexbox';

import connectToStores from 'alt-utils/lib/connectToStores';
import LayoutStore from '../stores/layout-store';
import LayoutActions from '../actions/layout-actions';

import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import ListMenu from '../components/list-menu';
import ListMenuItem from '../components/list-menu-item';

import * as Colors from '../constants/colors';
import '../background.styl';

class MenuLayout extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

  handleClick = (e) => {
    e.preventDefault();
    const layout = {
      showMenu: false
    };
    LayoutActions.updateLayout(layout);
  }

  render() {
    const {children, layout, ...props} = this.props;
    let menuContainerStyle = {
      position: 'relative',
      top: 60,
      left: 0,
      flexGrow: 0,
      width: 0,
      overflow: 'hidden',
      zIndex: 1000,
      backgroundColor: Colors.GREY

    };
    if (layout.showMenu) {
      menuContainerStyle = Object.assign({}, menuContainerStyle, {
        width: 200
      });
    }
    const closeStyle = {
      flexGrow: 0,
      alignItems: 'space-between',
      padding: 12,
      cursor:'pointer'
    };
    return (
      <View row>
        <View column style={menuContainerStyle} className="bg-box-shadow">
          <View row style={closeStyle}>
            <span>LOGO</span>
            <span onClick={this.handleClick}><i className="fa fa-times" style={{ fontWeight: 100 }}></i></span>
          </View>
          <ListMenu>
            <ListMenuItem to='/'>Home</ListMenuItem>
            <ListMenuItem to='/create'>Create</ListMenuItem>
          </ListMenu>
        </View>
        <View column>
          {children}
        </View>
      </View>
    );
  }
}

export default connectToStores(MenuLayout);
