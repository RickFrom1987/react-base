import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Title from './title';
import Base from '../base';

class Preview extends Component {
  static propTypes = {
    backgroundImage: React.PropTypes.string,
    badge: React.PropTypes.string,
    title: React.PropTypes.string,
    style: React.PropTypes.object,
    size: React.PropTypes.string,
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {backgroundImage, badge, title, ...props} = this.props;
    const previewStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 0,
      backgroundPosition: 'center'
    };
    let badgeHtml;
    if (badge) {
      const badgeStyle = {
        backgroundImage: `url(${badge})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minWidth: 100,
        minHeight: 100,
        flexGrow: 0,
      };
      badgeHtml = (
        <View column style={badgeStyle}/>
      );
    }
    let titleHtml;
    if (title) {
      titleHtml = <Title value={title} readOnly/>;
    }
    return (
      <View column style={previewStyle}>
        {titleHtml}
        {badgeHtml}
      </View>
    );
  }
}

export default Preview;
