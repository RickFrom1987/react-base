import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link, browserHistory} from 'react-router';

import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import MessageStore from '../stores/message-store';
import MessageActions from '../actions/message-actions';
import MessageBar from '../components/message-bar';
import MapGrid from '../components/map-grid';
import Input from '../components/input';
import Button from '../components/button';
import SaveCancel from '../components/save-cancel';

import Base from '../base';

import '../background.styl';

class Edit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      project: {}
    };
  }

  static getStores() {
    return [UserStore, MessageStore];
  }

  static getPropsFromStores() {
    const userState = UserStore.getState();
    const messageState = MessageStore.getState();
    return {
      user: userState.user,
      message: messageState.message
    }
  }

  componentDidMount = () => {
    const user = Base.getAuth();
    const pid = this.props.params.pid;
    Base.syncState(`projects/${pid}`, {
      context: this,
      state: 'project'
    });
  }

  handleSave = (e) => {
    e.preventDefault();
    console.log("Save clicked")
  }

  handleCancel = (e) => {
    e.preventDefault();
    browserHistory.goBack();
  }

  render() {
    const {user, message, ...props} = this.props;
    const project = this.state.project;
    const containerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      alignItems: 'flex-start',
    };
    const saveCancelStyle = {
      position: 'absolute',
      top: 24,
      right: 24,
      zIndex: 3
    };

    const messageHtml = <MessageBar/>;

    return (
      <View column style={containerStyle} className="bg">
        <SaveCancel
          onSave={this.handleSave}
          onCancel={this.handleCancel}
          style={saveCancelStyle}/>
        <MapGrid/>
      </View>
    );
  }
}

export default connectToStores(Edit);