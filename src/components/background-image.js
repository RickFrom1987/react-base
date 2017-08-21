import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Base from '../base';

import Button from './button';
import SelectMenu from './select-menu';
import {WHITE} from '../constants/colors';
import {BACKGROUND_IMAGES} from '../assets/config';

class BackgroundImage extends Component {
  static propTypes = {
    onSelect: React.PropTypes.func
  }

  static defaultProps = {
    onSelect: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      show: !this.state.show
    });
  }

  handleSelect = (val) => {
    return this.props.onSelect(val);
  }

  render() {
    const {onSelect, ...props} = this.props;
    const containerStyle = {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexGrow: 0
    };
    let selectMenuHtml;
    if (this.state.show) {
      selectMenuHtml = (
        <SelectMenu
          onSelect={this.handleSelect}
          items={BACKGROUND_IMAGES}/>
      );
    }

    let hintHtml;
    if (!this.state.show) {
      const hintStyle = {
        marginLeft: 6,
        flexGrow: 0,
        fontSize: 10,
        padding: 6,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase',
        justifyContent: 'flex-start',
        alignItems: 'center'
      };
      hintHtml = (
        <View row style={hintStyle}>
          add background
        </View>
      );
    }
    return (
      <View row style={containerStyle}>
        <Button type="circle" size={36} onClick={this.handleClick}>
          <i className="fa fa-photo"></i>
        </Button>
        {hintHtml}
        {selectMenuHtml}
      </View>
    );
  }
}

export default BackgroundImage;
