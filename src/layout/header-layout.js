import React, {Component} from 'react';
import {Link} from 'react-router';
import View from 'react-flexbox';

import connectToStores from 'alt-utils/lib/connectToStores';
import LayoutStore from '../stores/layout-store';
import LayoutActions from '../actions/layout-actions';

import Header from '../components/header';
import Sidebar from './sidebar';
import * as Colors from '../constants/colors';

class HeaderLayout extends Component {
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

  handleClickOutside = () => {
    const layout = {
      showSideBar: false
    };
    LayoutActions.updateLayout(layout);
  }

  handleUserClick = (e) => {
    e.preventDefault();
    const layout = {
      showSideBar: !this.props.layout.showSideBar
    };
    LayoutActions.updateLayout(layout);
  }

  handleMenuClick = (e) => {
    e.preventDefault();
    const layout = {
      showMenu: !this.props.layout.showMenu
    };
    LayoutActions.updateLayout(layout);
  }

  render() {
    const {user, title, subtitle, children, layout, centered, subheader, style } = this.props;
    let headerHtml = (
      <Header
        user={user}
        onUserClick={this.handleUserClick}
        onMenuClick={this.handleMenuClick}/>
    );
    let sidebarHtml;
    if (layout.showSideBar) {
      sidebarHtml = <Sidebar onClickOutside={this.handleClickOutside}/>;
    }
    const containerStyle = Object.assign({}, {
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      paddingTop: 60
    }, style);

    let bodyHtml;
    if (centered) {
      bodyHtml = (
        <div className="container" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {children}
        </div>
      )
    } else {
      bodyHtml = children;
    }

    let subheaderHtml;
    if (subheader) {
      const subheaderStyle = {
        padding: 12,
        backgroundColor: Colors.GREY,
        borderBottom: `1px solid ${Colors.GREY_1}`
      };
      subheaderHtml = (
        <View row style={subheaderStyle}>
          {subheader}
        </View>
      );
    } 
    return (
      <div style={containerStyle}>
        {headerHtml}
        {subheaderHtml}
        {bodyHtml}
        {sidebarHtml}
      </div>
    );
  }
}

export default connectToStores(HeaderLayout);
