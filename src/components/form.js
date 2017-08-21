import React, {Component} from 'react';
import * as Colors from '../constants/colors';

const DEFAULT_STYLE = {
  minWidth: 300,
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
  color: Colors.WHITE
};

class Form extends Component {
  static propTypes = {
    style: React.PropTypes.object
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {value, children, style, ...props} = this.props;
    const formStyle = Object.assign({}, DEFAULT_STYLE, style);
    return (
      <form style={formStyle}>{children}</form>
    );
  }
}

export default Form;
