import React, {Component} from 'react';
import * as Colors from '../constants/colors';

const DEFAULT_STYLE = {
  marginTop: 6,
  marginBottom: 6,
  color: Colors.WHITE,
  textTransform: 'uppercase',
  fontSize: 12
};

class Label extends Component {
  static propTypes = {
    value: React.PropTypes.string,
    style: React.PropTypes.object
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
    const {value, children, style, ...props} = this.props;
    const labelStyle = Object.assign({}, DEFAULT_STYLE, style);
    return (
      <label style={labelStyle}>{children}</label>
    );
  }
}

export default Label;
