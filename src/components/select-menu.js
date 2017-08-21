import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import Base from '../base';

import Button from '../components/button';
import {BADGES} from '../assets/config';

class SelectMenu extends Component {
  static propTypes = {
    onSelect: React.PropTypes.func,
    items: React.PropTypes.array
  }

  static defaultProps = {
    onSelect: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = (e) => {
    e.preventDefault();
    const val = e.target.getAttribute('data-url');
    return this.props.onSelect(val);
  }

  render() {
    const {onSelect, items, ...props} = this.props;
    const containerStyle = {
      justifyContent: 'flex-start',
      alignItems: 'center'
    };
    const defaultItemStyle = {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
    const itemsHtml = items.map((item, i) => {
      const itemStyle = Object.assign({}, defaultItemStyle, { 
        backgroundImage: `url(${item.url})`,
        marginLeft: 12
      });
      return (
        <Button
          key={i}
          type={'circle'}
          size={36}
          style={itemStyle}
          onClick={this.handleClick}
          data-url={item.url}></Button>
      );
    });
    return (
      <View row style={containerStyle}>
        {itemsHtml}
      </View>
    );
  }
}

export default SelectMenu;
