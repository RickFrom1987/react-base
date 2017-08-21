import React, {Component} from 'react';
import {TEXT_DARK, WHITE, GREY, RED} from '../constants/colors';

const DEFAULT_STYLE = {
  padding: 12,
  marginTop: 12,
  marginBottom: 12,
  color: TEXT_DARK,
  textTransform: 'uppercase',
  fontSize: 12
};

const ERROR_STYLE = {
  backgroundColor: RED,
};

class Message extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    style: React.PropTypes.object,
    type: React.PropTypes.string,
  }

  static defaultProps = {
    value: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    const {value, children, type, style, ...props} = this.props;
    if (!children) {
      return null;
    }
    let msgStyle = Object.assign({}, DEFAULT_STYLE, style);
    if (type === 'error') {
      msgStyle = Object.assign({}, msgStyle, ERROR_STYLE);
    }
    return (
      <p style={msgStyle}>{children}</p>
    )
  }
}

export default Message;
