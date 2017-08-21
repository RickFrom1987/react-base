import React, {Component} from 'react';
import View from 'react-flexbox';
import connectToStores from 'alt-utils/lib/connectToStores';
import LayoutStore from '../stores/layout-store';
import LayoutActions from '../actions/layout-actions';

import * as Colors from '../constants/colors';
import '../background.styl';

class HeroLayout extends Component {
  static propTypes = {}

  static defaultProps = {}

  static getStores() {
    return [LayoutStore];
  }

  static getPropsFromStores() {
    return LayoutStore.getState();
  }

  render() {
    const {title, subtitle, children, width, ...props} = this.props;
    const containerStyle = {
      paddingTop: 60
    };

    const heroLayoutStyle = {
      textAlign: 'center',
      minHeight: 120,
      alignItems: 'center',
      justifyContent: 'center',
      color: Colors.TEXT_DARK,
      backgroundImage: 'url(../assets/purple_2.jpg)'
    };

    const subtitleStyle = {
      color: Colors.TEXT_DARK,
      background: Colors.GREY_1,
      padding: 12
    };

    const bodyStyle = {
      justifyContent: 'flex-start',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    if(width.lessThan.large) {
      bodyStyle.width = '100%';
    }

    return (
      <div style={containerStyle}>
        <View column style={heroLayoutStyle} className="bg-img">
          <h1 style={{ marginBottom: 12 }}>{title}</h1>
        </View>
        <div className="container" style={subtitleStyle}>
          <div className="row">
            {subtitle}
          </div>
        </div>
        <View column style={bodyStyle}>
          {children}
        </View>
      </div>
    );
  }
}

export default connectToStores(HeroLayout);
