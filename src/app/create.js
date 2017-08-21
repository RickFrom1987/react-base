import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link, browserHistory} from 'react-router';

import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import MessageStore from '../stores/message-store';
import MessageActions from '../actions/message-actions';
import MessageBar from '../components/message-bar';
import Input from '../components/input';
import Button from '../components/button';
import SaveCancel from '../components/save-cancel';

import { Template, TemplateDescription } from '../components/template';
import Base from '../base';

import '../background.styl';
import * as Colors from '../constants/colors';

class Create extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      template: {}
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

  handleCancel = (e) => {
    e.preventDefault();
    browserHistory.goBack();
  }

  handleSelectTemplate = (template) => {
    const uid = this.props.user.uid;
    const jsonRef = Base.push('json', {
      data: {
        uid: uid
      }
    })
    const projectsRef = Base.push('projects', {
      data: {
        uid: uid,
        type: template.type,
        jid: jsonRef.key
      }
    });
    return browserHistory.push(`/edit/${projectsRef.key}`);
  }

  render() {
    const {user, message, ...props} = this.props;
    const template = this.state.template;
    const containerStyle = {
      postion: 'relative',
      height: '100vh',
      width: '100vw',
    };
    const bodyStyle = {
      padding: 24,
      maxWidth: 768,
      height: '50%',
      color: Colors.WHITE
    };
    const sectionStyle = {
      justifyContent: 'flex-start',
      marginBottom: 24
    };
    return (
      <div style={containerStyle} className="bg">
        <Button type="secondary" onClick={this.handleCancel} style={{ position: 'absolute', top: 24, right: 24 }}>
          Cancel
        </Button>
        { (message.text) ? <MessageBar value={message.text}/> : null }
        <div style={bodyStyle}>
          <h2>Create Page</h2>
        </div>
      </div>
    );
  }
}

export default connectToStores(Create);
