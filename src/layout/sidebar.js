import React, {Component} from 'react';
import {Link} from 'react-router';
import View from 'react-flexbox';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import ListMenu from '../components/list-menu';
import ListMenuItem from '../components/list-menu-item';
import * as Colors from '../constants/colors';

import '../background.styl';

class Sidebar extends Component {

  static propTypes = {
    onClickOutside: React.PropTypes.func
  }

  static defaultProps = {
    onClickOutside: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClickOutside = () => {
    this.props.onClickOutside();
  }

  render() {
    const {children, ...props} = this.props;
    const sidebarStyle = {
      position: 'fixed',
      top: 0,
      right: 0,
      flexGrow: 0,
      alignItems: 'flex-start',
      overflow: 'hidden',
      backgroundColor: Colors.GREY
    };
    const listMenuStyle = { 
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingTop: 60
    };
    return (
      <RootCloseWrapper onRootClose={this.handleClickOutside}>
        <View column style={sidebarStyle} className="bg-box-shadow">
          <ListMenu style={listMenuStyle}>
            <ListMenuItem onClick={this.handleClickOutside} to='/profile'>Profile</ListMenuItem>
            <ListMenuItem onClick={this.handleClickOutside} to='/logout'>Log out</ListMenuItem>
          </ListMenu>
        </View>
      </RootCloseWrapper>
    );
  }
}

export default Sidebar;
