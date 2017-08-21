import React, {Component} from 'react';
import View from 'react-flexbox';

class CenteredLayout extends Component {
  render() {
    const {children, ...props} = this.props;
    const containerStyle = {
      paddingTop: 0
    };
    return (
      <View column style={containerStyle}>
        {children}
      </View>
    );
  }
}

export default CenteredLayout;
