import React, {Component} from 'react';
import View from 'react-flexbox';
import * as Colors from '../constants/colors';

import '../background.styl';

class ListMenu extends Component {
  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {children, style, ...props} = this.props;
    const containerStyle = {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Colors.GREY,
      width: 200
    };
    const listMenuStyle = Object.assign({}, containerStyle, style);
    return (
      <View column style={listMenuStyle}>
        {children}
      </View>
    );
  }
}

export default ListMenu;
