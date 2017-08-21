import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import View from 'react-flexbox';
import {Link} from 'react-router';
import uuid from 'uuid';
import Base from '../base';
import Button from './button';
import {WHITE} from '../constants/colors';

class Audio extends Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    onDrop: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
  }

  static defaultProps = {
    onDrop: () => {},
  }

  constructor(props) {
    super(props);
    this.dropzone = null;
    this.state = {
      showHint: true
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.dropzone.open();
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    if (acceptedFiles.length !== 1) {
      this.setState({
        errorMsg: 'Oops. Upload error'
      });
    }
    const user = this.props.user;
    const name = acceptedFiles[0].name;
    const file = acceptedFiles[0];
    const id = uuid.v1();
    const storageRef = Base.storage().ref();
    const audioRef = storageRef.child(`${user.uid}/audio/${id}`);
    audioRef.put(file).then((snapshot) => {
      const audio = [{ 
        url: snapshot.downloadURL,
        displayText: `${name}`
      }];
      this.props.onSelect(audio);
    }).catch(function(error) {
      console.log("error", error);
    });
  }

  render() {
    const {onDrop, user} = this.props;
    const audioUploadStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height:'100%',
      zIndex: 1
    };
    let hintHtml;
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
      <View
        row 
        onClick={this.handleClick}
        style={{
          position: 'absolute',
          left:'50%',
          transform: 'translateX(-50%)',
          bottom: 24,
          alignItems: 'center',
        }}>
        <Button type="circle" size={36}>
          <i className="fa fa-music"/>
        </Button>
        <View row style={hintStyle}>
          Drag and Drop a .mp3 file anywhere!
        </View>
      </View>
    );
    return (
      <Dropzone ref={(c) => { this.dropzone = c; }}onDrop={this.onDrop} style={audioUploadStyle} accept={'audio/*'} disableClick multiple={false}>
        {hintHtml}
      </Dropzone>
    );
  }
}

export default Audio;
