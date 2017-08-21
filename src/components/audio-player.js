import React, {Component} from 'react';
import View from 'react-flexbox';
import {Link} from 'react-router';
import ReactAudioPlayer from '../third-party/react-audio-player';
import {WHITE_TRANSPARENT, GREY, GREY_O, GREY_1, GREY_2 } from '../constants/colors';

class AudioPlayer extends Component {
  static propTypes = {
    audio: React.PropTypes.array
  }

  static defaultProps = {
    audio: []
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {audio} = this.props;
    const audioPlayerStyle = {
      position: 'fixed',
      bottom: 0,
      zIndex: 3,
      backgroundColor: WHITE_TRANSPARENT
    };
    return (
      <ReactAudioPlayer
        playlist={audio}
        style={audioPlayerStyle}
        hideBackSkip
        hideForward/>
    );
  }
}

export default AudioPlayer;
