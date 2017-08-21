import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import View from 'react-flexbox';
import * as Colors from '../constants/colors';

const HOVER_STYLE = {
  backgroundColor: Colors.GREY_1,
  color: Colors.TEXT_LIGHT
};

class ListMenuItem extends Component {
  static propTypes = {
    to: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    to: null,
    onClick: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleClick = (e) => {
    const to = this.props.to;
    if (to) {
      e.preventDefault();
      browserHistory.push(to);
    }
    this.props.onClick(e);
  }

  handleMouseOver = () => {
    this.setState({
      hover: true
    });
  }

  handleMouseOut = () => {
    this.setState({
      hover: false
    });
  }

  render() {
    const {children, style, to, ...props} = this.props;
    const containerStyle = {
      width: '100%',
      flexGrow: 0,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
      cursor: 'pointer',
      fontSize: 14,
      color: Colors.TEXT_DARK,
      backgroundColor: Colors.GREY
    };
    let listMenuItemStyle = Object.assign({}, containerStyle, style);
    if (this.state.hover) {
      listMenuItemStyle = Object.assign({}, listMenuItemStyle, HOVER_STYLE);
    }
    return (
      <View
        row
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
        style={listMenuItemStyle}>
        {children}
      </View>
    );
  }
}

export default ListMenuItem;
