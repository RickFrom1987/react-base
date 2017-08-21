import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link, browserHistory} from 'react-router';

import connectToStores from 'alt-utils/lib/connectToStores';
import UserStore from '../stores/user-store';
import MessageStore from '../stores/message-store';
import MessageActions from '../actions/message-actions';
import MessageBar from '../components/message-bar';

import FileUpload from '../components/file-upload';
import FileService from '../service/file-service';

import Input from '../components/input';
import Button from '../components/button';
import SaveCancel from '../components/save-cancel';

import Base from '../base';

import '../background.styl';

class Edit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      files: [],
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
    Base.syncState(`files`, {
      context: this,
      asArray: true,
      state: 'files',
      queries: {
        orderByChild: 'uid',
        equalTo: user.uid
      }
    });
  }

  onSelectFile = (file) => {
    const pid = this.props.params.pid;
    const user = Base.getAuth();
    if (!file) {
      return MessageActions.updateMessage({
        text: 'The file you added is not supported.'
      });
    }
    const filesRef = Base.push('files', {
      data: {
        working: true,
        url: file.url,
        displayText: file.displayText,
        uid: user.uid,
      }
    });
    this.setState({
      project: {
        fid: filesRef.key
      }
    }, () => {
      FileService.addFile(filesRef.key, pid);
      return browserHistory.push('/profile');
    });
  }

  handleCancel = (e) => {
    e.preventDefault();
    browserHistory.goBack();
  }

  render() {
    const {user, message, ...props} = this.props;
    const project = this.state.project;
    const files = this.state.files.filter((f) => {
      return f.key === project.fid;
    });
    const file = (files.length === 1) ? files[0] : null;
    let text;
    if (file) {
      text = file.displayText;
    }
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

    const messageHtml = <MessageBar value={'Change the source spreadsheet file by dragging and dropping a new one.'}/>;

    return (
      <View column style={containerStyle} className="bg">
        {messageHtml}
        <SaveCancel
          onSave={this.handleSave}
          onCancel={this.handleCancel}
          style={saveCancelStyle}/>
        <FileUpload
          user={user}
          onSelect={this.onSelectFile.bind(this)}
          text={text}/>
      </View>
    );
  }
}

export default connectToStores(Edit);