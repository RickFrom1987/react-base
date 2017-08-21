import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import View from 'react-flexbox';
import {Link} from 'react-router';
import uuid from 'uuid';
import Base from '../base';
import Button from './button';
import * as Colors from '../constants/colors';

import '../animation.styl';
import '../position.styl';

class FileUpload extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    onDrop: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    text: React.PropTypes.string,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    onDrop: () => {},
    text: 'Drag and Drop .xslx here',
  }

  constructor(props) {
    super(props);
    this.dropzone = null;
    this.state = this._getInitialState();
  }

  _getInitialState = () => {
    return {
      showHint: true,
      hover: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.dropzone.open();
  }

  handleMouseOver = (e) => {
    this.setState({
      hover: true
    });
  }

  handleMouseLeave = (e) => {
    this.setState({
      hover: false
    });
  }

  _onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    if (acceptedFiles.length !== 1) {
      return this.props.onSelect(false);
    }
    const { user } = this.props;
    const name = acceptedFiles[0].name;
    const file = acceptedFiles[0];
    const id = uuid.v1();
    const storageRef = Base.storage().ref();
    const fileRef = storageRef.child(`${user.uid}/files/${id}_${name}`);
    fileRef.put(file).then((snapshot) => {
      const f = { 
        url: snapshot.downloadURL,
        displayText: `${name}`,
        uid: user.uid
      };
      this.props.onSelect(f);
    }).catch(function(error) {
      console.error("fileRef error", error);
    });
  }

  render() {
    const { onDrop, text, user, style } = this.props;
    const containerStyle = {
      cursor: 'pointer',
      border: `1px dashed ${Colors.TEXT_DARK}`,
      width: '100%',
      minHeight: 100,
      marginTop: 12,
      marginBottom: 12,
      position: 'relative'
    };
    let hintHtml;
    hintHtml = (
      <p
        onClick={this.handleClick}
        className="transition acenter"
        style={{ height: 24, textAlign: 'center' }}>
        {text}
      </p>
    );
    const fileUploadStyle = Object.assign({}, containerStyle, style);
    return (
      <Dropzone
        className="transition"
        ref={(c) => { this.dropzone = c; }}
        onDragEnter={this.handleMouseOver}
        onDragLeave={this.handleMouseLeave}
        onDrop={this._onDrop}
        style={fileUploadStyle}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        accept={'.csv, .xlsx'}
        multiple={false}
        style={fileUploadStyle}>
        {hintHtml}
      </Dropzone>
    );
  }
}

export default FileUpload;
