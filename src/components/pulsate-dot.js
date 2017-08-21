import React, {Component} from 'react';
import * as Colors from '../constants/colors';

import '../animation.styl';

const DEFAULT_STYLE = {
  position: 'relative',
  backgroundColor: Colors.GREEN,
};

class PulsateDot extends Component {
  static propTypes = {
    style: React.PropTypes.object
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {style} = this.props;
    const containerStyle = Object.assign({}, DEFAULT_STYLE, style);
    return (
      <div style={containerStyle}>
        <div className="dot"></div>
        <div className="pulse"></div>
      </div>
    );
  }
}

export default PulsateDot;
