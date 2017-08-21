import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Button from './button';
import * as Colors from '../constants/colors';

class Header extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    show: React.PropTypes.bool,
    onUserClick: React.PropTypes.func,
    onMenuClick: React.PropTypes.func
  }

  static defaultProps = {
    onUserClick: () => {}
  }
  // No handle scroll needed
  handleScroll = () => {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if (top > 200) {
      this.setState({
        dark: true
      });
    } else {
      this.setState({
        dark: false
      });
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      dark: false
    };
  }

  handleUserClick = (e) => {
    this.props.onUserClick(e);
  }

  handleMenuClick = (e) => {
    this.props.onMenuClick(e);
  };

  render() {
    const {show, user, onUserClick, onMenuClick, ...props} = this.props;
    const containerStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      height: 60,
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'none',
    };
    let leftHtml;
    let rightHtml;
    let className;
    if (user && user.uid) {
      className = 'bg-grad';
      const menuStyle = {
        flexGrow: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
        backgroundColor: Colors.GREY,
        color: Colors.TEXT_DARK,
        cursor: 'pointer'
      };
      leftHtml = (
        <View style={menuStyle} onClick={this.handleMenuClick}>
          <i className="fa fa-bars"></i>
        </View>
      );
      rightHtml = (
        <Button type="circle" size={36} onClick={this.handleUserClick}><i className="fa fa-user"/></Button>
      );
    } else {
      leftHtml = (
        <Link to='/' style={{ padding: 12 }}>LOGO</Link>
      );
      rightHtml = (
        <nav>
          <Button to={'/login'} type="secondary" inline style={{ marginRight: 6 }}>Login</Button>
          <Button to={'/signup'} type="secondary" inline>Sign Up for Free</Button>
        </nav>
      );
    }
    return (
      <View
        row
        style={containerStyle}
        className={className}
        {...props}>
        <View row style={{ justifyContent: 'flex-start' }}>
          {leftHtml}
        </View>
        <View row style={{ padding: 12, justifyContent: 'flex-end' }}>
          {rightHtml}
        </View>
      </View>
    );
  }
}

export default Header;
