import React, {Component} from 'react';
import View from 'react-flexbox';
import Modal from 'react-modal';
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

import { Template, TemplateDescription } from '../components/template';
import Base from '../base';

import '../background.styl';
import * as Colors from '../constants/colors';

class Create extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      isOpen: false,
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

  onSelectFile = (file) => {
    if (!file) {
      return MessageActions.updateMessage({
        text: 'The file you added is not supported.'
      });
    }
    this.setState({
      file: file
    });
  }

  handleSave = (e) => {
    e.preventDefault();
    const uid = this.props.user.uid;
    const file = this.state.file;
    const template = this.state.template;
    if (file.length === 0) {
      return MessageActions.updateMessage({
        text: 'No file added.'
      });
    }
    const filesRef = Base.push('files', {
      data: {
        working: true,
        url: file.url,
        displayText: file.displayText,
        uid: uid,
        type: template.type
      }
    });
    const projectsRef = Base.push('projects', {
      data: {
        uid: uid,
        fid: filesRef.key,
        type: template.type
      }
    });
    FileService.addFile(filesRef.key, projectsRef.key);
    return browserHistory.push('/profile');
  }

  handleCancel = (e) => {
    e.preventDefault();
    browserHistory.goBack();
  }

  handleCloseModal = () => {
    this.setState({
      isOpen: false
    });
  }

  handleSelectTemplate = (template) => {
    this.setState({
      isOpen: true,
      template: template
    });
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

    let text;
    if (this.state.file) {
      text = this.state.file.displayText;
    }
    const modalStyle = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        maxWidth: 768
      }
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
          <h2 style={{ marginBottom: 24 }}>Choose a project type:</h2>
          <Template onSelect={this.handleSelectTemplate}/>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel={''}
          style={modalStyle}
          onRequestClose={this.handleCloseModal}>
          <View column>
            <View column style={sectionStyle}>
              <h2 style={{ textTransform: 'uppercase' }}>{template.type}</h2>
              <p>{template.text}</p>
            </View>
            <View row style={sectionStyle}>
              <Button type="circle" inline style={{ marginRight: 6 }}>1</Button>
              <TemplateDescription
                type={template.type}
                xslx={template.xslx_url}
                csv={template.csv_url}/>
            </View>
            <View row style={sectionStyle}>
              <Button type="circle" inline style={{ marginRight: 6 }}>2</Button>
              <p>Edit the template in Google Sheets or Microsoft Excel</p>
            </View>
            <View row style={sectionStyle}>
              <Button type="circle" inline style={{ marginRight: 6 }}>3</Button>
              <p>Upload your complete file as a .xslx</p>
            </View>
            <FileUpload
              user={user}
              onSelect={this.onSelectFile}
              text={text}/>
            <View row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={this.handleSave}>
                Save
              </Button>
            </View>
          </View>
        </Modal>
      </div>
    );
  }
}

export default connectToStores(Create);
