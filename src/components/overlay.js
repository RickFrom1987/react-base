import React, {Component} from 'react';
import View from 'react-flexbox';

class Overlay extends Component {
  static propTypes = {
    show: React.PropTypes.bool,
    content: React.PropTypes.node
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false
    };
  }

  render() {
    const {show, children, ...props} = this.props;
    if (!show) {
      return null;
    }
    const containerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(196,197,198,0.9)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    };
    return (
      <View
        column
        style={containerStyle}
        {...props}>
        { children }
      </View>
    );
  }
}

export default Overlay;
