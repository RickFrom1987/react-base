import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import {WHITE} from '../constants/colors';

class MessageBar extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    type: React.PropTypes.string
  }

  static defaultProps = {
    value: null,
    type: null
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {value, type} = this.props;
    const containerStyle = {
      position: 'fixed',
      top: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '75%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      color: WHITE,
      padding: 12,
      zIndex: 100,
      borderRadius: 6,
      whiteSpace: 'no-wrap',
      fontSize: 12,
      textAlign: 'center'
    };
    return (
      <View row style={containerStyle}>
        {value}
      </View>
    );
  }
}

export default MessageBar;
